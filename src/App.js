import React, { useState, useRef, useContext, useEffect } from 'react';
import Header from './Header';
import Homepage from './Homepage.js';
import AllArticles from './AllArticles.js';
import Article from './Article.js';
import Delete from './Delete.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { context } from './newsContext';
import Footer from './Footer'; 
import Form from './Form.js';
import Profile from './Profile';
import Visitor from './Visitor.js';
import Order from './Order.js';
import Settings from './Settings.js';
import SearchDate from './SearchDate';
import Proba from './Proba.js';
import Proba1 from './Proba1.js';

export default function App() {

    const { showCmsOverlay, setShowCmsOverlay, isNewArticle, showHeader, setShowChat
             } = useContext(context)

    return (<>
            <div 
                className="cms"
                onClick={() => setShowChat(false)}
            >
               {/*  <div class="background">
                    <div class="top-plane"></div>
                    <div class="bottom-plane"></div>
                </div> */}

                <div className="cmsOverlay" style={{ display: showCmsOverlay }}><div className="loader">
<div class="spinner"></div></div> </div>
                <Header showHomepageBtn={false} showFrontend={false} allArticlesBtn={false} newArticleBtn={false} />
                <Switch>
                    <Route exact path="/"> 
                        <Homepage /> 
                    </Route>
                    <Route path="/visitor"><Visitor /></Route> 
                    <Route path="/order"><Order /></Route>
                    <Route path="/settings"><Settings /></Route>
                    <Route path="/search-date"><SearchDate /></Route> 
                    <Route path='/allArticles'>  
                        <AllArticles />
                    </Route>

                    <Route path='/oneArticle/:id'>
                        <Article key = 'notNew' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/oneArticleNew/:id'>
                        <Article key = 'new' setShowCmsOverlay={setShowCmsOverlay} />
                    </Route>
                    <Route path='/delete/:id'>
                        <Delete /> 
                    </Route>
                </Switch>
                <Footer />
            </div>
    </>
    )
}