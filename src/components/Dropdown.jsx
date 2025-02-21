import React, { useState } from 'react';
import downArrow from "../assets/images/down-arrow.svg";



/**
 * @returns Dropdown component
 */
function Dropdown({ name , options, value, setValue, ...rest }) {
    return (
        <select onChange={(e) => setValue(e.target.value)} className="border-[0.5px] border-primary rounded-xl p-4">
            <option>{name}</option>
            {options.map((opt, i) => (
                <option key={i}>{opt}</option>
            ))}
        </select>
    );
}

export default Dropdown;