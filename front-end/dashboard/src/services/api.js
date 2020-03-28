import axios from 'axios';


const auth = () => {
    return sessionStorage.getItem('dG9rZW4=') ? "Basic " + sessionStorage.getItem('dG9rZW4=') : "erro"
}

const api = axios.create({
    baseURL: 'http://localhost:9090',
    headers: {
        Authorization: {
            toString() {
                return auth()
            }
        }
    }
})

export default api;