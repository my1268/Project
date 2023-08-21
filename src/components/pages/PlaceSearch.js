import React, { useState, useEffect } from "react";
import Ghost from "../../UI/Button/Ghost";
import { useNavigate } from "react-router-dom";
import placesearch from "./PlaceSearch.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import axios from "axios";

function PlaceSearch() {
  const navigate = useNavigate();
  const [dayPlus, setDayPlus] = useState(1);
  const [calendars, setCalendars] = useState([{ time: new Date() }]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [markerNumber, setMarkerNumber] = useState(1);
  const [clickCounts, setClickCounts] = useState(Array(dayPlus).fill(0));
  const [waypointClickCounts, setWaypointClickCounts] = useState(
    Array(dayPlus).fill(0)
  );
  const [polyline, setPolyline] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [showResetMarker, setShowResetMarker] = useState(false);

  const saveButtonClick = () => {
    navigate("/myplanner");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDayPlus = () => {
    setDayPlus((prev) => prev + 1);
    setCalendars((prevCalendars) => [...prevCalendars, { time: new Date() }]);
    setClickCounts((prevClickCounts) => [...prevClickCounts, 0]);
    setWaypointClickCounts((prevWaypointClickCounts) => [
      ...prevWaypointClickCounts,
      0,
    ]);
  };

  const handleInputChange = (index, property, value) => {
    const updatedCalendars = [...calendars];
    updatedCalendars[index][property] = value;
    setCalendars(updatedCalendars);
  };

  const handleDeleteDay = (index) => {
    const updatedCalendars = [...calendars];
    updatedCalendars.splice(index, 1);
    setCalendars(updatedCalendars);

    const newClickCounts = [...clickCounts];
    newClickCounts.splice(index, 1);
    setClickCounts(newClickCounts);

    const newWaypointClickCounts = [...waypointClickCounts];
    newWaypointClickCounts.splice(index, 1);
    setWaypointClickCounts(newWaypointClickCounts);
    setDayPlus((prev) => prev - 1);
    setSelectedDayIndex(null);
  };

  const handleToggleInput = (index) => {
    setSelectedDayIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAddWaypoint = (index) => {
    if (waypointClickCounts[index] >= 8) {
      return;
    }
    const updatedCalendars = [...calendars];
    updatedCalendars[index].waypoints = updatedCalendars[index].waypoints || [];
    updatedCalendars[index].waypoints.push({
      waypoint: "",
      waypointTime: null,
    });

    const newWaypointClickCounts = [...waypointClickCounts];
    newWaypointClickCounts[index] += 1;
    setWaypointClickCounts(newWaypointClickCounts);
    setCalendars(updatedCalendars);
  };

  const handleWaypointInputChange = (
    calendarIndex,
    waypointIndex,
    property,
    value
  ) => {
    const updatedCalendars = [...calendars];
    updatedCalendars[calendarIndex].waypoints[waypointIndex][property] = value;
    setCalendars(updatedCalendars);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/items?q=${searchKeyword}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const MapType = (type) => {
    if ("SATELLITE" === type) {
      map.setMapType(window.Tmapv2.Map.MapType.SATELLITE);
    } else if ("HYBRID" === type) {
      map.setMapType(window.Tmapv2.Map.MapType.HYBRID);
    } else if ("ROAD" === type) {
      map.setMapType(window.Tmapv2.Map.MapType.ROAD);
    }
  };

  useEffect(() => {
    const filteredSearchResults = searchResults.filter((result) =>
      result.title
        .split(" ")
        .some((word) =>
          word.toLowerCase().includes(searchKeyword.toLowerCase())
        )
    );
    setSearchResults(filteredSearchResults);
  }, [searchKeyword]);

  useEffect(() => {
    if (showMap) {
      const initTmap = () => {
        if (!map) {
          const newMap = new window.Tmapv2.Map("map_div", {
            center: new window.Tmapv2.LatLng(
              37.566481622437934,
              126.98502302169841
            ),
            width: "960px",
            height: "860px",
            zoom: 15,
          });
          setMap(newMap);
        }
      };
      initTmap();
    }
  }, [showMap]);

  const handleSaveItem = (item) => {
    const selectedCalendar = calendars[selectedDayIndex];
    if (selectedCalendar) {
      if (!selectedCalendar.start) {
        handleInputChange(selectedDayIndex, "start", item.title);
      } else {
        const waypoints = selectedCalendar.waypoints || [];
        const emptyWaypointIndex = waypoints.findIndex(
          (waypoint) => !waypoint.waypoint
        );
        if (emptyWaypointIndex !== -1) {
          handleWaypointInputChange(
            selectedDayIndex,
            emptyWaypointIndex,
            "waypoint",
            item.title
          );
        }
      }
      if (item.mapx && item.mapy && map) {
        console.log(`위도: ${item.mapy}, 경도: ${item.mapx}`);
        const currentMarkerNumber = markerNumber;
        setMarkerNumber(currentMarkerNumber + 1);
        if (!map.markers) {
          map.markers = [];
        }
        const iconUrl = `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_${currentMarkerNumber}.png`;
        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(item.mapy, item.mapx),
          icon: iconUrl,
          iconSize: new window.Tmapv2.Size(24, 38),
          map: map,
        });
        map.markers.push(marker);
        const polylineCoordinates = map.markers.map((m) => m.getPosition());
        if (polyline) {
          polyline.setMap(null);
        }
        setPolyline(
          new window.Tmapv2.Polyline({
            path: polylineCoordinates,
            strokeColor: "black",
            strokeWeight: 4,
            map: map,
          })
        );
        const bounds = new window.Tmapv2.LatLngBounds();
        map.markers.forEach((m) => bounds.extend(m.getPosition()));
        map.fitBounds(bounds);
      }
      let markerTotalDistance = 0;
      for (let i = 1; i < map.markers.length; i++) {
        const prevMarker = map.markers[i - 1];
        const currentMarker = map.markers[i];
        markerTotalDistance += prevMarker
          .getPosition()
          .distanceTo(currentMarker.getPosition());
      }
      setTotalDistance(markerTotalDistance / 1000);
      setShowResetMarker(true);
    }
  };

  const handleResetMarkers = () => {
    if (map && map.markers.length > 0) {
      map.markers.forEach((marker) => marker.setMap(null));
      map.markers = [];
      if (polyline) {
        polyline.setMap(null);
        setPolyline(null);
      }
      setTotalDistance(0);
      setMarkerNumber(1);
      setShowResetMarker(false);
    }
  };
  const handleClick = () => {
    setShowMap(true);
  };
  return (
    <>
      <div>
        <div>
          <Ghost text="뒤로가기" onClick={handleBack} />
          {[...Array(dayPlus)].map((_, index) => (
            <Ghost
              key={index}
              text={`${index + 1}일차`}
              className={` ${
                selectedDayIndex === index ? placesearch.selectedDay : ""
              }`}
              onClick={() => handleToggleInput(index)}
            />
          ))}
          {dayPlus < 16 && (
            <Ghost
              text="추가"
              style={{ color: "#3da5f5" }}
              onClick={handleDayPlus}
            />
          )}
          <Ghost
            className={placesearch.saveButton}
            text="저장하기"
            onClick={saveButtonClick}
          />
        </div>
      </div>
      <div className={placesearch.input}>
        {calendars.map((calendar, index) => (
          <div key={index}>
            {selectedDayIndex === index && (
              <div className={placesearch.inputContainer}>
                <div className={placesearch.inputGroup}>
                  <input
                    type="text"
                    className={placesearch.inputField}
                    placeholder="장소이름 1"
                    value={calendar.start || ""}
                    onChange={(e) =>
                      handleInputChange(index, "start", e.target.value)
                    }
                    readOnly
                  />
                  <DatePicker
                    selected={calendar.startTime}
                    onChange={(date) =>
                      handleInputChange(index, "startTime", date)
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="yyyy/MM/dd HH:mm"
                    className={placesearch.datePicker}
                  />
                </div>
                {calendar.waypoints &&
                  calendar.waypoints.map((waypoint, waypointIndex) => (
                    <div className={placesearch.waypoint} key={waypointIndex}>
                      <input
                        type="text"
                        className={placesearch.inputField}
                        placeholder={`장소이름 ${waypointIndex + 2}`}
                        value={waypoint.waypoint || ""}
                        onChange={(e) =>
                          handleWaypointInputChange(
                            index,
                            waypointIndex,
                            "waypoint",
                            e.target.value
                          )
                        }
                        readOnly
                      />
                      <DatePicker
                        selected={waypoint.waypointTime}
                        onChange={(date) =>
                          handleWaypointInputChange(
                            index,
                            waypointIndex,
                            "waypointTime",
                            date
                          )
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="yyyy/MM/dd HH:mm"
                        className={placesearch.datePicker}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {dayPlus > 0 && selectedDayIndex !== null && (
        <>
          {waypointClickCounts[selectedDayIndex] < 8 && (
            <Ghost
              text="경유지 추가"
              style={{ color: "#3da5f5" }}
              onClick={() => handleAddWaypoint(selectedDayIndex)}
            />
          )}
          <Ghost
            text="삭제"
            style={{ color: "red" }}
            onClick={() => handleDeleteDay(selectedDayIndex)}
          />
        </>
      )}
      <div className="container">
        <form className={placesearch.form} onSubmit={handleSearch}>
          <Base
            type="text"
            placeholder="키워드를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Primary
            isShortPrimary={true}
            text="검색"
            type="submit"
            onClick={handleSearch}
          />
        </form>
      </div>
      <div
        className={placesearch.tourapi}
        style={{ maxHeight: "820px", overflowY: "auto" }}
      >
        {searchResults.map((result, index) => (
          <div key={index}>
            <img
              src={result.image}
              alt={result.title}
              className={placesearch.img}
            />
            <h3>{result.title}</h3>
            <p>{result.addr1}</p>
            <button
              className={placesearch.inputSaveButton}
              onClick={() => handleSaveItem(result)}
            >
              저장
            </button>
          </div>
        ))}
      </div>
      <div className="App">
        <button className={placesearch.showMap} onClick={handleClick}>
          Show Map
        </button>
        {showMap && (
          <div>
            <div id="map_div" className={placesearch.position}>
              <div className={placesearch.changeMapButton}>
                <button onClick={() => MapType("ROAD")}>ROAD</button>
                <button onClick={() => MapType("SATELLITE")}>SATELLITE</button>
                <button onClick={() => MapType("HYBRID")}>HYBRID</button>
              </div>
            </div>
            {showResetMarker && (
              <>
                <button
                  className={placesearch.resetMarkers}
                  onClick={handleResetMarkers}
                >
                  마커 리셋
                </button>
                <p className={placesearch.totalDistance}>
                  마커 거리의 합: {totalDistance.toFixed(2)}km
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default PlaceSearch;
