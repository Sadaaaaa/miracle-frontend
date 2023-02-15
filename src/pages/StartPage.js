import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addItemSearch } from '../store/reducers/item';
import './css/StartPage.css';

function StartPage() {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input !== '') {
            dispatch(addItemSearch(input));
        } else {
            dispatch(addItemSearch(input));
        }
        navigate('/items');
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    const handleClear = (e) => {
        e.preventDefault();
        setInput('');
        inputRef.current.value = "";
    }

    return (
        <div className="container">
            <div className="searchline">
                <div className="wrapper-item">
                    <input className="searchline_inp" ref={inputRef} onChange={handleInput} onKeyDown={(e) => handleKeyDown(e)} type="text" placeholder="Search ads" />

                </div>
                <div className="clear_searchline_btn" hidden={input < 1} onClick={handleClear} type="submit"></div>
                <button className="searchline_btn" hidden={input < 1} onClick={handleSubmit} type="submit">Search</button>
            </div>
        </div>

    );
}

export default StartPage;