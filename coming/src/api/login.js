import request from '@/utils/request'
export function login(params) {
    return request({
        url: "User/Login",
        method: "post",
        data: params
    })
}