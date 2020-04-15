import $axios from './index'

// 获取短信配置列表
export function getSmsList() {
    const url = '/platform/parameter/params'
    return $axios.get(url)
}
// 设置更新
export function setSmsData(data) {
    // const url = '/login'
    const url = '/platform/parameter/set-sms'
    return $axios.post(url, data)
}
// 模板更新
export function setSmsTem(data) {
    // const url = '/login'
    const url = '/platform/parameter/set-sms-template'
    return $axios.post(url, data)
}
