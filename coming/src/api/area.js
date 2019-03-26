import request from '@/utils/request'
//省
export function getProvince(params) {
    return request({
        url: "/AreaCode/GetAllProvince",
        method: "post"
    })
}

//市
export function getCity(pcode) {
    return request({
        url: "/AreaCode/GetAllCity?pcode="+pcode,
        method: "post",
    })
}

//区
export function getDistrict(ccode) {
    return request({
        url: "/AreaCode/GetAllDistrict?ccode="+ccode,
        method: "post",
    })
}
