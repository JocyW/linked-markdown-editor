import './Tabbar.scss'
import {File} from "../../models/File";
import {useRef} from "react";

export const Tabbar = ({
                           files,
                           selectedFileId,
                           onFileClick,
                           onAddFileClick,
                           onSearchChanged,
                           suggestionFiles,
                           onSuggestionClick,
                       }:
                           {
                               files: File[],
                               selectedFileId: string | undefined,
                               onFileClick: (file: File) => void,
                               onAddFileClick: () => void,
                               onSearchChanged: (search: string) => void,
                               suggestionFiles: File[],
                               onSuggestionClick: (file: File) => void
                           }) => {

    let tabs: JSX.Element[] = [];

    const inputRef = useRef()as React.MutableRefObject<HTMLInputElement>;

    files.forEach((file) => {
        tabs.push(<div
            key={file._id}
            onClick={() => {
                onFileClick(file)
            }}
            className={"tab " + (selectedFileId === file._id ? 'selected' : '')}>
            {file.name}
        </div>)
    });

    return <div className={"bar"}>
        <div className={"tabs"}>
            {tabs}
            <div className={"add-tab tab"} onClick={() => {
                onAddFileClick()
            }}>+
            </div>
        </div>
        <div className={'search'}>
            <input ref={inputRef} type="text" onChange={(e) => {
                onSearchChanged(e.target.value)
            }}/>
            {suggestionFiles.map((suggestionFile) =>
                <div className="suggestion" onClick={() => {
                    inputRef.current.value = '';
                    onSuggestionClick(suggestionFile)
                    onSearchChanged('');
                }}>
                    <span className="type">{suggestionFile.type}</span>
                    <span className="name">{suggestionFile.name}</span>
                </div>)}
        </div>
    </div>
}