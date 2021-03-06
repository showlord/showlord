import React, { useState } from 'react';
import Calendar from './Calendar/Calendar';
import { currentDayId } from './Calendar/DateString';

export default function Main(props) {
  const {
    planWindow, planList, getPlanDate, getPlan,
  } = props;

  const addPlan = () => {
    planWindow(true);
    getPlanDate(currentDayId);
  };

  return (

    <div className="main">

      <img className="notification pointer" src={require('img/notification.png')} alt="logo" />
      <button className="add-plan pointer" onClick={addPlan}> 新增計畫 ＋ </button>

      <Calendar planWindow={planWindow} planList={planList} getPlanDate={getPlanDate} getPlan={getPlan} />
    </div>
  );
}
