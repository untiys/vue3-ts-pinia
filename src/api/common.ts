import request from '../axios/request'


// 示范接口
interface List{
    caseName: string,
    id: string,
}

export function list(data:List) {
    return request({
        url: '',
        method: 'post',
        data,
    })
}
