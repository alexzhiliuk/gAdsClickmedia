import React, { ChangeEvent, useEffect, useState } from 'react';
import { DescriptionPosition, IDescription } from './Ad';


interface IDescriptionProps {
    groupIndex: number,
    adIndex: number,
    index: number,
    data: IDescription,
    onChangeCallback: (index: number, description: IDescription) => void,
    onRemove: (index: number) => void,
}


function Descrition({ groupIndex, adIndex, index, data, onChangeCallback, onRemove }: IDescriptionProps) {

    const [value, setValue] = useState<string>(data.description);
    const [position, setPosition] = useState<DescriptionPosition>(data.position);

    const maxLength: number = 90;

    useEffect(() => {
        let description: IDescription = {
            id: data.id,
            description: value,
            position: position
        }
        onChangeCallback(index - 1, description)
    }, [value, position])

    const removeHandler = () => {
        onRemove(index - 1)
    }

    return (
        <div className="desc">
            Описание {index}
            <div className="input-limit" style={{color: value.length >= maxLength ? "red": ""}}>{value.length}</div>
            <div className="desc-positions">
                <label className={`title-position ${position === 0 ? 'active' : ''}`} >
                    -
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-desc-postion-${index}`} value="0" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(0)}} checked />
                </label>
                <label  className={`title-position ${position === 1 ? 'active' : ''}`}>
                    1
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-desc-postion-${index}`} value="1" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(1)}} />
                </label>
                <label  className={`title-position ${position === 2 ? 'active' : ''}`}>
                    2
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-desc-postion-${index}`} value="2" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(2)}} />
                </label>
            </div>
            <input type="text" name={`group-${groupIndex}-ad-${adIndex}-desc-${index}`} maxLength={maxLength}  className="title-input" value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => {setValue(e.target.value)}} required={index > 2 ? false : true} />
            <button style={{display: index < 3 ? "none" : ""}} onClick={removeHandler}>Удалить</button>
        </div>
    );
  }
  
export default Descrition;
  