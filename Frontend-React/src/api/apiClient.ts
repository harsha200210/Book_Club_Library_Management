import axios, {AxiosError} from "axios";

export const BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
    baseURL: BASE_URL, // Set the base URL for all requests
    headers: {
        "Content-Type": "application/json", // Set default content type for requests
    },
    withCredentials: true,// Include credentials (cookies) in requests
})

// Authorization: "Bearer asdkjasldkja"
export const setHeader = (accessToken: string) => {
    if (accessToken !== "") {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    } else {
        delete apiClient.defaults.headers.common["Authorization"]
    }
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config // original request
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const result = await apiClient.post("/auth/refresh-token")
                const newAccessToken = result.data.accessToken
                setHeader(newAccessToken)
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                return apiClient(originalRequest)
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        window.location.href = "/login"
                    }
                }
            }
        }
    }
)

export default apiClient;