import React from "react";

const CollegePage = () => {
  return (
    <>
      <h1 className="first_title">College Overview</h1>
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
              height={700}
              margin={{ top: 20, right: 30, bottom: 65, left: 50 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/years_summary.csv"
              }
              dataFilter={(el) => el.Level == "Graduate "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["Year"]}
            />
          ) : levelTabActive === "Professional" ? (
            <StackedBarChartSINGLECOMPONENT_copy
              className="graphics"
              width={750}
              height={700}
              margin={{ top: 20, right: 30, bottom: 65, left: 50 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/years_summary.csv"
              }
              dataFilter={(el) => el.Level == "Professional "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["Year"]}
            />
          ) : (
            <StackedBarChartSINGLECOMPONENT_copy
              className="graphics"
              width={750}
              height={700}
              margin={{ top: 20, right: 30, bottom: 65, left: 50 }}
              dataCsvUrl={
                "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/years_summary.csv"
              }
              dataFilter={(el) => el.Level == "Undergraduate "}
              xValue={(d) => d["Total"]}
              yValue={(d) => d["Year"]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CollegePage;
