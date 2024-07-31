import React from 'react';

const Background = () => {
    const numLines = 50; // Reduce number of lines for a slower, more relaxed effect
    const lines = Array.from({ length: numLines }).map((_, i) => (
        <Line 
            key={i}
            top={Math.random() * 100}
            left={Math.random() * 100}
            duration={Math.random() * 30 + 20} // Increase duration for slower animation
            color={getRandomColor()}
        />
    ));
    return <div className="background">{lines}</div>;
};

const Line = ({ top, left, duration, color }) => (
    <div 
        className="line" 
        style={{ 
            top: `${top}vh`,
            left: `${left}vw`,
            animationDuration: `${duration}s`,
            background: color
        }} 
    />
);

const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#33FFF5', '#FF5733'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default Background;
