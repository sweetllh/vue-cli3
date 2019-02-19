import request from '@/utils/request'
import requestImg from '@/utils/requestImg'

//打卡点列表
export const pointList = (params) => {
    request({
        url: '/Admin/queryPointList',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//打卡点详情
export const pointDetail = (Id) => {
    request({
        url: '/Admin/pointDetail',
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

//添加打卡点
export const createPoint = (params) => {
    requestImg({
        url: '/Admin/createPoint',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//修改打卡点
export const editPoint = (params) => {
    requestImg({
        url: '/Admin/editPoint',
        method: 'post',
        data: {
                    timestamp: "1",
                    SecretId: "3",
                    Signature: "4",
                    Data: params
             }
    })
}

//删除打卡点
export const deletePoint = (Id) => {
    request({
        url: '/Admin/deletePoint',
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