import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ItemList from "../components/ItemList";
import './css/ItemListPage.css'
import authHeader from "../auth/services/AuthHeader";
import api from "../auth/services/index";

function ItemListPage() {
    const input = useSelector(state => state.user.input);
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (input == 0) {
            api.get("/items/all?from=" + 0 + "&size=" + 10)
                .then(res => setItems(res.data.content));
        } else {
            api.get(`/items/search?text=${input}` + `&from=0` + "&size=" + 10)
                .then(res => {
                    setItems(res.data.content)
                });
        }
    }, [])

    if (items?.length < 1) {
        return(
            <div className="no_items">
                <p className="no_items_text">No items was founded. Please try again.</p> 
            </div>
        );
    }

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Items</h1>
            </div>
            <div className="wrapper__item-list">
                <div className='id__item-list'>ID</div>
                <div className='title__item-list'>TITLE</div>
                <div className='description__item-list'>DESCRIPTION</div>
                <div className='price__item-list'>PRICE</div>
                <div className='owner__item-list'>OWNER</div>
                <div className='posted__item-list'>POSTED</div>
            </div>

            {
                items?.map(item =>
                    <ItemList key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        owner={item.owner}
                        posted={item.posted}
                    />
                )
            }

        </div>
    );
}

export default ItemListPage;