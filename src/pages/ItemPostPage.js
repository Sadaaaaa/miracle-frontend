import './css/ItemPostPage.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import authHeader from '../auth/services/AuthHeader';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/api';

function ItemPostPage() {
    const navigate = useNavigate();
    const [pictures, setPictures] = useState([]);
    const { context } = useContext(Context);
    const [item, setItem] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        owner: context.userDto.id,
        posted: null
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


        // setPictures([...pictures, file]);

        // fileReader.onload = () => {
        //     // setPictures([...pictures, { fileId: id, uploadedFile: fileReader.result }]);
        //     setPictures([...pictures, fileReader.result]);
        //     console.log(pictures)
        // };

        // fileReader.readAsDataURL(file);


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();

        // console.log(photos);

        for (let i = 0; i < photos.length; i++) {
            formData.append('files', photos[i])
        }
        formData.append('item', JSON.stringify(item));

        // console.log(formData.getAll('files'));

        let jwtHeader = authHeader().Authorization;

        axios({
            method: "POST",
            url: API_URL + "/item/",
            data: formData,
            headers:
            {
                'Content-Type': 'multipart/form-data',
                Authorization: jwtHeader
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
            <h1 className='title__item-page'>Add new ad</h1>

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