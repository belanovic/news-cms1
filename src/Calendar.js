import React, { useState, useEffect, useContext } from 'react';
import ReactCalendar from 'react-calendar';
import dateFormat from './dateFormat';
import {context} from './newsContext';
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css';

export default function Calendar({setSelectedDate}) {

    const {showCalendar, setShowCalendar, calendarValue, calendarHandleChange, 
        calendarCheckValue, calendarSetCheckValue} = useContext(context);

    const handleCheck = (e)  => {
        calendarSetCheckValue(prev => !prev);
    }


    useEffect(() => {
        if(calendarCheckValue == false) {
            setSelectedDate(null)
        } else {
            setSelectedDate(calendarValue)
        }
        
    }, [calendarCheckValue])

    useEffect(() => {
        setSelectedDate((calendarValue));
    }, [calendarValue])

    return (
        <div
            className="calendar-wrapper"
        >
            <input 
                type = "checkbox"
                checked = {calendarCheckValue}
                onChange = {handleCheck}
  

                
            ></input>
            <div
                className= {`calendar-container ${calendarCheckValue && 'active'}`}
                /* onClick={() => setShowCalendar(prev => !prev)} */
            >
                <div
                    className="calendar-select"
                    onClick={() => setShowCalendar(prev => !prev)}
                >
                    <span>{dateFormat(calendarValue, 'month', 'dayMonth', 'year')}</span>
                    <i
                        className={`far fa-calendar-alt ${showCalendar && 'show'}`}
                    ></i>
                </div>
                <ReactCalendar
                    onChange={calendarHandleChange}
                    value={calendarValue}
                    className={showCalendar && calendarCheckValue? 'show' : ''}
                    onClickDay = {(e) => {setShowCalendar(prev => !prev)}}
                />

            </div>
        </div>
    );
}