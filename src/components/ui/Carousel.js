import React, { useState, useEffect } from 'react';
import './css/Carousel.css';

const Carousel = (props) => {
    const { children } = props

    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children?.length);

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children?.length);
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1);
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
        }
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <button onClick={prev} className="left-arrow">
                    &lt;
                </button>
                <div className="carousel-content-wrapper">
                    <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {children}
                    </div>
                </div>
                <button onClick={next} className="right-arrow">
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default Carousel;