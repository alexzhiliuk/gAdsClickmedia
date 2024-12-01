import React, { useState } from 'react';
import googleLogo from '../../assets/images/logo.png';
import './campaign.scss';

import Group, { IAd } from '../Group/Group';
import Input from '../Inputs/Input';


const headerData = {
    "Google": {
        logo: googleLogo,
        alt: "Google Ads",
        title: "Генератор объявлений Google AdWords"
    },
    "Yandex": {
        logo: googleLogo,
        alt: "Google Ads",
        title: "Генератор объявлений Google AdWords"
    }
}

export interface IGroup {
    id?: number,
    title: string,
    keywords: string,
    ads: Array<IAd>
}

const initialGroups: IGroup[] = [
    {
        id: 1,
        title: "",
        keywords: "",
        ads: []
    }
]
let nextId = 2;

const Campaign: React.FC = () => {
    const [type, setType] = useState<"Google" | "Yandex">("Google");
    const [title, setTitle] = useState<string>("");
    const [groups, setGroups] = useState<IGroup[]>(initialGroups);

    const data = headerData[type];

    const updateGroup = (index: number, group: IGroup) => {
        groups[index] = group
        setGroups([...groups])
    }

    const submitHandler = () => {
        console.log(title)
        console.log(groups)
    }

    return (
        <>
            <header className="header container">
                <div className="logo">
                    <img src={data.logo} alt={data.alt} />
                </div>
                <h1>{data.title}</h1>
            </header>
            <main>
                <form className='container'>
                    <Input label='Название кампании' inputName={`campaign-name`} required={true} value={title} onChangeCallback={setTitle} />

                    {groups.map((group, i) => (
                        <Group key={group.id} index={i+1} data={group} onChangeCallback={updateGroup} />
                    ))}

                    <div className="bottom-btns">
                        <button type="button" id="addGroup">Новая группа</button>
                        <button type="button" className="generate-btn" onClick={submitHandler}>СГЕНЕРИРОВАТЬ XLSX</button>
                    </div>
                    
                </form>
            </main>
        </>
    );
}
  
export default Campaign;
  