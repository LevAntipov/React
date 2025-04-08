import axios from "axios"

//сущность axios
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": 'b4f445ee-3c6c-4911-a674-b48fef1898bd',
    }
})

export const usersAPI = {

    getUsers(currentPage, pageSize) {
        return (
            //Возвращает объект response
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },

    follow(userId) {
        return (
            instance.post(`follow/` + userId)
        )
    },

    unfollow(userId) {
        return (
            instance.delete(`follow/` + userId)
        )
    },
    getProfile(userId) {
        console.warn('Устаревший метод, ProfileAPI')
        return (
            profileAPI.getProfile(userId)
        )
    }
}

export const profileAPI = {

    getProfile(userId) {
        return (
            instance.get(`profile/` + userId)
        )
    },

    getStatus(userId) {
        return (
            instance.get(`profile/status/` + userId)
        )
    },

    updateStatus(status) {
        // отправку json требует документация сервака
        return (
            instance.put(`profile/status/`, { status: status })
        )
    },

    updateProfile(data) {
        // отправку json требует документация сервака
        return (
            instance.put(`profile/`, {...data})
        )
    },

    updatePhoto(photoFile) {
        //Не можем просто так отправить file на сервак, нужно преобразование
        const formData = new FormData();
        formData.append("image", photoFile);
        return (
            instance.put(`profile/photo/`, formData,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
        )
    }
}

export const authAPI = {
    me() {
        return (
            instance.get('auth/me')
        )
    },
    login(email,password,captchaValue = null) {
        return (
            instance.post('auth/login', 
                { email: email, password: password, captcha: captchaValue})
        )
    },
    logout() {
        return (
            instance.delete('auth/login')
        )
    }
}
export const securityAPI = {
    getCaptcha(){
        return (
            instance.get('/security/get-captcha-url')
        )
    }
}