export enum FileTypes {
    file = 'file',
    keyword = 'keyword'
}

export class File {
    public text: string = '';
    public name: string = 'Untitled';
    public type: string = FileTypes.file;
    public tags: string[] = [];
    public _id: string | undefined;
    public createdAt: string|undefined;
    public updatedAt: string|undefined;
}
