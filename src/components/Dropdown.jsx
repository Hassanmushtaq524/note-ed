import React, { useState } from 'react';
import downArrow from "../assets/images/down-arrow.svg";



/**
 * @returns Dropdown component
 */
function Dropdown(props) {
    const { name , options, value, setValue } = props;
    const [isOpen, setIsOpen] = useState(false);

    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    

    const handleOnClick = (item) => { 
        setValue(item)
        toggleDropdown()
    }


    return (
        <>
        <div className="bg-light-gray p-2 rounded-xl text-white">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
                {value ? value : name}           
                <img src={downArrow} className="w-4"/>
            </button>
            {isOpen && (
                <ul className="absolute bg-white border-[1px] text-dark-gray p-2 rounded-xl h-fit max-h-[100px] overflow-scroll">
                    {options.length ? 
                        options.map((item) => {
                            return <li className="cursor-pointer" onClick={() => handleOnClick(item)}>{item}</li>
                        }) :
                        <p>No items</p>
                    }
                </ul>
            )}

        </div>
        </>
    );
}

export default Dropdown;