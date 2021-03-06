import classNames from 'classnames';
import '../../css/calendar-list.css';
import React, { useState, useEffect, useRef } from 'react';

export default function CalendarList(props) {
  const {
    title, color, isChecked, getCheckedStatus, index, allPlanList, calendarId, getEditCalendar, getCalendarSort,
  } = props;
  const [toggle, setToggle] = useState(isChecked);

  const onToggle = () => {
    if (toggle) {
      setToggle(false);
      getCheckedStatus(index, false);
    } else {
      setToggle(true);
      getCheckedStatus(index, true);
    }
  };

  const planList = allPlanList.filter((ele) => (ele.addTo === calendarId));

  let allTodo = 0;
  for (let i = 0; i < planList.length; i += 1) {
    allTodo += planList[i].todoList.length;
  }

  let checkdeTodo = 0;
  for (let i = 0; i < planList.length; i += 1) {
    checkdeTodo += planList[i].todoList.filter((ele) => (ele.isChecked === true)).length;
  }

  const todoProgress = (checkdeTodo / allTodo) * 100;

  const progressColor = color.rgb.replace(')', ',0.3)');

  const atEdit = () => {
    getEditCalendar(calendarId, true);
  };

  const atDrag = (e) => {
    e.target.dataset.isdrag = 'dragging';
    e.dataTransfer.setData('text', index);
    // console.log(index);
    // setDragId(e.target.id);
  };

  const atDrop = (e) => {
    const dragIndex = e.dataTransfer.getData('text');
    getCalendarSort(dragIndex, index);
    e.target.dataset.isdrag = 'null';
  };

  // const atDragOver = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="calendar-card" draggable="true" id={calendarId} onDragStart={atDrag} onDrop={atDrop} data-isdrag="null">
      <div className="boxTrigger pointer" onClick={onToggle}>
        <svg className="checkbox" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.67139" y="1" width="31.6" height="31.6" rx="7" fill="white" stroke={color.rgb} strokeWidth="2" />
        </svg>
        <svg className={classNames('checked', { active: toggle })} viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-outside-1" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="24" fill="black">
            <rect fill="white" width="31" height="24" />
            <path fillRule="evenodd" clipRule="evenodd" d="M29.5173 4.27178C30.2333 3.44489 30.1422 2.19553 29.3138 1.48126C28.4854 0.766998 27.2334 0.858301 26.5174 1.6852L11.8254 18.652L4.05533 10.8986C3.28117 10.1261 2.026 10.1261 1.25184 10.8986C0.477678 11.6711 0.47768 12.9236 1.25184 13.6961L10.1911 22.6162C10.7794 23.2032 11.6454 23.3441 12.3671 23.039C12.9202 23.0365 13.4695 22.8044 13.8596 22.3538L29.5173 4.27178Z" />
          </mask>
          <path fillRule="evenodd" clipRule="evenodd" d="M29.5173 4.27178C30.2333 3.44489 30.1422 2.19553 29.3138 1.48126C28.4854 0.766998 27.2334 0.858301 26.5174 1.6852L11.8254 18.652L4.05533 10.8986C3.28117 10.1261 2.026 10.1261 1.25184 10.8986C0.477678 11.6711 0.47768 12.9236 1.25184 13.6961L10.1911 22.6162C10.7794 23.2032 11.6454 23.3441 12.3671 23.039C12.9202 23.0365 13.4695 22.8044 13.8596 22.3538L29.5173 4.27178Z" fill={color.rgb} />
          <path d="M29.3138 1.48126L29.6403 1.10258L29.3138 1.48126ZM29.5173 4.27178L29.8953 4.59909H29.8953L29.5173 4.27178ZM26.5174 1.6852L26.1394 1.35789L26.5174 1.6852ZM11.8254 18.652L11.4722 19.0059L11.8521 19.385L12.2034 18.9793L11.8254 18.652ZM4.05533 10.8986L3.70216 11.2526L4.05533 10.8986ZM1.25184 13.6961L0.89867 14.05L1.25184 13.6961ZM10.1911 22.6162L10.5443 22.2622L10.1911 22.6162ZM12.3671 23.039L12.3648 22.539L12.2646 22.5395L12.1724 22.5785L12.3671 23.039ZM13.8596 22.3538L14.2376 22.6811L13.8596 22.3538ZM28.9873 1.85994C29.6063 2.39362 29.6743 3.32665 29.1393 3.94448L29.8953 4.59909C30.7924 3.56313 30.6782 1.99744 29.6403 1.10258L28.9873 1.85994ZM26.8953 2.0125C27.4309 1.39405 28.3677 1.32573 28.9873 1.85994L29.6403 1.10258C28.6031 0.208269 27.0359 0.322556 26.1394 1.35789L26.8953 2.0125ZM12.2034 18.9793L26.8953 2.0125L26.1394 1.35789L11.4474 18.3247L12.2034 18.9793ZM3.70216 11.2526L11.4722 19.0059L12.1785 18.2981L4.4085 10.5447L3.70216 11.2526ZM1.60501 11.2526C2.184 10.6748 3.12317 10.6748 3.70216 11.2526L4.4085 10.5447C3.43916 9.57746 1.86801 9.57746 0.898668 10.5447L1.60501 11.2526ZM1.60501 13.3422C1.02662 12.765 1.02662 11.8297 1.60501 11.2526L0.898668 10.5447C-0.0712643 11.5126 -0.0712624 13.0822 0.89867 14.05L1.60501 13.3422ZM10.5443 22.2622L1.60501 13.3422L0.89867 14.05L9.83794 22.9701L10.5443 22.2622ZM12.1724 22.5785C11.6314 22.8072 10.9836 22.7006 10.5443 22.2622L9.83794 22.9701C10.5752 23.7058 11.6594 23.881 12.5618 23.4995L12.1724 22.5785ZM13.4816 22.0265C13.19 22.3633 12.78 22.5372 12.3648 22.539L12.3693 23.539C13.0604 23.5359 13.7489 23.2454 14.2376 22.6811L13.4816 22.0265ZM29.1393 3.94448L13.4816 22.0265L14.2376 22.6811L29.8953 4.59909L29.1393 3.94448Z" fill={color.rgb} mask="url(#path-1-outside-1)" />
        </svg>
      </div>
      <div className="content">
        <span className="title">{title}</span>
        <svg className="edit" onClick={atEdit} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.6522 4.43601L21.5645 7.34688L18.6522 4.43601ZM20.525 1.87163L12.6504 9.74626C12.2435 10.1526 11.966 10.6702 11.8529 11.234L11.1255 14.875L14.7665 14.1463C15.3302 14.0335 15.8472 13.7571 16.2542 13.3501L24.1289 5.47551C24.3655 5.23887 24.5532 4.95795 24.6813 4.64877C24.8093 4.33959 24.8752 4.00822 24.8752 3.67357C24.8752 3.33892 24.8093 3.00754 24.6813 2.69837C24.5532 2.38919 24.3655 2.10826 24.1289 1.87163C23.8922 1.635 23.6113 1.44729 23.3021 1.31922C22.993 1.19116 22.6616 1.12524 22.3269 1.12524C21.9923 1.12524 21.6609 1.19116 21.3517 1.31922C21.0425 1.44729 20.7616 1.635 20.525 1.87163V1.87163Z" stroke={color.rgb} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.1255 17.625V21.75C22.1255 22.4793 21.8358 23.1788 21.32 23.6945C20.8043 24.2103 20.1048 24.5 19.3755 24.5H4.25049C3.52114 24.5 2.82167 24.2103 2.30594 23.6945C1.79022 23.1788 1.50049 22.4793 1.50049 21.75V6.625C1.50049 5.89565 1.79022 5.19618 2.30594 4.68046C2.82167 4.16473 3.52114 3.875 4.25049 3.875H8.37549" stroke={color.rgb} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {allTodo >= 1 && (
        <div className="progress-bar" style={{ backgroundColor: progressColor }}>
          <div className="todo-progress" style={{ width: `${todoProgress}%`, backgroundColor: color.rgb }} />
        </div>
        )}
      </div>
    </div>
  );
}
