import React from "react";

const Alart = (props) => {
    console.log(props.className)
    return (
        <div className={"alert " + props.className} role="alert">{props.message}</div>
    )
}

export default Alart;