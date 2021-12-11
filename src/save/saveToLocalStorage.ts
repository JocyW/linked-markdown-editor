export const saveToLocalStorage = (text: string, fileName:string, cb: () => void = () => {}) => {
    localStorage.setItem(fileName,text);
}