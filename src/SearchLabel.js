import react, { useState } from 'react';
import './style/search-label.css';

export default function SearchLabel({ setSearchVisible }) {

    const [activeArrow, setActiveArrow] = useState(false);

    const handleClick = () => {
        setActiveArrow(prev => !prev)
        setSearchVisible(prev => !prev)
    }

    return (
        <div className="search-label" onClick={() => handleClick()}>
            {/* <div className="find-label-fake">iiiii</div> */}
            <i
                className={`search-label fas fa-chevron-down ${activeArrow && 'up'}`}>
            </i>
            <div className="search-label-text">Pretraga</div>
            <div>
                <i
                    className={`search-label fas fa-chevron-down ${activeArrow && 'up'}`}>
                </i>
            </div>
        </div>
    )
}