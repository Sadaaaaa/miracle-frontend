import './css/ItemList.css';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import { useContext, useEffect, useState } from 'react';


function ItemList(props) {
    let user = '';
    if (props.owner != null) {
        user = props.owner.id;
    }

    return (
        <div className="container">
            <Link to={"/" + `item/${props.id}`}>
                <div className="wrapper__items">
                    <div className='id__items'>{props.id}</div>
                    <div className='title__items'>{props.title}</div>
                    <div className='description__items'>{props.description}</div>
                    <div className='price__items'>{props.price}</div>
                    <div className='owner__items'>{user}</div>
                    <div className='posted__items'>{props.posted}</div>
                </div>
            </Link>
        </div>
    );
}

export default ItemList;