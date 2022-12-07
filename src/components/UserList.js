import './css/UserList.css';
import { Link } from 'react-router-dom';

function UserList({ id, username, email }) {
    return (
        <div className="container">
            <Link to={"/" + `user/${id}`}>
                <div className="wrapper">
                    <div className='id'>{id}</div>
                    <div className='username'>{username}</div>
                    <div className='email'>{email}</div>
                </div>
            </Link>
        </div>
    );
}

export default UserList;