import request from '@/utils/request'

//标签列表
export const tagList = (params) => {
    request({
        url: '/Admin/queryTagList',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//标签详情
export const tagDetail = (Id) => {
    request({
        url: '/Admin/createTag',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: {
                        Id
                    }
             }
    })
}

//添加标签
export const createTag = (params) => {
    request({
        url: '/Admin/createTag',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//修改标签
export const editTag = (params) => {
    request({
        url: '/Admin/editTag',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//删除标签
export const deleteTag = (Id) => {
    request({
        url: '/Admin/deleteTag',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: {
                        Id
                    }
             }
    })
}