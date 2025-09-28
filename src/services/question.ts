import axios, { ResDataType } from "./ajax";

// 声明参数类型
type SerachOption = {
    keyword: string,
    isStar: boolean,
    isDelete: boolean,
    page: number,
    pageSize: number
}


export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = await axios.get(url) as ResDataType
    return data;
}


export async function createQuestionService(): Promise<ResDataType> {
    const url = `/api/question`
    const data = await axios.post(url) as ResDataType
    return data;
}

// Partial<SerachOption> 表示可以写部分属性，只要类型正确即可相当于属性上加?
export async function getQuestionServiceList(sopt: Partial<SerachOption>): Promise<ResDataType> {
    const url = `/api/questionlist`
    const data = (await axios.get(url, { params: sopt })) as ResDataType
    return data;
}

// sopt: { [key: string]: any } 指定数据类型为任意不限制，只要属性是string即可
export async function updateQuestionService(id: string, sopt: { [key: string]: any }): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.patch(url, { params: sopt })) as ResDataType
    return data;
}

// 复制
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/duplicate/${id}`
    const data = (await axios.post(url)) as ResDataType
    return data;
}