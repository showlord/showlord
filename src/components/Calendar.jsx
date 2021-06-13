import React, { useState, useEffect } from 'react';
import DaysTable from './DaysTable';
// import Plan from './Plan/Plan';

export default function Calendar(props) {
  const { planStatus } = props;
  const [days, setDays] = useState([]);
  const [dt, setDt] = useState(new Date());

  const currentYear = new Date().getFullYear();
  const currentMon = new Date().getMonth();
  const currentDate = new Date().getDate();
  const currentDayId = Date.parse(new Date(currentYear, currentMon, currentDate));

  // const day = dt.getDate();
  const mon = dt.getMonth();
  const year = dt.getFullYear();

  // const currentDay = new Date(year, mon + 1, day); // Tue Jun 01 2021
  const daysCount = new Date(year, mon + 1, 0).getDate(); // 30
  const daysCountPreMon = new Date(year, mon, 0).getDate(); // 31
  const firstWeekDay = new Date(year, mon, 1).getDay(); // 2
  const monYear = `${dt.toDateString().split(' ')[1]} ${dt.toDateString().split(' ')[3]}`;

  const navMon = (dt.getMonth() + 1).toString();
  const navYear = dt.getFullYear().toString();

  const getPrev = () => {
    const month = new Date(year, dt.getMonth() - 1);
    setDt(month);
  };

  const getNext = () => {
    const month = new Date(year, dt.getMonth() + 1);
    setDt(month);
  };

  const addPlan = () => {
    planStatus(true);
  };

  useEffect(() => {
    const array = [];
    for (let i = daysCountPreMon - firstWeekDay + 1; i <= daysCountPreMon; i += 1) {
      const dayId = Date.parse(new Date(year, mon - 1, i));
      const obj = { id: dayId, day: i };
      array.push(obj);
      // console.log(obj);
    }

    for (let i = 1; i <= daysCount; i += 1) {
      const dayId = Date.parse(new Date(year, mon, i));
      const obj = { id: dayId, day: i };
      array.push(obj);
    }

    for (let i = 1; i <= 42 - (daysCount + firstWeekDay); i += 1) {
      const dayId = Date.parse(new Date(year, mon + 1, i));
      const obj = { id: dayId, day: i };
      array.push(obj);
    }
    setDays(array);
    console.log(array);
    console.log(currentDayId);
  }, [dt]);

  return (
    <div className="calendar">
      <div className="Nav">
        <img src={require('img/notification.png')} alt="logo" className="notification" />
        <img src={require('img/Prev.png')} alt="logo" onClick={getPrev} />
        <div>{navYear} 年 {navMon} 月</div>
        <img src={require('img/Next.png')} alt="logo" onClick={getNext} />
        <button onClick={addPlan}> 新增計畫 ＋ </button>
      </div>
      <div className="weekdays">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>

      <div className="table">
        {
            days.map((obj, index) => (
              <DaysTable
                key={obj.id}
                dayId={obj.id}
                index={index}
                day={obj.day}
                paddingCountPrev={firstWeekDay}
                paddingCountNext={firstWeekDay + daysCount}
                currentDay={currentDayId}
              />
            ))
          }
      </div>

    </div>
  );
}