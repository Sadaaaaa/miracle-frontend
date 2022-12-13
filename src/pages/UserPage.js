import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import User from '../components/cards/User'
import authHeader from '../auth/services/AuthHeader';
import { API_URL } from '../auth/api';

export default function UserPage() {
    const selector = useSelector(state => state.user);
    const [appState, setAppState] = useState();


    // useEffect(() => {
    //     axios.get(API_URL + `/user/${selector.userId}`, {
    //         headers: authHeader()
    //     }).then((resp) => {
    //         const allPersons = resp.data;
    //         setAppState(allPersons);
    //     });
    // }, [setAppState]);

    // console.log(appState)

    return (
        <div>
            <User {...appState} />
        </div>
    );
}