import React from 'react';
import dateFormat from './dateFormat.js';

export function DateCreated({ timeCreated}) {
    return (
        <div className="allArticles-item-dateCreated allArticles-item-part">
                <div className="date">{dateFormat(timeCreated, 'month', 'dayMonth', 'year', 'comma')}</div>
                <div className="time">{dateFormat(timeCreated, 'clock')}</div>
        </div>
    )
}
export function DateUpdated({  timeUpdated }) {
    return (
        <div className="allArticles-item-dateUpdated allArticles-item-part">
                <div className="date">{dateFormat(timeUpdated, 'month', 'dayMonth', 'year', 'comma')}</div>
                <div className="time">{dateFormat(timeUpdated, 'clock')}</div>
        </div>
    )
}
export function DatePublished({ timePublished, published }) {
    return (
        <div className="allArticles-item-datePublished allArticles-item-part">
                {published? 
                <>
                <div className="date">{dateFormat(timePublished, 'month', 'dayMonth', 'year', 'comma')}</div>
                <div className="time">{dateFormat(timePublished, 'clock')}</div>
                </>
                :
                'Not published'
                }
        </div>
    )
}