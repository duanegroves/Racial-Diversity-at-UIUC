import { useState, useEffect } from "react";
import * as d3 from "d3";

const useData = (csvUrl) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      for (let key in d) {
        if (
          key !== "College Name" &&
          key !== "Student level" &&
          key !== "Level"
        ) {
          d[key] = +d[key];
        }
      }
      return d;
    };
    d3.csv(csvUrl, row).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};

export default useData;
