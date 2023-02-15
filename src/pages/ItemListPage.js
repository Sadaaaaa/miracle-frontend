import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { API_URL } from "../auth/api";
import ItemList from "../components/ItemList";
import './css/ItemListPage.css';

function ItemListPage() {
    const search = useSelector(state => state.item.input);
    const [items, setItems] = useState([]);

    const JWT = localStorage.getItem("token");


    useEffect(() => {
        if (search === 0) {
            axios.get(API_URL + "/items/all?from=" + 0 + "&size=" + 10, 
)
                .then(res => {
                    setItems(res.data.content)
                });
                
        } else {
            axios.get(API_URL + `/items/search?text=${search}&from=` + 0 + "&size=" + 10)
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
                        images={item.itemImage}
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