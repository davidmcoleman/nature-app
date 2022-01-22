import React from "react";

function Button(props) {
    return <button onClick={props.handleClick}>{props.type}</button>
}

export default Button