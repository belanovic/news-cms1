import react, { useState, useContext, useEffect } from 'react';
import { context } from './newsContext.js';
import { getAllArticles, getArticle } from './getArticles.js';
import Calendar from './Calendar.js';
import './style/category.css';

export default function Category() {

    const {category, setCategory } = useContext(context);


    const handleSelect = (e) => {
            const option = e.target.value;
            setCategory(option);
    }


    return (
        <div className="category">
            <div className="category-categories"> 
                {/* <label htmlFor="category-categories">Rubrike</label> */}
                <select id="category-categories" value={category} onChange={handleSelect}>
                    <option value="allArticles">Sve vesti</option>
                    <option value="politics">Politika</option>  
                    <option value="technology">Tehnologija</option>
                    <option value="business">Ekonomija</option>
                    <option value="entertainment">Magazin</option>
                    <option value="sports">Sport</option>    
                </select>
            </div>   
        </div>
    )
}