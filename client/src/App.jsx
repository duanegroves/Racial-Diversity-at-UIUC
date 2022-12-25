import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuildingColumns,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import PersonalImage from "./assets/Beaver.PNG";
import OverviewPage from "./components/Overview";
import CollegePage from "./components/College";
import MajorPage from "./components/Major";

const App = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logo_flex">
          <img
            width="50"
            alt="Illinois Fighting Illini logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/128px-Illinois_Fighting_Illini_logo.svg.png"
          />
        </div>
        <div className="nav_flex">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "nav_link_active" : "nav_link"
            }
          >
            <FontAwesomeIcon size="xl" icon={faHome} />
          </NavLink>
          <NavLink
            to="/college"
            className={(navData) =>
              navData.isActive ? "nav_link_active" : "nav_link"
            }
          >
            <FontAwesomeIcon size="xl" icon={faBuildingColumns} />
          </NavLink>
          <NavLink
            to="/major"
            className={(navData) =>
              navData.isActive ? "nav_link_active" : "nav_link"
            }
          >
            <FontAwesomeIcon size="xl" icon={faBook} />
          </NavLink>
        </div>
        {/* <a
          href="https://github.com/duanegroves/Racial-Diversity-at-UIUC"
          className="nav_link code_link"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon size="xl" icon={faCode} />
        </a> */}
      </div>

      <div className="main">
        <div className="title_area">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/University_of_Illinois_at_Urbana-Champaign_Wordmark.svg"
            alt=""
          />
        </div>
        <div className="personal_area">
          <div className="flex">
            <img src={PersonalImage} alt="" className="avatar" />
            <div>
              <sub>Creator:</sub>
              <h2>Duane S. Groves</h2>
            </div>
          </div>
        </div>
        <div className="purpose_area">
          <h2 className="first_title">Racial Demographics at UIUC</h2>
          <p>
            For{" "}
            <a href="http://catalog.illinois.edu/courses-of-instruction/is/">
              INFO 308 - Race, Gender, and Info Tech - at UIUC
            </a>
            , students were challenge to find creative ways to express their
            learnings from the semester in a final nontraditional "unessay."
            With experience in web development and an interest in{" "}
            <a href="https://www.linkedin.com/learning/diversity-inclusion-and-belonging-2019">
              diversity, inclusion, and belonging (DIBs)
            </a>
            , I wanted to utilize my skills to take a look at Racial Diversity
            at UIUC.
          </p>
          <p>
            With inspiration from{" "}
            <a href="https://waf.cs.illinois.edu/discovery/Gender-Diversity-at-UIUC/">
              Prof. Wade's Gender Diversity at UIUC project
            </a>{" "}
            and data from{" "}
            <a href="https://dmi.illinois.edu/index.htm">
              the Illinois Division of Management Information
            </a>
            , this tool aims to provide information on raw data and context for
            discussions on diversity. Though it is widely considered that UIUC
            is one of the most diverse colleges in the world, there is always
            room for improvement. Students have begun to anecdotally see this in
            how some majors seem more concentrated than others. By presenting
            raw statistics and resources, one can move past anecdotal evidence
            as well as start to speculate on the underlying structures in place
            which are causing the possible concentrations.
          </p>
          <p className="counter-text">
            This page has been viewed at least &nbsp;
            <img
              src="https://stuff.mit.edu/cgi/counter/duanegroves_racial_diversity_at_uiuc"
              alt="counter"
              className="counter"
            />{" "}
            &nbsp; times
          </p>
        </div>
        <div className="info_area">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/college" element={<CollegePage />} />
            <Route path="/major" element={<MajorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
