import {File, FileTypes} from "../../models/File";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";

export const Details = (
    {
        file
    }:
        { file: File }) => {

    const [name,setName] = useState(file.name);

    const debouncedSaveName = useCallback(debounce((name: string) => {
        file.name = name;
    },1000),[])

    useEffect(() => {
        setName(file.name);
    },[file.name])

    return <div>
        <div className="field">
            <div><b>Name</b></div>
            <input type="text" name="name" value={name} onChange={(e) => {
                setName(e.target.value)
                debouncedSaveName(e.target.value);
            }}/>
        </div>

        <div className="field">
            <div><b>Type</b></div>
            {
                Object.values(FileTypes).map((fileType) => {
                    return <button onClick={() => {file.type = fileType}}>{fileType}</button>
                })
            }
        </div>
    </div>
}