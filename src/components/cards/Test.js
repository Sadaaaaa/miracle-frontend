import { useEffect } from "react";

function Test() {
    useEffect(() => {
        fetch("http://localhost:8090/test",

            {
                mode: 'no-cors',
                headers: {"Access-Control-Allow-Origin": "*"}
            }
        )
            .then(res => res.text())
            .then(res => {
                console.log("Text from API" + res)
            });
    }, []);
    return (
        <div>

        </div>
    );
}

export default Test;