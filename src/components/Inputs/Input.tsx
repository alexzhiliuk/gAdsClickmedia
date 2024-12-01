import React, { ChangeEvent } from 'react';


interface IInputProps {
    label: string,
    labelStyles?: object,
    labelClass?: string,
    inputName: string,
    inputStyles?: object,
    inputClass?: string,
    required: boolean,
    value?: string,
    onChangeCallback: (value: string) => void
}


function Input({ label, labelStyles={}, labelClass="", inputName, inputStyles={}, inputClass="", required, value="", onChangeCallback }: IInputProps) {

    return (
        <label style={labelStyles} className={labelClass}>
            {label}
            <input 
                type="text" 
                value={value}
                name={inputName} 
                required={required} 
                style={inputStyles} 
                className={inputClass} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => {onChangeCallback(e.target.value)}}
            />
        </label>
    );
  }
  
export default Input;
  