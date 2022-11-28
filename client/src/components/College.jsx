import React, { useState } from "react";
import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
import StackedBarChart from "./StackedBarChart/StackedBarChart";

const CollegePage = () => {
  const [levelTabActive, setLevelTab] = useState("Undergraduate");

  return (
    <>
      <h1 className="first_title">College Overview</h1>
      <StackedBarChartSINGLECOMPONENT_copy
        className="graphics"
        width={750}
        height={500}
        margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
        dataCsvUrl={
          "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_summary_complete.csv"
        }
        dataFilter={(el) => el["Student Level"] == "***College total*** "}
        xValue={(d) => d["Total"]}
        yValue={(d) => d["College Name"]}
      />
      <div>
        <div className="level_tabs">
          <div
            onClick={() => setLevelTab("Undergraduate")}
            className={`level_tab ${
              levelTabActive === "Undergraduate" ? "level_tab_active" : ""
            }`}
          >
            <h3>Undergraduate</h3>
          </div>
          <div
            onClick={() => setLevelTab("Graduate")}
            className={`level_tab ${
              levelTabActive === "Graduate" ? "level_tab_active" : ""
            }`}
          >
            <h3>Graduate</h3>
          </div>
          <div
            onClick={() => setLevelTab("Professional")}
            className={`level_tab ${
              levelTabActive === "Professional" ? "level_tab_active" : ""
            }`}
          >
            <h3>Professional</h3>
          </div>
        </div>

        <div className="level_content">
          {levelTabActive === "Graduate" ? (
            <StackedBarChartSINGLECOMPONENT_copy
              className="graphics"
              width={750}
              height={500}
              margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_summary_complete.csv"
              }
              dataFilter={(el) => el["Student Level"] == "Graduate "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["College Name"]}
            />
          ) : levelTabActive === "Professional" ? (
            <StackedBarChartSINGLECOMPONENT_copy
              className="graphics"
              width={750}
              height={500}
              margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_summary_complete.csv"
              }
              dataFilter={(el) => el["Student Level"] == "Professional "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["College Name"]}
            />
          ) : (
            <StackedBarChartSINGLECOMPONENT_copy
              className="graphics"
              width={750}
              height={500}
              margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_summary_complete.csv"
              }
              dataFilter={(el) => el["Student Level"] == "Undergraduate "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["College Name"]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CollegePage;
