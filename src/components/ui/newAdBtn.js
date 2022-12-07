import { Link } from "react-router-dom";
import './css/newAdBtn.css';

function NewAdBtn() {

    const handleClick = () => {

    }

    return (
        <Link to={"/item"}>
            <button className="new-ad" onClick={handleClick}>New ad</button>
        </Link>
    );

}

export default NewAdBtn;