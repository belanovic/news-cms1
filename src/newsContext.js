import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const context = React.createContext();


function Provider({children}) {

    const [listAllArticles, setListAllArticles] = useState([]);

    const [showCmsOverlay, setShowCmsOverlay] = useState('none');
 
    const [newArticleBtn, setNewArticleBtn] = useState('none');
    const [showMenu, setShowMenu] = useState('none');
    const [activeLink, setActiveLink] = useState('none');
    const [showFrontend, setShowFrontend] = useState('none');
    const [showLogin, setShowLogin] = useState('block');

    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [pageNum, setPageNum] = useState({number: 1, isLast: false, numOfPages: ''});
    const [category, setCategory] = useState('allArticles');
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarValue, calendarHandleChange] = useState(null);
    const [calendarCheckValue, calendarSetCheckValue] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [showChat, setShowChat] = useState(false);

    const [activeCriteria, setActiveCriteria] = useState(['dateUpdated', 'down', 3]);
    const [activeRoom, setActiveRoom] = useState('');
    const [roomsCall, setRoomsCall] = useState([]);


    const defaultFilter = [{
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        huRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0
    }]


    

    return (
        <context.Provider value={{
            listAllArticles,
            setListAllArticles,
            title, 
            setTitle,
            tag, 
            setTag,
            showCmsOverlay,
            setShowCmsOverlay,
            newArticleBtn,
            setNewArticleBtn,
            activeLink,
            setActiveLink,
            showFrontend,
            setShowFrontend,
            showLogin, 
            setShowLogin,
            selectedDate, 
            setSelectedDate,
            pageNum, 
            setPageNum,
            category,
            setCategory,
            activeCriteria,
            setActiveCriteria,
            showMenu,
            setShowMenu,
            calendarValue, 
            calendarHandleChange,
            calendarCheckValue, 
            calendarSetCheckValue,
            showCalendar,
            setShowCalendar,
            defaultFilter,
            showChat, 
            setShowChat,
            activeRoom,
            setActiveRoom,
            roomsCall,
            setRoomsCall
        }}>
            {children}
        </context.Provider>
    )
}




export { context, Provider };

