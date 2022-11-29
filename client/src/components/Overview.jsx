import React, { useState } from "react";
import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
import StackedBarChart from "./StackedBarChart/StackedBarChart";

const OverviewPage = () => {
  const [levelTabActive, setLevelTab] = useState("Undergraduate ");

  const levelTabOptions = ["Undergraduate ", "Graduate ", "Professional "];

  return (
    <>
      <h1 className="first_title">Campus Overview</h1>
      <p>
        On this page we can see what the student body diversity at UIUC looks
        like campus wide through time since 2004. Though we can see improvements
        on diveristy
      </p>
      <p>
        In the future I would like to extend this past 2004, as well as present
        other options on presentation of data
      </p>
      <StackedBarChartSINGLECOMPONENT_copy
        className="graphics"
        width={750}
        height={700}
        margin={{ top: 20, right: 30, bottom: 65, left: 50 }}
        dataCsvUrl={
          "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/years_summary.csv"
        }
        dataFilter={(el) => el.Level == "***Campus total*** "}
        xValue={(d) => d["Total"]}
        yValue={(d) => d["Year"]}
      />
      <div>
        <div className="level_tabs">
          {levelTabOptions.map((option) => (
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
            height={700}
            margin={{ top: 20, right: 30, bottom: 65, left: 50 }}
            dataCsvUrl={
              "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/years_summary.csv"
            }
            dataFilter={(el) => el.Level == levelTabActive}
            xValue={(d) => d["Total"]}
            yValue={(d) => d["Year"]}
          />
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
