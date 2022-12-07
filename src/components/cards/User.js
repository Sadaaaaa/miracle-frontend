import { useEffect, useState } from 'react';
import './css/User.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function User(props) {
    const [user, setUser] = useState([]);

    // parsing URL to get path variable (user ID)
    const params = useParams();

    const SERVER_URL = "http://localhost:8090"
    const image =  SERVER_URL + "/image/" + params.id

    useEffect(() => {
            axios.get(SERVER_URL + `/user/${params.id}`)
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => console.log(error));
    }, [])

    console.log(user)

    return (
        <div className="card-container">
            <header>
                <img className="user-photo" src={image} alt={user.id} />
            </header>
            <div className="profile-header">
                <h1 className="user-name">
                    {user.username}
                </h1>

                <h2 className="user-email">
                    {user.email}
                </h2>
            </div>
        </div>
    );
}

export default User;