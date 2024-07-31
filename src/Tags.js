import react, {useContext, useEffect, useState} from 'react';
import './style/tags.css';

export default function Tags({tagsArr, setTagsArr}) {
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }
    const handleClick = () => {
        if(!inputValue.trim()) return
        setTagsArr((prev) => {
            const arr = Array.from(prev);
            const newArrElem = inputValue;
            arr.push(newArrElem);
            setInputValue('');
            return arr
        });
    }
    const handleKeyDown = (e) => {
        if(!inputValue.trim()) return
        if(e.keyCode === 13) {
            setTagsArr((prev) => {
                const arr = Array.from(prev);
                const newArrElem = inputValue;
                arr.push(newArrElem);
                setInputValue('');
                return arr
            });
        }
    }

    const handleClose = (i) => {
        setTagsArr((prev) => {
            const arr = Array.from(prev);
            arr.splice(i, 1);
            return arr
        });
    }

    return (
        <div className = "tags">
            <label htmlFor = "tags-input">Unesi tag</label>
            <input 
                type = "text" 
                className = "tags-input"
                id = "tags-input" 
                onChange = {handleChange}
                onKeyDown = {handleKeyDown}
                value = {inputValue}
                autoComplete='on'
            ></input>
            <button 
                className = "tags-button"
                onClick = {() => handleClick()}
            >Sačuvaj tag
            </button>

            <div className = "tags-row">
                {tagsArr && tagsArr.map((prom, i) => {
                    if(i == 0) return;
                    return <div 
                                className = "tag" 
                                key = {i}
                            >
                                {prom}
                                <i className = "fas fa-times" onClick = {() => handleClose(i)}></i>
                            </div>
                    }
                )}
            </div>
        </div>
    )
}