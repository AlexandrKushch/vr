import axios from "axios";


export default class RegisterService {
    static async putOne(user) {
        const response = await axios.put("http://localhost:8080/api/registration", user);
        return [response.data, response.status];
    } 
}