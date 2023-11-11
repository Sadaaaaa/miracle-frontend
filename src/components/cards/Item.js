import { useEffect, useState } from 'react';
import './css/Item.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../ui/Carousel';
import { Link } from 'react-router-dom';
import { API_URL } from '../../auth/api';

function Item() {
    const [item, setItem] = useState([]);
    const [pictures, setPictures] = useState([]);
    const params = useParams();
    const accessJwt = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get(API_URL + "/image/item/" + params.id, {
            headers: {
                Authorization: "Bearer " + accessJwt
            }
        })
            .then(response => {
                setPictures(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(API_URL + `/item/${params.id}`, {
            headers: {
                Authorization: "Bearer " + accessJwt
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

    console.log(item.owner);

    return (
        <div className="item-container">
            <div className="wrapper__item">
                <div className="item-image">
                    <Carousel>
                        {
                            pictures?.map(i => {
                                return <img key={i.id} src={"data:image/png;base64," + i.bytes} alt="placeholder" />
                            })
                        }
                    </Carousel>
                </div>

                <div className="wrapper__descr">
                    <div className="item-block">
                        <h1 className="item-title">
                            {item.title}
                        </h1>

                        <div className="item-block-item">
                            <div className="item-price">
                                Price: {item.price}
                            </div>

                            <div className="item-username">
                                Owner: 
                                <Link className="item-username-owner" to={`/user/${item.owner}`} >
                                    {item.owner?.username}, {item.owner?.email}
                                    </Link>
                            </div>
                        </div>

                        <div className="item-description">
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>

            </div>
        </div>
    );
}

export default Item;