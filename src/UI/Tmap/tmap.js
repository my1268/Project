import { useState, useEffect } from "react";
import axios from "axios";
import tmap from "./tmap.module.css";

function Tmap() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const initTmap = () => {
      const map = new window.Tmapv2.Map("map_div", {
        center: new window.Tmapv2.LatLng(
          37.566481622437934,
          126.98502302169841
        ),
        width: "960px",
        height: "860px",
        zoom: 15,
      });
      // 시작, 도착 심볼찍기
      // 시작
      let marker_s = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(
          37.568085523663385,
          126.98605733268329
        ),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });

      // 도착
      let marker_e = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(
          37.56445848334345,
          127.00973587385866
        ),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });

      // 경유지 1
      let marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(
          37.56626352138058,
          126.98735015742581
        ),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });

      // 경유지 2
      marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(
          37.56568310756034,
          127.00221495976581
        ),
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_2.png",
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });

      axios
        .post(
          "https://apis.openapi.sk.com/tmap/routes/routeOptimization10?version=1&format=json",
          {
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            startName: "출발",
            startX: "126.98605733268329",
            startY: "37.568085523663385",
            startTime: "201711121314",
            endName: "도착",
            endX: "127.00973587385866",
            endY: "37.56445848334345",
            searchOption: "0",
            viaPoints: [
              {
                viaPointId: "test01",
                viaPointName: "test01",
                viaX: "126.98735015742581",
                viaY: "37.56626352138058",
              },
              {
                viaPointId: "test02",
                viaPointName: "test02",
                viaX: "127.00221495976581",
                viaY: "37.56568310756034",
              },
            ],
          },
          {
            headers: {
              appKey: "ak9ppJ67Hp58KTRxEVc5D5cZKo4vuyA834Ni4O3f",
            },
          },
          { "Content-Type": "application/json" }
        )
        .then((response) => {
          var resultData = response.data.properties;
          var resultFeatures = response.data.features;

          // 결과 출력
          var tDistance =
            "총 거리 : " +
            (resultData.totalDistance / 1000).toFixed(1) +
            "km,  ";
          var tTime =
            "총 시간 : " + (resultData.totalTime / 60).toFixed(0) + "분,  ";
          var tFare = "총 요금 : " + resultData.totalFare + "원";

          document.getElementById("result").textContent =
            tDistance + tTime + tFare;

          for (var i in resultFeatures) {
            var geometry = resultFeatures[i].geometry;
            var properties = resultFeatures[i].properties;
            var polyline;

            var drawInfoArr = [];

            if (geometry.type === "LineString") {
              for (var j in geometry.coordinates) {
                var latlng = new window.Tmapv2.Point(
                  geometry.coordinates[j][0],
                  geometry.coordinates[j][1]
                );
                var convertPoint =
                  new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlng
                  );
                var convertChange = new window.Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                );

                drawInfoArr.push(convertChange);
              }

              polyline = new window.Tmapv2.Polyline({
                path: drawInfoArr,
                strokeColor: "#FF0000",
                strokeWeight: 6,
                map: map,
              });
            }
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    };

    if (showMap) {
      initTmap();
    }
  }, [showMap]);

  const handleClick = () => {
    setShowMap(true);
  };

  return (
    <div className="App">
      <button className={tmap.showMap} onClick={handleClick}>
        Show Map
      </button>
      {showMap && <div id="map_div" className={tmap.position}></div>}
      <div id="result" className={tmap.result}></div>
    </div>
  );
}
export default Tmap;
