import {File} from "../../models/File";

export const Details = (
    {
        file
    }:
        { file: File }) => {
    return <div>
        <div className="field">
            <div><b>Name</b></div>
            <input type="text" name="name" value={file.name} onChange={(e) => {
                file.name = e.target.value
            }}/>
        </div>
    </div>
}