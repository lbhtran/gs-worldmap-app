import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import Tabletop from "tabletop";

const MapChart = ({ setTooltipContent }) => {
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: "1Bj90JcLRXxzJsb9lNidpXn5ofRMCCNOEKtS1jI68I9Q",
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  const colorScale = scaleOrdinal(schemeCategory10);

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 175
        }}
      >
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;

                      let tooltipContent = "";
                      if (d) {
                        const { Info1, Info2, Info3 } = d;
                        tooltipContent =
                          "Country: " +
                          NAME +
                          "<br>Info 1: " +
                          Info1 +
                          "<br>Info 2: " +
                          Info2 +
                          "<br>Info 3: " +
                          Info3;
                      }
                      setTooltipContent(tooltipContent);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    fill={d ? colorScale(d["Status"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
