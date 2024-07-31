import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import { context } from './newsContext.js';
/* import Chat from './Chat'; */
/* import Call from './Call'; */
import './style/homepage.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

/* HggTML: <div class="loader"></div> */

export default function Homepage() {

    const {setShowMenu, setNewArticleBtn, setShowFrontend, setShowCmsOverlay, setCategory, setPageNum,
        setSelectedDate, calendarHandleChange, calendarSetCheckValue, setTitle, setTag } = useContext(context);

    useEffect(() => {
        window.scrollTo(0, 0);
        setNewArticleBtn('none');
        setShowMenu('none');
        setShowFrontend('block'); 

        setTitle('');
        setTag('');
        setCategory('allArticles');
        setPageNum({number: 1, isLast: false});
        setSelectedDate(null);
        calendarHandleChange(null);
        calendarSetCheckValue(false);
    }, [])

    return (
        <div className="homepage">
           {/*  <Chat /> */}
            <div className="homepage-links black-ops-one-regular">
                <div className="homepage-newArticleBtn">
                    <Link to="/oneArticle/new">
                        <div
                            className="homepage-newArticleBtn-text"
                        ><i className="fas fa-feather-alt"></i>Nova vest</div>
                    </Link>
                </div>
                <div className="homepage-allArticlesBtn" onClick = {() => setShowCmsOverlay('flex')}>
                    <Link to={`/allArticles`}>
                        <div className="homepage-allArticlesBtn-text">
                            <i className="fas fa-list-ul"></i>  Pretraga
                        </div>
                    </Link>
                </div>
                <div className="homepage-frontpage-order">
                    <Link to="/order">
                        <div
                            className="homepage-frontpage-order-text"
                        ><i className="fas fa-stream"></i>Naslovna</div>
                    </Link>
                </div>
                <div className="homepage-frontpage-settings">
                    <Link to="/settings">
                        <div
                            className="homepage-frontpage-settings-text"
                        ><i className="fa-solid fa-sliders"></i>Podešavanja</div>
                        
                    </Link>
                </div>
            </div>
        </div>
    )
}