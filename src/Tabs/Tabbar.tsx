import './Tabbar.scss'

export const Tabbar = ({
                           fileNames,
                           selectedFileName,
                           onFileClick,
                           onAddFileClick
                       }:
                           {
                               fileNames: Set<string>,
                               selectedFileName: string,
                               onFileClick: (fileName: string) => void,
                               onAddFileClick: () => void
                           }) => {

    let tabs:JSX.Element[] = [];

    fileNames.forEach((fileName) => {
        tabs.push(<div
            key={fileName}
            onClick={() => {
                onFileClick(fileName)
            }}
            className={"tab " + (selectedFileName === fileName ? 'selected' : '')}>
            {fileName.split(':')[1] || fileName}
        </div>)
    })

    return <div className={"bar"}>
        {tabs}
        <div className={"add-tab tab"} onClick={() => {
            onAddFileClick()
        }}>+
        </div>
    </div>
}