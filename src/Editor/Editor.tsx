import React, {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {saveToLocalStorage} from "../save/saveToLocalStorage";
import Input from "./Input";
import Keywords from "./Keywords";
import {getKeywords} from "./transform/keywords";
import MarkdownRenderer from "./MarkdownRenderer";
import './Editor.scss';

export default (props: {fileName: string, onKeywordClick: (keyword: string) => void }) => {
    const [raw,setRaw] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem(props.fileName);
        setRaw(saved || '')
    },[props.fileName])

    const debouncedChange = useCallback(debounce((text) => {
        saveToLocalStorage(text,props.fileName);
    },1000),[props.fileName]);

    const changeEventCallback = useCallback((text) =>{
        setRaw(text);
        debouncedChange(text);
    },[setRaw,debouncedChange]);


    return (
        <div className={'editor'}>
            <Input value={raw} onChangeCallback={changeEventCallback}/>
            <Keywords onKeywordClick={props.onKeywordClick} className={'keywords'} keywords={getKeywords(raw)}/>
            <MarkdownRenderer raw={raw}/>
        </div>
    );
}