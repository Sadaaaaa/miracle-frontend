import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ItemList from "../components/ItemList";
import './css/ItemListPage.css'
import api from "../auth/api/index";
import { API_URL } from "../auth/api/index";

function ItemListPage() {
    const search = useSelector(state => state.item.input);
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (search === 0) {
            api.get(API_URL + "/items/all?from=" + 0 + "&size=" + 10)
                .then(res => setItems(res.data.content));
        } else {
            api.get(`/items/search?text=${search}&from=` + 0 + "&size=" + 10)
                .then(res => {
                    setItems(res.data.content);
                });
        }
    }, [])

    if (items?.length < 1) {
        return (
            <div className="no_items">
                <p className="no_items_text">No items was founded. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="container_items-list">
            <div className="header_items">
                <h1 className="title_items">{items?.length} records found</h1>
            </div>

            {
                items?.map(item =>
                    <ItemList key={item.id}
                        id={item.id}
                        img={item.imageItems}
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