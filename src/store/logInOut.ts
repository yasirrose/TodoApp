export const Logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}


export const checkToken = () => {
    return localStorage.getItem('accessToken') ? true : false
}