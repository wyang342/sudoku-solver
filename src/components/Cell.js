import React, { useEffect, useState } from "react";

const Cell = (props) => {
    const [initialVal, color, className] = [props.initialVal, props.bgColor, props.className];
    const [val, setVal] = useState(initialVal);

    useEffect(() => {
        setVal(initialVal);
    }, [initialVal]);

    // need onChange if you're setting a value attribute. otherwise u can't change the input field
    return <input style={{
        backgroundColor: color
    }} type="text" className={"cell " + className} maxLength="1" value={val} onChange={(evt) => setVal(evt.target.value)}></input >;
}

export default Cell;