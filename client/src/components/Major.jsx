import React, { useState } from "react";
import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
import StackedBarChart from "./StackedBarChart/StackedBarChart";
import { useSearchParams } from "react-router-dom";
import useData from "./useData";

const MajorPage = () => {
  const [levelTabActive, setLevelTab] = useState("Undergraduate");
  const [searchParams, setSearchParams] = useSearchParams({ College: "KL" });

  const handleChange = (event) => {
    event.preventDefault();
    setSearchParams({ College: event.target.value });
  };

  const collegeOptions = [
    { value: "KL", label: "KL - Agr, Cons, Env Sci" },
    { value: "KM", label: "KM - Business" },
    { value: "KN", label: "KN - Education" },
    { value: "KP", label: "KP - Grainger Engineering" },
    { value: "KR", label: "KR - Fine & Applied Arts" },
    { value: "KS", label: "KS - Graduate College" },
    { value: "KT", label: "KT - Media" },
    { value: "KU", label: "KU - Law" },
    { value: "KV", label: "KV - Liberal Arts & Sci" },
    { value: "KW", label: "KW - General Studies" },
    { value: "KY", label: "KY - Applied Health Sci" },
    { value: "LC", label: "LC - Veterinary Medicine" },
    { value: "LG", label: "LG - Labor & Empl. Rel." },
    { value: "LL", label: "LL - School of Social Work" },
    { value: "LN", label: "LN - Center Innov in Teach Learn" },
    { value: "LP", label: "LP - School of Information Sciences" },
    { value: "LT", label: "LT - Carle Illinois Medicine" },
    { value: "NB", label: "NB  - Provost & VC Acad Affairs" },
  ];

  let degreeOptions = [];
  let data = useData(
    "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_details_major_aggregate.csv"
  );
  if (data !== null) {
    degreeOptions = [
      ...new Set(
        data
          .filter(
            (el) =>
              el["Coll"] === searchParams.get("College") &&
              el["Degree"] !== "***Major total***"
          )
          .map((el) => el["Degree"])
      ),
    ];
  }

  return (
    <>
      <h1 className="first_title">Major Overview</h1>
      <label htmlFor="major">Choose a Major:</label>
      <div className="App">
        <select value={searchParams.get("College")} onChange={handleChange}>
          {collegeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <StackedBarChartSINGLECOMPONENT_copy
        className="graphics"
        width={750}
        height={900}
        margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
        dataCsvUrl={
          "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_details_major_aggregate.csv"
        }
        dataFilter={(el) =>
          el["Degree"] == "***Major total***" &&
          el["Coll"] == searchParams.get("College")
        }
        xValue={(d) => d["Total"]}
        yValue={(d) => d["Major Name"]}
      />

      <div>
        <div className="level_tabs">
          {degreeOptions.map((option) => (
            <div
              key={option}
              onClick={() => setLevelTab(option)}
              className={`level_tab ${
                levelTabActive === option ? "level_tab_active" : ""
              }`}
            >
              <h3>{option}</h3>
            </div>
          ))}
        </div>
        <div className="level_content">
          <StackedBarChartSINGLECOMPONENT_copy
            className="graphics"
            width={750}
            height={500}
            margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
            dataCsvUrl={
              "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_details_major_aggregate.csv"
            }
            dataFilter={(el) =>
              el["Coll"] == searchParams.get("College") &&
              el["Degree"] == levelTabActive
            }
            xValue={(d) => d["Total"]}
            yValue={(d) => d["Major Name"]}
          />
        </div>
      </div>
    </>
  );
};

export default MajorPage;
