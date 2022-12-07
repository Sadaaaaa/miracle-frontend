import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import UserList from "../components/UserList.js";
import authHeader from "../auth/services/AuthHeader.js";

function ListOfUsers() {
    const SERVER_URL = "http://localhost:8090"
    const input = useSelector(state => state.user.input);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {

        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }

    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }

    }

    useEffect(() => {
        axios.get('http://localhost:8090/admin/users', {
            headers: authHeader()
        })
            .then(response => {
                console.log(response.data.content)
                setItems([...items, ...response.data.content])
                setCurrentPage(prevState => prevState + 1)
            })
            .finally(() => setFetching(false));
    }, [])

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Users</h1>
            </div>
            <div className="wrapper">
                <div className='id'>ID</div>
                <div className='username'>USERNAME</div>
                <div className='email'>EMAIL</div>
            </div>

            {
                items.map(item =>

                    <UserList key={item.id}
                        id={item.id}
                        username={item.username}
                        email={item.email}
                    />

                )

            }
        </div>
    );
}

export default ListOfUsers;