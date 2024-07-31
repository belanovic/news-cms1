import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getArticle } from './getArticles.js';
import Query from './Query.js';
import Category from './Category.js';
import Calendar from './Calendar.js';
import './style/search.css';

export default function Search({pageArticles, pageNum, setPageNum, 
    sortArticles, title, tag, setTitle, 
    setTag, searchVisible, selectedDate, setSelectedDate }) {

    const {category} = useContext(context);
    
    const search = async (e) => {
            e.preventDefault();
            const done = await pageArticles(category, 1, title, tag, selectedDate );
            if(done == null) return;
            setPageNum({number: 1, isLast: false});
    }

    return (
        
            <div className = {`search ${searchVisible && 'show'}`}>
                <Query option = "title" setTag = {setTag} setTitle = {setTitle}  title  = {title}  tag  = {tag} search = {search}/>
                <Query option = "tag" tag = {tag} setTag = {setTag} setTitle = {setTitle} search = {search} />
                <Category />
                <Calendar setSelectedDate = {setSelectedDate} />
                <div 
                    className="search-button"
                >
                    <button
                        className="search-button btn"
                        onClick={(e) => {
                            search(e);
                        }}
                    >Prikaži
                    </button>
                    <i 
                        className="fas fa-search"
                        onClick={(e) => {
                            search(e);
                        }}
                    ></i>
                </div>
            </div>

    )
}