import React, {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import Input from "./Input";
import Keywords from "./Keywords";
import {getKeywords} from "./transform/keywords";
import MarkdownRenderer from "./MarkdownRenderer";
import './Editor.scss';
import {get, save} from "../../save/localStorage";
import {File} from "../../models/File";
import {activeDataSource} from "../../save/DataSource";

export default (props: { file: File, onKeywordClick: (keyword: string) => void }) => {
    const [raw, setRaw] = useState('');

    useEffect(() => {
        setRaw(props.file.text)
    }, [props.file])

    const debouncedChange = useCallback(debounce((text) => {
        props.file.text = text;
        activeDataSource.save(props.file)
    }, 2000), [props.file]);

    const changeEventCallback = useCallback((text) => {
        setRaw(text);
        debouncedChange(text);
    }, [setRaw, debouncedChange]);


    return (
        <div className={'editor'}>
            <Input value={raw} onChangeCallback={changeEventCallback}/>
            <Keywords onKeywordClick={props.onKeywordClick} className={'keywords'} keywords={getKeywords(raw)}/>
            <MarkdownRenderer raw={raw}/>
        </div>
    );
}