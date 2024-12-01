import React, { ChangeEvent, useEffect, useState } from 'react';

import Input from '../Inputs/Input';
import Ad, { IDescription, ITitle } from '../Ad/Ad';
import { IGroup } from '../Campaign/Campaign';


interface IGroupProps {
    index: number,
    data: IGroup,
    onChangeCallback: (index: number, group: IGroup) => void
}

export interface IAd {
    id?: number,
    endUrl: string,
    path1: string,
    path2: string,
    trackingTemplate: string,
    titles: ITitle[]
    descriptions: IDescription[]
}

const initialAds: IAd[] = [
    {
        id: 1,
        endUrl: "",
        path1: "",
        path2: "",
        trackingTemplate: "",
        titles: [],
        descriptions: []
    }
]
let nextId = 2;


function Group({ index, data, onChangeCallback }: IGroupProps) {

    const [ads, setAds] = useState<IAd[]>(initialAds);
    const [title, setTitle] = useState<string>(data.title);
    const [keywords, setKeywords] = useState<string>(data.keywords);

    useEffect(() => {
        console.log(ads)
        let group: IGroup = {
            id: data.id,
            title: title,
            keywords: keywords,
            ads: ads
        }
        console.log("update", group)
        onChangeCallback(index-1, group)
    }, [title, keywords, ads])

    const updateAd = (index: number, ad: IAd) => {
        ads[index] = ad
        setAds([...ads])
    }

    const duplicateAd = (index: number) => {
        const newAd: IAd = {
            id: nextId++,
            endUrl: ads[index].endUrl,
            path1: ads[index].path1,
            path2: ads[index].path2,
            trackingTemplate: ads[index].trackingTemplate,
            titles: ads[index].titles.map((title, i) => ( {id: title.id, title: title.title, position: title.position} )),
            descriptions: ads[index].descriptions.map((description, i) => ( {id: description.id, description: description.description, position: description.position} ))
        };
        console.log(ads[index].titles, newAd.titles)
        setAds([...ads, newAd]);
        console.log([...ads, newAd])
    }

    const resetAd = (index: number) => {
        ads[index].endUrl = ""
        ads[index].path1 = ""
        ads[index].path2 = ""
        ads[index].trackingTemplate = ""
        ads[index].titles.forEach((title: ITitle) => { 
            title.title = ""
            title.position = 0
        })
        ads[index].descriptions.forEach((description: IDescription) => { 
            description.description = ""
            description.position = 0
        })
        setAds([...ads])
    }

    return (
        <fieldset name={`group-${index}`} className="group">
            <Input label='Название группы' labelClass='group-name' inputName={`group-${index}-name`} required={true} value={title} onChangeCallback={setTitle} />
            
            <label className="group-keywords">
                <span style={{display: "inline-block", marginBottom: ".5em", fontWeight: "500"}}>Список ключевых слов*</span>
                Оформление соответствий:
                широкое соответствие - без оборачивания в спецсимволы
                "фразовое соответствие" - ключевое слово обернуто в двойные ковычки
                [точное соответствие] - ключевое слово обернуто в квадратные скобки
                <textarea 
                    name={`group-${index}-keywords`} 
                    value={keywords}
                    required={true}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {setKeywords(e.target.value)}}
                >
                </textarea>
            </label>

            <div className="ads">
                {ads.map((ad, i) => {
                    // console.log(ad)
                    return <Ad key={ad.id} groupIndex={index} index={i+1} data={ad} onChangeCallback={updateAd} onDuplicateCallback={duplicateAd} onResetCallback={resetAd} />
})}
            </div>
        </fieldset>
    );
}
  
export default Group;
  