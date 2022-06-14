import axios from "axios";


export default class RegisterService {

    static ROOT_URL = "http://vr-env.eba-whe5ngp5.us-east-1.elasticbeanstalk.com";
    static LOCALHOST = "http://localhost:8080";

    static async putOne(user) {
        const response = await axios.put(this.LOCALHOST + "/api/registration", user);
        return [response.data, response.status];
    } 
}