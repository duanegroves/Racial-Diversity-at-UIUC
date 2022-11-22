import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import BarChart from './components/BarChart/BarChart';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import PersonalImage from './assets/Beaver.PNG'

const App = () => {
  return (
    <>
      <div className="sidebar">
        <div className="test">
          <img width="50" alt="Illinois Fighting Illini logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/128px-Illinois_Fighting_Illini_logo.svg.png" />
        </div>
        <a href="#home"><FontAwesomeIcon size="xl" icon={faHome} className="sidebar_icon" /></a>
        <a href="#home"><FontAwesomeIcon size="xl" icon={faHome} className="sidebar_icon" /></a>
        <a href="#home"><FontAwesomeIcon size="xl" icon={faHome} className="sidebar_icon" /></a>
        <a href="#home"><FontAwesomeIcon size="xl" icon={faHome} className="sidebar_icon" /></a>
      </div>

      <div className="main">
        <div className="grid">
          <div className="title_area">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/University_of_Illinois_at_Urbana-Champaign_Wordmark.svg" alt="" />
          </div>
          <div className="personal_area">
            <div className="flex">
              <img src={PersonalImage} alt="" className='avatar'/>
              <div>
                <sub>Creator:</sub>
                <h2>Duane S. Groves</h2>
              </div>
            </div>
              <p >
                Hello, I am a CS+Phil student here at UIUCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </p>
          </div>
          <div className="purpose_area">
            <h2>Intro</h2>
          </div>
          <div className="info_area">
            <StackedBarChart 
              width={800}
              height={500}
              margin={{top:20, right:30, bottom:65, left:220}}
              dataCsvUrl={'https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_undergraduate_summary.csv'}
              xValue={d=> d['Total']}
              yValue={d=> d['College Name']}
              />
            <BarChart 
              width={800}
              height={500}
              margin={{top:20, right:30, bottom:65, left:220}}
              dataCsvUrl={'https://raw.githubusercontent.com/duanegroves/Racial-Diversity-at-UIUC/main/data/d3_readable_csv/2022fa_undergraduate_summary.csv'}
              xValue={d=> d['Total']}
              yValue={d=> d['College Name']}
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
