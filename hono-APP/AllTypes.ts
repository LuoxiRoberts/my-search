//定义了所有的接口
export interface Data { // 定义 Data 接口，表示数据的结构。
    id : number;
    projectName : string;
    createAt : Date | string; 
    updateAt : Date | string; 
}

export interface QueryParams { // 定义 QueryParams 接口，表示查询参数的结构。
    page: number; 
    limit: number; 
    search?: string; 
}

export interface ImportResponse { // 定义 ImportResponse 接口，表示导入操作的响应结构。
    success: boolean; 
    message: string; 
    importedCount?: number; 
}

export interface DataRecord { // 定义 DataRecord 接口，表示数据记录的结构。
    id: number; 
    ProjectName: string; 
}

export interface CacheData { // 定义 CacheData 接口，表示缓存数据的结构。
    key: string; 
    value: DataRecord[]; 
    expiration: number; 
}