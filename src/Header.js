import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Chat from './Chat';
import { context } from './newsContext.js';
import './style/header.css';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let link;
if(process.env.REACT_APP_COPY == '0') link = `https://vestisajt.netlify.app/`;
if(process.env.REACT_APP_COPY != '0') link = `https://vesti${process.env.REACT_APP_COPY}.netlify.app/`;

export default function Header() {
       const [showLinks, setShowLinks] = useState(false);
       const {newArticleBtn, showFrontend, activeLink,showMenu, setShowCalendar, showLogin} = useContext(context);
 

    return (
        <header className="header" onClick = {() => setShowCalendar(false)}>
            <div className="header-links">
                <div className="header-links-frontend" style = {{display: showFrontend}}>
                    <a href = {`${link}`} target = "_blanc">
                        <div className="header-links-frontend-title">
                            <i className="fab fa-react"></i>
                            <span>www.vesti.com</span>
                        </div>
                    </a> 
                </div>
                <div 
                    className = "header-links-navigation"
                    style = {{display: showMenu}}
                >
                    <i  className= {showLinks === true? "fas fa-times" : "fas fa-bars"}
                        onClick = {() => {setShowLinks(prev => !prev)}}
                        
                    ></i> 
                    <div 
                        className = {`header-links-navigation-buttons ${showLinks? 'visible' : 'hidden'}`}
                    >
                        <div
                            className="header-homepageBtn"
                            onClick = {() => setShowLinks(false)}
                        >
                            <Link to="/">
                                <div
                                    className="header-homepageBtn-text"
                                ><i className="fas fa-home"></i><span>Početna</span></div>
                            </Link>
                        </div>
        
                        <div
                            className={`header-allArticlesBtn ${activeLink === 'allArticles' && 'activeLink'}`}
                            onClick = {() => setShowLinks(false)}
                        >
                            <Link to={`/allArticles`}>
                                <div
                                    className="header-allArticlesBtn-text"
                                ><i className="fas fa-list-ul"></i><span>Pretraga</span></div>
                            </Link>
                        </div>
                        <div
                            className={`header-orderBtn ${activeLink === 'order' && 'activeLink'}`}
                            onClick = {() => setShowLinks(false)}
                        >
                            <Link to={`/order`}>
                                <div
                                    className="header-orderBtn-text"
                                ><i className="fas fa-stream"></i><span>Naslovna</span></div>
                            </Link>
                        </div>
                        <div
                            className={`header-settingsBtn ${activeLink === 'settings' && 'activeLink'}`}
                            onClick = {() => setShowLinks(false)}
                        >
                            <Link to={`/settings`}>
                                <div
                                    className="header-settingsBtn-text"
                                ><i className="fa-solid fa-sliders"></i><span>Podešavanja</span></div>
                            </Link>
                        </div>
                        <div
                            className={`header-newArticleBtn ${activeLink === 'article' && 'activeLink'}`}
                            style={{ display: newArticleBtn }}
                            onClick = {() => setShowLinks(false)}
                        >
                            <Link to="/oneArticleNew/new">
                                <div
                                    className="header-newArticleBtn-text"
                                ><i className="fas fa-feather-alt"></i><span>Nova</span></div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="header-title">
                <Link to = '/'>
                    {/* <div
                        className="header-title-text black-ops-one-regular"
                    >CMS</div> */}
                    <img src='https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Fcms.png?alt=media&token=12bb3d88-b42a-4074-a4a2-553b96e3239b'></img>
                </Link>
             
            </div>
            {localStorage.getItem('token')?
            <>         
            <Chat />
            </>
            :
            <div className='chat-placeholder'></div>
            }
            <div className = "right-box">
                {localStorage.getItem('token')?
                <div className="login">
                    <Link to = "/visitor">
                        <i 
                            className="fas fa-user-edit" 
                        >
                         </i>
                    </Link>
                    <div className = "login-info">
                        <div className = "login-info-title">User logged in:</div>
                        <div className = "login-info-username">{localStorage.getItem('token')? jwtDecode(localStorage.getItem('token')).username : 'guest'}</div>
                    </div>

                </div>
                :
                <div className="guest" style = {{display: showLogin}}>
                    <Link to = "/visitor">
                        Prijavi se
                    </Link>
                </div>}
            </div>

        </header>
    )
}