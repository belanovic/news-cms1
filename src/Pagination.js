import React, { useContext, useEffect, useState } from 'react';
import PaginationButton from './Pagination-button';
import { context } from './newsContext';
import { lastPage } from './getArticles';
import './style/pagination.css';

export default function Pagination({ pageNum, setPageNum, pageArticles, tag, title, selectedDate }) {
    const { listAllArticles, category } = useContext(context);

    const increasePageNum = async () => {
        const retValue = await pageArticles(category, {number: pageNum.number + 1, isLast: false}, title, tag, selectedDate);
        if(retValue == null) return;
        setPageNum((prev) => {
            return {number: prev.number + 1, isLast: false}
        })
    }
    const decreasePageNum = async () => {
        const retValue = await pageArticles(category, {number: pageNum.number - 1, isLast: false}, title, tag, selectedDate);
        if(retValue == null) return;
        setPageNum((prev) => {
            if (prev.number == 1) return prev;
            return {number: prev.number - 1, isLast: false}
        })
    }

    const firstPageNum = async () => {
        const retValue = await pageArticles(category, {number:1, isLast: false}, title, tag, selectedDate);
        if(retValue == null) return;
        setPageNum({number: 1, isLast: false})
    }
    const lastPageNum = async () => {
        const numOfPages = await pageArticles(category, {number: pageNum.number, isLast: true}, title, tag, selectedDate);
        setPageNum({number: numOfPages, isLast: true});
    }

    return (
        <div className="pagination">
                {pageNum.number > 2?
                <PaginationButton 
                    sign= {<i className="fas fa-fast-backward"></i>}
                    clickHandler = {firstPageNum} 
                />
                :
                ''}
                
                {pageNum.number == 1?
                ''
                :
                <PaginationButton
                    sign= {<i className="fas fa-chevron-left"></i>}
                    pageNum={pageNum.number}
                    clickHandler={decreasePageNum}
                />}

                <PaginationButton sign = {pageNum.number} setPageNum={setPageNum}/>
         
                {listAllArticles.length < 10?
                ''
                :
                <PaginationButton
                sign= {<i className="fas fa-chevron-right"></i>}
                pageNum={pageNum.number}
                clickHandler={increasePageNum}
                />}

                {listAllArticles.length < 10?
                ''
                :
                <PaginationButton 
                    sign = {<i className="fas fa-fast-forward"></i>}
                    clickHandler = {lastPageNum}  
                />}
                
        </div>
    )
}