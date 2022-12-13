import { useEffect, useState } from 'react';
import './css/User.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../auth/api';
import api from '../../auth/api';
import ItemCard from '../ui/ItemCard';

function User() {
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);
    const [items, setItems] = useState([]);
    const params = useParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const imagesPath = `/image/user/${params.id}`
        api.get(API_URL + imagesPath, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setImage(response.data);
            })
            .catch(error => console.log(error));
    }, [user])

    useEffect(() => {
        api.get(API_URL + `/user/${params.id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        const userId = params.id;
        api.get(API_URL + `/items/user/${userId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setItems(response.data.content);
            })
            .catch(error => console.log(error));
    }, [items])

    const updateData = (id) => {
        setItems(items.filter(i => i.id === id));
    }

    return (
        <div className="wrapper-user">
            <div className="user-container">
                <header>
                    <img className="user-photo" src={"data:image/png;base64," + image.bytes} alt={user.id} />
                </header>
                <div className="profile-header">
                    <h1 className="user-name">
                        {user.username}
                    </h1>

                    <h2 className="user-email">
                        Email: {user.email}
                    </h2>
                </div>
            </div>

            <div className="item-card__user">
                <h1 className='item-card__user-title'>Your ads:</h1>
                {
                    items.map(i =>
                        <ItemCard key={i.id}
                            id={i.id}
                            image={i.imageItems}
                            title={i.title}
                            description={i.description}
                            price={i.price}
                            updateData={updateData}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default User;