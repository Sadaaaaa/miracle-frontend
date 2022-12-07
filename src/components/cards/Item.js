import { useContext, useEffect, useState } from 'react';
import './css/Item.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../auth/services/AuthHeader';
import api from '../../auth/services';
import { Context } from '../../index';

function Item() {
    const [item, setItem] = useState([]);
    const [pictures, setPictures] = useState([]);
    const params = useParams();
    const images = "/image/item/" + params.id;
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(images, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setPictures(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        api.get(`/item/${params.id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setItem(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    if (pictures.length === 0) {
        return null;
    }

    return (
        <div className="item-container">
            <div className="wrapper__item">
                <div className="item-image">
                    <img className="user-photo" src={"data:image/png;base64," + pictures[0].bytes} alt={item.id} />
                </div>

                <div className="item-block">
                    <h1 className="item-title">
                        {item.title}
                    </h1>

                    <h2 className="item-description">
                        {item.description}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Item;