import request from '@/utils/request'

//标签列表
export function tagList(params) {
    return request({
        url: "/Lable/GetLables",
        method: "post",
        data: params
    })
  }

//基础标签
export function queryBasedLabel(){
    return request({
        url: "/Lable/GetLablesForClock?category=1",
        method: "post",
    })
}

//个性化标签
export function queryPersonalLabel(){
    return request({
        url: "/Lable/GetLablesForClock?category=2",
        method: "post",
    })
}

//添加标签
export function createTag (params) {
    return request({
        url: "Lable/AddLable",
        method: "post",
        data: params
    })
}

//修改标签
export function editTag (params) {
    return request({
        url: "/Lable/UpdateLable",
        method: "post",
        data: params
    })
}

//删除标签
export function deleteTag (Id) {
    return request({
        url: "Lable/DeleteLable",
        method: "post",
        data: {
            Id
        }
    })
}