import React, {useEffect, useMemo} from "react";
import showdown from 'showdown';
import {replaceKeywordsWithLinks} from "./transform/keywords";
import './MarkdownRenderer.scss';

export default (props: {raw: string}) => {

    const text = replaceKeywordsWithLinks(props.raw);

    const converter = useMemo(() => new showdown.Converter(),[]);
    const converted = useMemo(() => converter.makeHtml(text),[props.raw]);

    return <div className={'rendered'} dangerouslySetInnerHTML={({__html: converted})}/>
}