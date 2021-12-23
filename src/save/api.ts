import {File, FileTypes} from "../models/File";
import {DataSource} from "./DataSource";
import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api';

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL
})

export class ApiDataSource implements DataSource {

    async get(id: string): Promise<File> {
        if (!id) return new File()

        const response = await axiosInstance.get(`/file/${id}`);
        return response.data.data;
    }

    async save(file: File): Promise<File> {
        if (file._id) {
            await axiosInstance.put('/file/' + file._id, file);
            return file;
        }
        const {data} = await axiosInstance.post('/file', file);
        file._id = data.id;
        return file;
    }

    async findByKeyword(keyword: string): Promise<File[]> {
        try {
            const response = await axiosInstance.get('/files?name=' + encodeURIComponent(keyword));
            return response.data.data
        } catch (err) {
            const newFile = new File();
            newFile.name = keyword;
            newFile.type = FileTypes.keyword;
            return [newFile]
        }
    }

    async findByName(name: string): Promise<File[]> {

        if(!name) return []

        try {
            const response = await axiosInstance.get('/files?name=' + encodeURIComponent(name));
            return response.data.data
        } catch (err) {
            return []
        }
    }

    static instance: DataSource;

    static getInstance() {
        if (ApiDataSource.instance) return ApiDataSource.instance;
        return ApiDataSource.instance = new ApiDataSource();
    }

}

export default ApiDataSource.getInstance();