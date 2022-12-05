import React, { useState } from "react";
// import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
// import StackedBarChart from "./StackedBarChart/StackedBarChart";
// import { useSearchParams } from "react-router-dom";
import useData from "./useData";

const MajorPage = () => {
  const [levelTabActive, setLevelTab] = useState("BS");
  const [activeCollege, setActiveCollege] = useState("KL");

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
              el["Coll"] === activeCollege &&
              el["Degree"] !== "***Major total***"
          )
          .map((el) => el["Degree"])
      ),
    ];
  }

  const handleCollegeChange = (event) => {
    event.preventDefault();
    setActiveCollege(event.target.value);
    if (data !== null) {
      degreeOptions = [
        ...new Set(
          data
            .filter(
              (el) =>
                el["Coll"] === event.target.value &&
                el["Degree"] !== "***Major total***"
            )
            .map((el) => el["Degree"])
        ),
      ];
    }
    setLevelTab(degreeOptions[0]);
  };

  return (
    <>
      <h1 className="first_title">Major Overview</h1>
      <p>
        In this major overview page, you can look at the breakdown by majors.
        Though it is evident in the other graphics presented, something that has
        caught my eye as a CS+Philosophy major here at the Univeristy of
        Illinois is the immediate fall-off of Hispanics and African Americans in
        engineering as you look at graudate level programs. This is in
        contradiction from what I hear from the department when we discuss
        diversity, and is an interesting observation from the data presented. As
        I hope to instill in others, emboldened by this information I aim to be
        able to act upon it and utilize this in further discussions with the
        department to create critical thought and changing discussions.
      </p>
      <label htmlFor="major" style={{ fontWeight: "bold" }}>
        Choose a Major:
      </label>
      <div className="App">
        <select value={activeCollege} onChange={handleCollegeChange}>
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
          el["Degree"] == "***Major total***" && el["Coll"] == activeCollege
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
              el["Coll"] == activeCollege && el["Degree"] == levelTabActive
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
