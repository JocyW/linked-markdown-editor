import React from 'react';
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {getAllKeywords} from "../../save/localStorage";

export default (props: {onChangeCallback: (value: string) => void, value: string}) => {
    const staticWordCompleter = {
        getCompletions: function(editor:any, session:any, pos:any, prefix:any, callback:any) {
            callback(null, getAllKeywords().map(function(word) {
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
        style={({height: '100%', 'overflowY': 'hidden'})}
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