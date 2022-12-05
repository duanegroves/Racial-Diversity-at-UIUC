import React, { useState } from "react";
// import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
// import StackedBarChart from "./StackedBarChart/StackedBarChart";

const CollegePage = () => {
  const [levelTabActive, setLevelTab] = useState("Undergraduate ");

  const levelTabOptions = ["Undergraduate ", "Graduate ", "Professional "];

  return (
    <>
      <h1 className="first_title">College Overview</h1>
      <p>
        In this college overview page, you can now take a look at the make-up of
        each college independantly. Hopefully, in continuing the pattern from
        the previous campus overview page, this will start to hit more on how
        the different colleges may or may not tell different stories. One
        example of this may be comparing Grainger Engineering and Buisness to
        other colleges. As of 2022, the majority of colleges have around 12% to
        17% Hispanic, however, the major colleges of Engineering and Buisness
        (which debatably enable the most socioeconomic movement) present
        statistics that show around 6% and 8%. Either from self-selection bias,
        socioeconomic background, or tokenization, this is one example of
        critical thought which I hope is inspired by these statistics.
      </p>
      <p>
        In the future I have the same aspirations of showcasing the data with
        different types of graphics and colors to enable each individual to use
        the application in a way that bests suits them.
      </p>
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
            height={500}
            margin={{ top: 20, right: 30, bottom: 65, left: 220 }}
            dataCsvUrl={
              "https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_summary_complete.csv"
            }
            dataFilter={(el) => el["Student Level"] == levelTabActive}
            xValue={(d) => d["Total"]}
            yValue={(d) => d["College Name"]}
          />
        </div>
      </div>
    </>
  );
};

export default CollegePage;
