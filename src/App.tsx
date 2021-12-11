import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import Editor from "./Editor/Editor";
import {Tabbar} from "./Tabs/Tabbar";

let counter = {value: 0};

function App() {

    const [file, setFile] = useState('file:tmp');
    const [openFiles, setOpenFiles] = useState(new Set(['file:tmp']));

    const tabClickCallback = useCallback((fileName) => {
        setFile(fileName)
    }, [setFile]);

    const addFileToOpenFiles = useCallback((fileName: string) => {
        setOpenFiles((old) => {
            const updated = new Set(old);
            updated.add(fileName);
            return updated
        });
        setFile(fileName)
    },[setOpenFiles])

    const addFileClickCallback = useCallback(() => {
       addFileToOpenFiles('file:New File ' + counter.value++)
    },[addFileToOpenFiles]);

    const keywordClickCallback = useCallback((keyword) => {
        addFileToOpenFiles(`keyword:${keyword}`)
    }, [addFileToOpenFiles]);

    useEffect(() => {
        const path = window.location.pathname.split('/');
        addFileToOpenFiles(decodeURIComponent(path[path.length - 1]))
    },[])

    return <div className={'page'}>
        <Tabbar onAddFileClick={addFileClickCallback} onFileClick={tabClickCallback} fileNames={openFiles} selectedFileName={file}/>
        <Editor onKeywordClick={keywordClickCallback} fileName={file}/>
    </div>
}

export default App;
