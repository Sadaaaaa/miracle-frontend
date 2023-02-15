import './css/ItemCard.css';
import { API_URL } from '../../auth/api';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemCard = (props) => {
    console.log(props.id)
    const { id, image, title, description, price, updateData } = props
    const token = localStorage.getItem('token');

    const handleDelete = (id) => {
        updateData(id);
        deleteItemFromDB();
    }

    const deleteItemFromDB = () => {
        axios.delete(API_URL + `/item/` + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .catch(err => console.log(err));
    }

    return (
        <div className="item-card">
            <Link className='item-card__link' to={`/item/${id}`}>
                <img className="item-card__image" src={"data:image/png;base64," + image[0]?.bytes} alt={id} />
                <div className='item-card-text'>
                    <div className="item-card__title">{title}</div>
                    <div className="item-card__description">{description}</div>
                </div>
                <div className="item-card__price">{price}</div>
            </Link>
            <button className="item-card__delete" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ItemCard;