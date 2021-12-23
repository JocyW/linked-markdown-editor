import {File} from "../models/File";
import ApiDataSource from "./api";

export interface DataSource {
    save(file: File): Promise<File>
    get(id: string): Promise<File>
    findByKeyword(keyword: string): Promise<File[]>
    findByName(name: string): Promise<File[]>
}

export const activeDataSource = ApiDataSource;