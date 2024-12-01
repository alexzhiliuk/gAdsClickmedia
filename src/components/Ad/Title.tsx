import React, { ChangeEvent, useEffect, useState } from 'react';
import { ITitle, TitlePosition } from './Ad';


interface ITitleProps {
    groupIndex: number,
    adIndex: number,
    index: number,
    data: ITitle,
    onChangeCallback: (index: number, title: ITitle) => void,
    onRemove: (index: number) => void,
}


function Title({ groupIndex, adIndex, index, data, onChangeCallback, onRemove }: ITitleProps) {

    const [value, setValue] = useState<string>(data.title);
    const [position, setPosition] = useState<TitlePosition>(data.position);
    
    const maxLength: number = 30;

    useEffect(() => {
        let title: ITitle = {
            id: data.id,
            title: value,
            position: position
        }
        onChangeCallback(index - 1, title)
    }, [value, position])


    const removeHadnler = () => {
        onRemove(index - 1)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className="title">
            Заголовок {index}
            <div className="input-limit" style={{color: value.length >= maxLength ? "red": ""}}>{value.length}</div>
            <div className="title-positions">
                <label className={`title-position ${position === 0 ? 'active' : ''}`} >
                    -
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-title-postion-${index}`} value="0" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(0)}} checked />
                </label>
                <label  className={`title-position ${position === 1 ? 'active' : ''}`}>
                    1
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-title-postion-${index}`} value="1" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(1)}} />
                </label>
                <label  className={`title-position ${position === 2 ? 'active' : ''}`}>
                    2
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-title-postion-${index}`} value="2" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(2)}} />
                </label>
                <label  className={`title-position ${position === 3 ? 'active' : ''}`}>
                    3
                    <input type="checkbox" name={`group-${groupIndex}-ad-${adIndex}-title-postion-${index}`} value="3" onChange={(e: ChangeEvent<HTMLInputElement>) => {setPosition(3)}} />
                </label>
            </div>
            <input type="text" name={`group-${groupIndex}-ad-${adIndex}-title-${index}`} maxLength={maxLength} className="title-input" value={value} onChange={onChangeHandler} required={index > 3 ? false : true} />
            <button style={{display: index < 4 ? "none" : ""}} onClick={removeHadnler}>Удалить</button>
        </div>
    );
  }
  
export default Title;
  