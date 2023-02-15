import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../auth/api";
import axios from "axios";


function Confirm() {
    const param = useParams();
    let code = param.id;
    const navigate = useNavigate();
    const [state, setState] = useState([
        {
            confirming: true
        }
    ]);


    useEffect(() => {
        axios.get(API_URL + `/activate/${code}`)
            .then(res => {
                setState({ confirming: false })
                if (res.data !== null) {
                    navigate("/login");
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="">
            Token is accepted
        </div>
    );
}

export default Confirm;