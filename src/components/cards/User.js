import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../ui/ItemCard';
import './css/User.css';
import { API_URL } from '../../auth/api';

function User() {
    const [user, setUser] = useState([]);
    const [image, setImage] = useState("");
    const [items, setItems] = useState([]);
    const params = useParams();

    const token = localStorage.getItem('JWT');

    console.log(params.id)

    useEffect(() => {
        const imagesPath = `/image/user/${params.id}`
        axios.get(API_URL + imagesPath, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                // setImage(response.data);
                console.log(response.data);
                if (image === "") {
                    setImage("http://178.20.41.50/images/defaultuser.jpeg");
                } else {
                    return setImage("data:image/png;base64," + response.data.bytes);
                }
            })
            .catch(error => console.log(error));

            
    }, [])

    useEffect(() => {
        axios.get(API_URL + `/user/${params.id}`, {
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
        axios.get(API_URL + `/items/user/${userId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setItems(response.data.content);
            })
            .catch(error => console.log(error));
    }, [])

    const updateData = (id) => {
        setItems(items.filter(i => i.id === id));
    }



    console.log(image);

    return (
        <div className="wrapper-user">
            <div className="user-container">
                <header>
                    <img className="user-photo" src={image} alt={user.id} />
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