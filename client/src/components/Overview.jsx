import React, { useState } from "react";
// import StackedBarChartSINGLECOMPONENT from "./StackedBarChartSINGLECOMPONENT/StackedBarChartSINGLECOMPONENT";
import StackedBarChartSINGLECOMPONENT_copy from "./StackedBarChartSINGLECOMPONENT copy/StackedBarChartSINGLECOMPONENT";
// import StackedBarChart from "./StackedBarChart/StackedBarChart";

const OverviewPage = () => {
  const [levelTabActive, setLevelTab] = useState("Undergraduate ");

  const levelTabOptions = ["Undergraduate ", "Graduate ", "Professional "];

  return (
    <>
      <h1 className="first_title">Campus Overview</h1>
      <p>
        Here, in the campus overview page, we can start to see what student
        diversity looks like at the University of Illinois - Urbana Champaign.
        This initial graph grouped by every year since 2014 and joining counts
        of all majors, disciplines, and student levels, you can see the overall
        trend of how UIUC is approaching diveristy. Though unable to see the
        specific breakdown of the joined counts, the ability to see the overall
        trend is a critical component in thinking critically about the topic of
        diversity at UIUC.
      </p>
      <p>
        In the future, I hope to be able to present different types of graphics
        to better enable the goal of showcasing the university's change over
        time, as well as enable the user to switch between the different types
        of views and colors to best enable them to comprend the data they wish
        to extract. However, for the time being I hope that you can see some of
        a trend of what is happening year by year at the university as well as
        pay attention to what colors you don't see present in the graph if at
        all.
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
      <p>
        Now that you have hopefully taken time to look at what the overall trend
        of diversity looks like at the University of Illinois - Urbana
        Champaign, please take a look at how that overall trend over the years
        is broken up by student level (undergraduate, graduate, and
        professional). I inspire you to become interested in how the different
        levels tell different stories, how they may be better or worse, how each
        of them play different roles in the above graphic's overall story, and
        maybe even why these differentiations are present.
      </p>
      <p>
        This trend of an overall view followed by a more specific breakdown is
        how each page is formulated throughout the entirity of the
        project/application, as well as how the entirity of the project is
        formulated. As we look at overall univeristy, to a college's breakdown,
        to even a major's breakdown. I hope the intrigue of the different
        stories carries over, and the structure helps you formulate your ideas
        about the information presented.
      </p>
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
