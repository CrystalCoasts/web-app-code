import React, { useEffect, useState } from "react";
import "./styles.css";
import Papa from "papaparse";
import PHScale from "./PHScale";
import OxygenLevelCircle from "./OxygenLevelCircle";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [lastRowLength, setLastRowLength] = useState(0); //new

  useEffect(() => {
    const fetchData = async () => {
      const googleDriveCsvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRWgtxHG2hLyrOTSPxgKrMzhGlkcqdyLV8tQobZa8B4Pah4giCjY-Ek5euXmK5hvxf3vvPLZTHfzJG/pub?gid=156216978&single=true&output=csv";
      const dataTestArduino =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2WvNSmE8sFCEviG3keE78vd0vCAJJp5bC7NrV8LHCpyKr_8rcax51IpHHbUClx6bjAEeAeNYnQkrk/pub?output=csv";

      Papa.parse(dataTestArduino, {
        download: true,
        header: true,
        complete: function (results) {
          const newDataArray = results.data;
          const newDataLength = newDataArray.length;
          // Check if new data has been added since the last fetch
          if (newDataLength > lastRowLength) {
            const latestData = newDataArray[newDataLength - 1];
            setData({
              pH: latestData.pH,
              "Oxygen Level": latestData["Oxygen Level"],
              Salinity: latestData["Salinity"],
              Turbidity: latestData["Turbidity"],
              TDS: latestData["TDS"],
              Temperature: latestData["Temperature"],
            });
            setLastRowLength(newDataLength); // Update the last row length
          }
        },
      });
    };

    fetchData();
    const intervalID = setInterval(fetchData, 15000); //15 second intervals

    return () => {
      clearInterval(intervalID);
    };
  }, [lastRowLength]);

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
  return <div className="quality-banner">Water Quality: Very Good</div>;
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
    case "Temperature":
      return "°F"; // degrees fahrenheit
    default:
      return ""; // Default case
  }
};

const Footer = () => {
  return <footer></footer>;
};

export default Dashboard;
