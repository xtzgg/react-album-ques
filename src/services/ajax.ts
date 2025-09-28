// 该文件为服务端API接口配置
import { message } from "antd";
import axios from "axios";

const instance = axios.create({
    timeout: 10 * 1000
})

instance.interceptors.response.use((res) => {
    const resData = (res.data || {}) as ResType;
    const { code, data, msg } = resData;

    if (code !== 0) {
        // 错误提示
        if (msg) {
            message.error(msg);
        }
        // 终止响应处理
        throw new Error(msg);
    }

    return data as any;
})


export default instance;

// 定义统一返回的格式API
export type ResType = {
    code: number,
    data?: ResDataType,
    msg?: string,
}

// data的数据类型格式 key为string类型，value为任意类型
export type ResDataType = {
    [key: string]: any
}






