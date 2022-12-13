import './css/ItemList.css';
import { Link } from 'react-router-dom';


function ItemList(props) {
    let user = '';
    if (props.owner != null) {
        user = props.owner.id;
    }

    return (
        <div className="container__items">
            <Link to={"/" + `item/${props.id}`}>
                <div className="wrapper__items">
                    <img src={"data:image/png;base64," + props.img[0].bytes} alt={props.image} className="img__items" />

                    <div className="items__text">
                        <div className='title__items'>{props.title}</div>
                        <div className='description__items'>{props.description}</div>
                    </div>
                    <div className="items__owner">
                        <div className='price__items'>{props.price}</div>
                        <div className='owner__items'>{props.owner?.username}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ItemList;