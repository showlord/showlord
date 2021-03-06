import React, { useState, useEffect } from 'react';
import CalendarList from './CalenarList/CalendarList';

export default function SideBar(props) {
  const {
    calendarWindow, calendarList, getCheckedStatus, allPlanList, getEditCalendar, getCalendarSort, calendarSort,
  } = props;

  const [list, setList] = useState(calendarList);

  const atAddCalendar = () => {
    calendarWindow(true);
  };

  const atDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const arr = [...calendarList].sort((a, b) => calendarSort.indexOf(a.calendarId) - calendarSort.indexOf(b.calendarId));
    setList(arr);
  }, [calendarSort]);

  return (
    <div className="side-bar">
      <img className="logo" src={require('img/Logo.png')} alt="logo" />
      <button className="add-calendar pointer" onClick={atAddCalendar}> 新增日曆 ＋ </button>
      <div className="calendar-list" onDragOver={atDragOver}>
        {
        list.map((ele, index) => (
          <CalendarList
            title={ele.title}
            color={ele.color}
            key={ele.calendarId}
            isChecked={ele.isChecked}
            getCheckedStatus={getCheckedStatus}
            index={index}
            allPlanList={allPlanList}
            calendarId={ele.calendarId}
            getEditCalendar={getEditCalendar}
            getCalendarSort={getCalendarSort}
          />
        ))
        }
      </div>
      <div className="user-card">
        <div className="user">
          <img className="avatar" src={require('img/avatar.png')} alt="avatar" />
          <div className="info">
            <span>Show Lo Lo</span>
            <span>iiiishowlo@gmail.com</span>
          </div>
        </div>
        <img className="setting pointer" src={require('img/user.png')} alt="logo" />
      </div>
    </div>
  );
}
