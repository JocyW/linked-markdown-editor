export const save = (text: string, fileName:string, cb: () => void = () => {}) => {
    localStorage.setItem(fileName, text);
}

export const get = (fileName: string) => localStorage.getItem(fileName);

export const getAllKeywords = ():string[] => {
    // @ts-ignore
    return Object.keys(localStorage).map((key) => {
        const split = key.split(':');
        if(Array.isArray(split) && split[0] === 'keyword') return split[1]
        return null;
    }).filter((val) => val !== null);
}