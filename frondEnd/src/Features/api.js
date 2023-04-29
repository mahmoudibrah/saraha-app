export const url = "http://localhost:4000/api"
export const host = "http://localhost:3000"

export const headers = () => {
    const config = {
        headers : {
            "auth-token" : localStorage.getItem('token')
        }
    }
    return config
}