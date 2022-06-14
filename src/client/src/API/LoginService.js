import axios from "axios";

export default class LoginService {

    static ROOT_URL = "http://vr-env.eba-whe5ngp5.us-east-1.elasticbeanstalk.com";
    static LOCALHOST = "http://localhost:8080";
    
    static async login(user) {
        const response = await axios.post(this.LOCALHOST + "/api/auth/login", user);
        return response;
    }
}