import React, { useState, useEffect } from 'react';
import User from '../components/cards/User';
import { API_URL } from '../auth/api';
import authHeader from '../auth/services/AuthHeader';
import axios from 'axios';

export default function UserPage() {
    const [appState, setAppState] = useState();


    useEffect(() => {
        axios.get(API_URL + `/user/${2}`, {
            headers: authHeader()
        }).then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });
    }, [setAppState]);

    console.log(appState)

    return (
        <div>
            <User {...appState} />
        </div>
    );
}