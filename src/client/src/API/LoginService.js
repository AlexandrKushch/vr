import axios from "axios";

export default class LoginService {
    
    static async login(user) {
        const response = await axios.post("http://localhost:8080/api/auth/login", user);
        return response;
    }
}