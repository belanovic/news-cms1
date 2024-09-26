import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import { getAllArticles } from './getArticles.js';
import Pagination from './Pagination.js';
import {DatePublished, DateCreated, DateUpdated} from './Time.js';
import Publish from './Publish.js';
import Search from './Search.js';
import './style/all-articles.css'; 
import './style/all-articles-item.css';
import {alphabet} from './cirilizatorDecirilizator.js';
import SearchLabel from './SearchLabel.js';

export default function AllArticles() {

    const { listAllArticles, setListAllArticles, setActiveLink, activeCriteria, setActiveCriteria,setNewArticleBtn, title, setTitle, tag, setTag,
        setShowFrontend, setShowMenu, setShowCmsOverlay, pageNum, setPageNum, category, selectedDate, setSelectedDate} = useContext(context);
    
    const [searchVisible, setSearchVisible] = useState(false);



    async function pageArticles(category, pageNum, title, tag, selectedDate) {
        setShowCmsOverlay('flex');
        let articlesMsg = await getAllArticles(category, pageNum, title, tag, selectedDate);
        setShowCmsOverlay('none');
        if(articlesMsg == null) {
            const promiseResolveA = await setListAllArticles([]);
            return null
        }
        const promiseResolveA = await setListAllArticles(articlesMsg.articles);
        sortArticles();
        
        if(pageNum.isLast == true) return articlesMsg.numOfPages
        return true
    }

    const sortArticles = () => {
        setListAllArticles((prev) => {

            if(activeCriteria[0] === 'title') {
                prev.sort((a, b) => {
                    return  activeCriteria[1] === 'down'? alphabet.indexOf(a.title.split('')[0].toLowerCase()) - alphabet.indexOf(b.title.split('')[0].toLowerCase()) :
                                                          alphabet.indexOf(b.title.split('')[0].toLowerCase()) - alphabet.indexOf(a.title.split('')[0].toLowerCase())
                })
                return [...prev]
            }
            prev.sort((a, b) => {
                return activeCriteria[1] === 'down'? new Date(b[activeCriteria[0]]).getTime() - new Date(a[activeCriteria[0]]).getTime() :
                                                     new Date(a[activeCriteria[0]]).getTime() - new Date(b[activeCriteria[0]]).getTime()
            })
            return [...prev]
        })
    }
    
    useEffect(() => sortArticles(), [activeCriteria])

  
    
    useEffect(() => {
        window.scrollTo(0, 0);
        pageArticles(category, pageNum, title, tag, selectedDate);

        setActiveLink('allArticles');

        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
    }, [])

     return (
        <>
                <div className="allArticles">
                    <SearchLabel setSearchVisible = {setSearchVisible} />
                    <Search 
                        searchVisible = {searchVisible}
                        pageNum = {pageNum}
                        setPageNum = {setPageNum} 
                        title = {title} tag = {tag} 
                        setTag = {setTag} setTitle = {setTitle} 
                        pageArticles = {pageArticles} 
                        sortArticles = {sortArticles}
                        selectedDate = {selectedDate}
                        setSelectedDate = {setSelectedDate}
                    />
                    <div className = "allArticles-columnNames">
                        <div 
                            className = "allArticles-columnNames-title allArticles-columnNames-text">
                                {/* <i className= {`fas fa-arrow-down ${activeCriteria[2] === 1? 'activeArrow' : ''}`} 
                                   onClick = {() => setActiveCriteria(['title', 'down', 1])}>
                                </i> */}
                                <span>Naslov</span>
                                {/* <i className= {`fas fa-arrow-up ${activeCriteria[2] === 2? 'activeArrow' : ''}`}
                                   onClick = {() => setActiveCriteria(['title', 'up', 2])}>
                                </i> */}
                        </div>
                        <div className = "allArticles-columnNames-info">
                            <div 
                                className = "allArticles-columnNames-note allArticles-columnNames-text">
                                    <span>Napomena</span>
                            </div>
                            <div 
                                className = "allArticles-columnNames-dateUpdated allArticles-columnNames-text" >
                                   {/*  <i className= {`fas fa-arrow-down ${activeCriteria[2] === 3? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateUpdated', 'down', 3])}></i> */}
                                    <span>Izmena</span>
                                    {/* <i className= {`fas fa-arrow-up ${activeCriteria[2] === 4? 'activeArrow' : ''}`} 
                                    onClick = {() => setActiveCriteria(['dateUpdated', 'up', 4])}></i> */}
                            </div>
                            <div 
                                className = "allArticles-columnNames-dateCreated allArticles-columnNames-text">
                                   {/*  <i className= {`fas fa-arrow-down ${activeCriteria[2] === 5? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateCreated', 'down', 5])}></i> */}
                                    <span>Kreirano</span>
                                    {/* <i className= {`fas fa-arrow-up ${activeCriteria[2] === 6? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['dateCreated', 'up', 6])}></i> */}
                            </div>
                            <div 
                                className = "allArticles-columnNames-datePublished allArticles-columnNames-text">
                                    {/* <i className= {`fas fa-arrow-down ${activeCriteria[2] === 7? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['datePublished', 'down', 7])}></i> */}
                                    <span>Objavljeno</span>
                                    {/* <i className= {`fas fa-arrow-up ${activeCriteria[2] === 8? 'activeArrow' : ''}`}
                                    onClick = {() => setActiveCriteria(['datePublished', 'up', 8])}></i> */}
                            </div>
                            <div 
                                className = "allArticles-columnNames-publish allArticles-columnNames-text">
                                    <span>Objavi</span>
                            </div>
                            <div 
                                className = "allArticles-columnNames-delete allArticles-columnNames-text">
                                    <span>Izbriši</span>
                            </div>
                        </div>
                    </div>
                    {listAllArticles.map((oneArticle, i) => {
                                return <div key={i} className={`allArticles-item`}>
                                    <div className="allArticles-item-title allArticles-item-part">
                                        <h2 
                                                className="allArticles-item-title-text"
                                            >
                                            <Link to={`/oneArticle/${oneArticle._id}`}>
                                            {oneArticle.title}
                                            </Link>
                                        </h2>
                                    </div>
                                    <div className = "allArticles-item-info">
                                        <div className = "allArticles-item-note allArticles-item-part">{oneArticle.note}</div>
                                        <DateUpdated timeUpdated = {oneArticle.dateUpdated}/>
                                        <DateCreated timeCreated = {oneArticle.dateCreated}/>
                                        <DatePublished 
                                            timePublished = {oneArticle.datePublished} 
                                            published = {oneArticle.published}
                                        />
                                        <Publish  
                                            id={oneArticle._id} 
                                            published = {oneArticle.published}
                                            position = {oneArticle.position}
                                            pageArticles = {pageArticles} 
                                            title = {title}
                                            tag = {tag}
                                            selectedDate = {selectedDate}
                                        />
                                        <div className="allArticles-item-delete allArticles-item-part"> 
                                        {!oneArticle.published && <Link to={`/delete/${oneArticle._id}`}>
                                            <button>Izbriši</button>
                                        </Link>}
                                        </div>
                                    </div> 
                                </div>
                     
                    })}
                </div>
            <Pagination
                pageNum={pageNum}
                setPageNum={setPageNum}
                pageArticles = {pageArticles}
                title = {title} 
                tag = {tag}
                selectedDate = {selectedDate}
            />
        </>
    )
}