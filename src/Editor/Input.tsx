import React, {ChangeEventHandler, KeyboardEventHandler} from 'react';
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default (props: {onChangeCallback: (value: string) => void, value: string}) => {

    const keywords = Object.keys(localStorage).map((key) => {
        const split = key.split(':');
        if(Array.isArray(split) && split[0] === 'keyword') return split[1]
        return null;
    }).filter((val) => !!val);

    const staticWordCompleter = {
        getCompletions: function(editor:any, session:any, pos:any, prefix:any, callback:any) {
            callback(null, keywords.map(function(word) {
                return {
                    caption: `$${word}`,
                    value: `$${word}`,
                    meta: "keyword"
                };
            }));

        }
    }

    return <AceEditor
        mode="markdown"
        theme="github"
        onChange={props.onChangeCallback}
        value={props.value}
        name="editor"
        style={({height: '100%'})}
        enableLiveAutocompletion={true}
        editorProps={
            ({
                completers:  [staticWordCompleter]
            })
        }
        showGutter={false}
        fontSize={14}
    />
}