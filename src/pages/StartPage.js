import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { addInput } from '../store/reducers/user.js';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import './css/StartPage.css';
import { Context } from "../index.js";
import ItemListPage from "./ItemListPage.js";

function StartPage() {
    const [input, setInput] = useState('');
    const { context } = useContext(Context);

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input != '') {
            navigate('/items');
            dispatch(addInput(input));
        } else {
            navigate('/items');
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    return (
        <div className="container">
            <div className="searchline">
                <div className="wrapper-item">
                    <input className="searchline_inp" onChange={handleInput} onKeyDown={(e) => handleKeyDown(e)} type="text" placeholder="Search ads" />

                </div>
                <button className="searchline_btn" hidden={input < 1} onClick={handleSubmit} type="submit">Search</button>
            </div>
        </div>

    );
}

export default StartPage;