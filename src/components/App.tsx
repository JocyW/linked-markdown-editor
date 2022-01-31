import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import Editor from "./Editor/Editor";
import {Tabbar} from "./Tabs/Tabbar";
import {File} from "../models/File";
import {activeDataSource} from "../save/DataSource";
import {Details} from "./Details/Details";

enum pagesEnum {
    editor,
    details
}

function App() {

    const [file, setFile] = useState<File>(new File());
    const [openFiles, setOpenFiles] = useState<File[]>([]);
    const [suggestionFiles, setSuggestionFiles] = useState<File[]>([]);

    const addFileToOpenFiles = useCallback((file: File) => {
        setOpenFiles((old) => {
            if (old.find((openFile) => openFile._id === file._id)) {
                return old
            }
            return [...old, file]
        });
        setFile(file)
    }, [setOpenFiles])

    const addFileClickCallback = useCallback(() => {
        addFileToOpenFiles(new File())
    }, [addFileToOpenFiles]);

    const keywordClickCallback = useCallback((keyword) => {
        activeDataSource.findByKeyword(keyword).then((files) => {
            if (files.length) {
                addFileToOpenFiles(files[0]);
            }
        })
    }, [addFileToOpenFiles]);

    const searchChangedCallback = useCallback((searchString) => {
        activeDataSource.findByName(searchString).then((files) => {
            setSuggestionFiles(files);
        })
    }, [setSuggestionFiles]);

    const closeClickCallback = useCallback((cbFile) => {
        setOpenFiles((prevState => {
            const copied = [...prevState];
            const index = copied.findIndex((item) => item._id === cbFile._id)
            copied.splice(index);
            if(cbFile._id === file._id){
                setFile(copied[copied.length - 1]);
            }

            return copied;
        }))
    },[setOpenFiles,setFile,file])

    useEffect(() => {
        const path = window.location.pathname.split('/');
        activeDataSource.get(decodeURIComponent(path[path.length - 1])).then((file) => {
            addFileToOpenFiles(file);
        })
    }, [])


    const pages = {
        [pagesEnum.editor]: <Editor onKeywordClick={keywordClickCallback} file={file}/>,
        [pagesEnum.details]: <Details file={file}/>
    }

    const [page, setPage] = useState(pagesEnum.editor)

    const tabClickCallback = useCallback((callbackFile) => {
        if (file._id === callbackFile._id) {
            if (page === pagesEnum.editor) {
                setPage(pagesEnum.details);
            } else if (page === pagesEnum.details) {
                setPage(pagesEnum.editor)
            }
        }

        setFile(callbackFile)
    }, [setFile, page, setPage, file]);

    return <div className={'page'}>
        <Tabbar onAddFileClick={addFileClickCallback} onFileClick={tabClickCallback} files={openFiles}
                selectedFileId={file._id} onSearchChanged={searchChangedCallback} suggestionFiles={suggestionFiles}
                onSuggestionClick={addFileToOpenFiles} onCloseClick={closeClickCallback}/>
        {pages[page]}
    </div>
}

export default App;
