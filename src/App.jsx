import React, { useEffect, useState } from "react";
import "./styles.css";
import Papa from "papaparse";
import PHScale from "./PHScale";
import OxygenLevelCircle from "./OxygenLevelCircle";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const googleDriveCsvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRWgtxHG2hLyrOTSPxgKrMzhGlkcqdyLV8tQobZa8B4Pah4giCjY-Ek5euXmK5hvxf3vvPLZTHfzJG/pub?gid=156216978&single=true&output=csv";
      const dataTestArduino =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2WvNSmE8sFCEviG3keE78vd0vCAJJp5bC7NrV8LHCpyKr_8rcax51IpHHbUClx6bjAEeAeNYnQkrk/pub?output=csv";
      Papa.parse(googleDriveCsvUrl, {
        download: true,
        delimeter: ",",
        complete: function (results) {
          let metrics = {
            pH: results.data[results.data.length - 1][0],
            "Oxygen Level": results.data[results.data.length - 1][1],
            Salinity: results.data[results.data.length - 1][2],
            Turbidity: results.data[results.data.length - 1][3],
            TDS: results.data[results.data.length - 1][4],
            "Nitride Conc.": results.data[results.data.length - 1][5],
          };
          setData(metrics);
        },
      });
    };
    fetchData();
    const intervalID = setInterval(fetchData, 5000); //5 second intervals

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <QualityBanner />
      <Metrics data={data} />
      <Footer />
    </div>
  );
};

const Header = () => {
  return <header></header>;
};

const QualityBanner = () => {
  return <div className="quality-banner">Water Quality: Very Good 👌</div>;
};

const Metrics = ({ data }) => {
  console.log("Received Data in Metrics:", data);
  return (
    <div className="metrics">
      {Object.entries(data).map(([name, value]) => (
        <Metric key={name} name={name} value={value} />
      ))}
    </div>
  );
};

const Metric = ({ name, value }) => {
  console.log("Metric:", name, value);
  return (
    <div className="metric">
      {name === "pH" ? (
        <div className="metric-value">
          <PHScale pH={value} />
        </div>
      ) : name === "Oxygen Level" ? (
        <div className="metric-value">
          <OxygenLevelCircle oxygenLevel={value} />
        </div>
      ) : (
        <p>
          {value} {getUnitRate(name)}
        </p>
      )}
      <h2>{name}</h2>
    </div>
  );
};

const getUnitRate = (name) => {
  switch (name) {
    case "Salinity":
      return "ppm"; // Parts per million
    case "Turbidity":
      return "NTU"; // Nephelometric Turbidity Units
    case "TDS":
      return "ppm"; // Parts per million
    case "Nitride Conc.":
      return "mg/L"; // Milligrams per liter
    default:
      return ""; // Default case
  }
};

const Footer = () => {
  return <footer></footer>;
};

export default Dashboard;
