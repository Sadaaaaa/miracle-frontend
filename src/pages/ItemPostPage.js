import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/api';
import './css/ItemPostPage.css';
import { useCookies } from 'react-cookie';

function ItemPostPage() {
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const [item, setItem] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        owner: cookies.user.id
    });

    let photos = [];

    const handleTitle = (e) => {
        setItem(prev => ({
            ...prev,
            title: e.target.value
        }));
    }

    const handlePrice = (e) => {
        setItem(prev => ({
            ...prev,
            price: e.target.value
        }));
    }

    const handleDescription = (e) => {
        setItem(prev => ({
            ...prev,
            description: e.target.value
        }));
    }

    const handleFiles = (e) => {
        e.preventDefault();
        let id = e.target.id;
        photos[id] = e.target.files[0];
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let token = localStorage.getItem("JWT");

    //     axios.post(API_URL + "/item/", {
    //         headers:
    //         {
    //             Authorization: "Bearer " + token,
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })

    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();

        for (let i = 0; i < photos.length; i++) {
            formData.append('files', photos[i])
        }
        formData.append('item', JSON.stringify(item));

        let token = localStorage.getItem("JWT");
        // console.log(token);

        axios.post(API_URL + "/item/", formData, {
            headers:
            {
                Authorization: "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data === true) {
                    window.location.href = API_URL + "/auth"
                }
                navigate("/item/" + res.data.id);
            })
            .catch(() => {
                alert("An error occurred on the server")
            })
    };


    return (
        <div className="container__post-item">
            <h1 className='title__item-page'>Post new ad</h1>

            <div className="item__block">
                <div className="title">
                    <label htmlFor="item__title" className='item__title-label'>Title</label>
                    <input className='item__title-input' type="text" name="" id="item__title" placeholder='Item title' onChange={handleTitle} />

                    <label htmlFor="item__price" className='item__price-label'>Price</label>
                    <input className='item__price-input' type="text" name="" id="item__price" placeholder='Price' onChange={handlePrice} />
                </div>

                <div className="description">
                    <label htmlFor="item__description" className='item__description-label'>Description</label>
                    <textarea className='item__description-input' id='item__description' placeholder='Item description' onChange={handleDescription}></textarea>

                    <div className='item_photos'>
                        <input type="file" name="." id="0" className='item__input-file' onChange={handleFiles} />
                        <input type="file" name="." id="1" className='item__input-file' onChange={handleFiles} />
                        <input type="file" name="." id="2" className='item__input-file' onChange={handleFiles} />
                    </div>
                </div>

                <div className="item__submit">
                    <button className="item__submit-button" onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>
    );

}

export default ItemPostPage;