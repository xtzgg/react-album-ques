// _mock 下划线开头表名该文件夹不属于该项目一部分，这里仅做mock测试用
import Mock from 'mockjs'

Mock.mock('/api/test','get',()=>{
    return {
        code: 0,
        data: 'mock成功'
    }
})