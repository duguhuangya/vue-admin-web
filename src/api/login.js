import $axios from './index'

export function login(data) {
    const url = '/login'
    // const url = '/login/login'
    return $axios.post(url, data)
}
export function getInfo() {
    const url = '/getInfo'
    // const url = '/login/identity'
    return $axios.get(url)
}
