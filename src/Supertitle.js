import React from 'react';

export default function Supertitle({ supertitle, setSupertitle }) {

    const handleChangeSupertitle = (e) => {
        const value = e.target.value;
        setSupertitle(value);
    }

    return (
        <div className="article-text-supertitle">
            <input
                type='text'
                name="supertitle"
                className="supertitle-input"
                value={supertitle}
                onChange={handleChangeSupertitle}
                placeholder={'Unesi nadnaslov'}
            >
            </input>
        </div>
    )
}