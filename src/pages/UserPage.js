import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import User from '../components/cards/User'
import authHeader from '../auth/services/AuthHeader';

export default function UserPage(props) {
    const SERVER_URL = "http://localhost:8090"
    const selector = useSelector(state => state.user);

    const [appState, setAppState] = useState();


    useEffect(() => {
        const apiUrl = SERVER_URL + "/user/" + selector.userId;
        axios.get(apiUrl, {
            headers: authHeader()
        }).then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });
    }, [setAppState]);

    return (
        <div>
            <User {...appState} />
        </div>
    );
}