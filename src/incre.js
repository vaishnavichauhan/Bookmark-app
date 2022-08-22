import React, { useState } from "react";


const Incre = () => {

    const [count,setCount] = useState(0);

    const press = () => {
        setCount(count+1);
    }
    return (
        <div>
            <h1 className="bg-info"> {count} </h1>
            <i class="fa-solid fa-play"></i>
            <button onClick={press}> click me </button>
        </div>
    )
}

export default Incre;