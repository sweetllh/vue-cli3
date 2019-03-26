import request from '@/utils/request'
import requestImg from '@/utils/requestImg'

//打卡点列表
export function pointList(params){
    return request({
        url: "/Clock/GetClocks",
        method: "post",
        data: params
    })
}

//打卡点详情
export function pointDetail(Id){
    return request({
        url: "/Clock/GetClockById?id="+Id,
        method: 'post',
    })
}

//添加或修改打卡点
export function savePoint(params){
    return requestImg({
        url: '/Clock/SaveClock',
        method: 'post',
        data: params
    })
}

//删除打卡点
export function deletePoint(Id){
    return request({
        url: "/Clock/DeleteClock?id="+Id,
        method: 'post',
    })
}

