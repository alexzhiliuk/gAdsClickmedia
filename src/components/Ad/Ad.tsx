import React, { ChangeEvent, useEffect, useState } from 'react';

import Input from '../Inputs/Input';
import { IAd } from '../Group/Group';
import Title from './Title';
import Descrition from './Description';


interface IAdProps {
    groupIndex: number,
    index: number,
    data: IAd,
    onChangeCallback: (index: number, ad: IAd) => void,
    onDuplicateCallback: (index: number) => void,
    onResetCallback: (index: number) => void,
}

export type TitlePosition = 0 | 1 | 2 | 3

export interface ITitle {
    id?: number,
    title: string,
    position: TitlePosition
}

export type DescriptionPosition = 0 | 1 | 2

export interface IDescription {
    id?: number,
    description: string,
    position: DescriptionPosition
}

const initialTitles: ITitle[] = [
    {
        id: 1,
        title: "",
        position: 0,
    },
    {
        id: 2,
        title: "",
        position: 0,
    },
    {
        id: 3,
        title: "",
        position: 0,
    }
]
let nextTitleId = 4

const initialDescriptions: IDescription[] = [
    {
        id: 1,
        description: "",
        position: 0,
    },
    {
        id: 2,
        description: "",
        position: 0,
    }
]
let nextDescriptionId = 3

function Ad({ groupIndex, index, data, onChangeCallback, onDuplicateCallback, onResetCallback }: IAdProps) {

    const [titles, setTitles] = useState<Array<ITitle>>(initialTitles)
    const [descriptions, setDescriptions] = useState<Array<IDescription>>(initialDescriptions)

    

    const [endUrl, setEndUrl] = useState<string>(data.endUrl);
    const [path1, setPath1] = useState<string>(data.path1);
    const [path2, setPath2] = useState<string>(data.path2);
    const [trackingTemplate, setTrackingTemplate] = useState<string>(data.trackingTemplate);

    const maxPathLength: number = 15;

    useEffect(() => {
        let ad: IAd = {
            id: data.id,
            endUrl: endUrl,
            path1: path1,
            path2: path2,
            trackingTemplate: trackingTemplate,
            titles: titles,
            descriptions: descriptions
        }
        onChangeCallback(index-1, ad)
    }, [endUrl, path1, path2, trackingTemplate, titles, descriptions])

    const updateTitle = (index: number, title: ITitle) => {
        titles[index] = title
        setTitles([...titles])
    }

    const addTitle = () => {
        const title: ITitle = { id: nextTitleId++, title: "", position: 0 }
        setTitles([...titles, title])
    }

    const removeTitle = (index: number) => {
        titles.splice(index, 1)
        setTitles([...titles])
    }

    const updateDescription = (index: number, description: IDescription) => {
        descriptions[index] = description
        setDescriptions([...descriptions])
    }

    const addDescription = () => {
        const description: IDescription = { id: nextDescriptionId++, description: "", position: 0 }
        descriptions.push(description)
        setDescriptions([...descriptions])
    }

    const removeDescription = (index: number) => {
        descriptions.splice(index, 1)
        setDescriptions([...descriptions])
    }

    const onDuplicate = () => {
        onDuplicateCallback(index - 1)
    }
    const onReset = () => {
        onResetCallback(index - 1)
    }

    // console.log(titles, data.titles)

    return (
        <fieldset name={`group-${groupIndex}-ad-${index}`} className="group">
            <legend className="ad-title">Объявление {index}</legend>

            <div className="titles">
                
                {titles.map((title, i) => (<Title groupIndex={groupIndex} adIndex={index} index={i + 1} key={title.id} data={title} onChangeCallback={updateTitle} onRemove={removeTitle} />))}
            </div>
            <button type="button" className="add-title" onClick={addTitle} style={{display: titles.length > 14 ? "none": ""}}>+ Заголовок</button>

            <div className="descs">
                {descriptions.map((description, i) => (<Descrition groupIndex={groupIndex} adIndex={index} index={i + 1} key={description.id} data={description} onChangeCallback={updateDescription} onRemove={removeDescription} />))}
            </div>
            <button type="button" className="add-desc" onClick={addDescription} style={{display: descriptions.length > 3 ? "none": ""}}>+ Описание</button>

            <div className="url-params">
                <Input label='Конечный URL' labelStyles={{flexGrow: "1"}} inputName={`group-${groupIndex}-ad-${index}-end-url`} inputClass='end-url' required={true} value={data.endUrl} onChangeCallback={setEndUrl} />
                <label>
                    Путь
                    <div className="url-params__row">
                        <input type="text" name={`group-${groupIndex}-ad-${index}-path-1`} maxLength={maxPathLength} className="path-1" required value={data.path1} onChange={(e: ChangeEvent<HTMLInputElement>) => {setPath1(e.target.value)}} />
                        <div className="input-limit" style={{color: data.path1.length >= maxPathLength ? "red": ""}}>{data.path1.length}</div>
                        /
                        <input type="text" name={`group-${groupIndex}-ad-${index}-path-2`} maxLength={maxPathLength} className="path-2" required value={data.path2} onChange={(e: ChangeEvent<HTMLInputElement>) => {setPath2(e.target.value)}} />
                        <div className="input-limit" style={{color: data.path2.length >= maxPathLength ? "red": ""}}>{data.path2.length}</div>
                    </div>
                </label>
            </div>
            <Input label='Шаблон отслеживания' inputName={`group-${groupIndex}-ad-${index}-tracking`} inputClass='tracking' required={false} value={trackingTemplate} onChangeCallback={setTrackingTemplate} />
            
            <div className="ad-btns">
                <button type="button" className="duplicate-ad" onClick={onDuplicate}>Дублировать</button>
                <button type="button" className="clear-ad" onClick={onReset}>Очистить</button>
            </div>
            
        </fieldset>
    );
  }
  
export default Ad;
  