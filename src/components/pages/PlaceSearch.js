import React, { useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import { useNavigate } from "react-router-dom";
import placesearch from "./PlaceSearch.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tmap from "../../UI/Tmap/tmap";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";

function PlaceSearch() {
  const navigate = useNavigate();
  const [dayPlus, setDayPlus] = useState(1);
  const [calendars, setCalendars] = useState([{ time: new Date() }]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const saveButtonClick = () => {
    navigate("/myplanner");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDayPlus = () => {
    setDayPlus((prev) => prev + 1);
    setCalendars((prevCalendars) => [...prevCalendars, { time: new Date() }]);
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
    setDayPlus((prev) => prev - 1);
  };

  const handleToggleInput = (index) => {
    setSelectedDayIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAddWaypoint = (index) => {
    const updatedCalendars = [...calendars];
    updatedCalendars[index].waypoints = updatedCalendars[index].waypoints || [];
    updatedCalendars[index].waypoints.push({
      waypoint: "",
      waypointTime: null,
    });
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
                    placeholder="출발지: 장소이름"
                    value={calendar.start || ""}
                    onChange={(e) =>
                      handleInputChange(index, "start", e.target.value)
                    }
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
                        placeholder={`경유지 ${waypointIndex + 1}: 장소이름`}
                        value={waypoint.waypoint || ""}
                        onChange={(e) =>
                          handleWaypointInputChange(
                            index,
                            waypointIndex,
                            "waypoint",
                            e.target.value
                          )
                        }
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
                <div className={placesearch.inputGroup}>
                  <input
                    type="text"
                    className={placesearch.inputField}
                    placeholder="도착지: 장소이름"
                    value={calendar.end || ""}
                    onChange={(e) =>
                      handleInputChange(index, "end", e.target.value)
                    }
                  />
                  <DatePicker
                    selected={calendar.endTime}
                    onChange={(date) =>
                      handleInputChange(index, "endTime", date)
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="yyyy/MM/dd HH:mm"
                    className={placesearch.datePicker}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {dayPlus > 0 && selectedDayIndex !== null && (
        <>
          <Ghost
            text="경유지 추가"
            style={{ color: "#3da5f5" }}
            onClick={() => handleAddWaypoint(selectedDayIndex)}
          />

          <Ghost
            text="삭제"
            style={{ color: "red" }}
            onClick={() => handleDeleteDay(selectedDayIndex)}
          />
        </>
      )}
      <div className="container">
        <form className={placesearch.form}>
          <Base placeholder="장소를 검색하세요" />
          <Primary isShortPrimary="true" text="검색" />
        </form>
      </div>
      <Tmap />
    </>
  );
}

export default PlaceSearch;
