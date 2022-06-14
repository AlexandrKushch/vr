import axios from "axios";


export default class UserService {

    static ROOT_URL = "http://vr-env.eba-whe5ngp5.us-east-1.elasticbeanstalk.com";
    static LOCALHOST = "http://localhost:8080";

    static async getAll(token) {
        const response = await axios.get(this.LOCALHOST + "/api/users", {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async getOne(id, token) {
        const response = await axios.get(this.LOCALHOST + "/api/users/" + id,
                    {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async addUserIntoChat(userId, chat, token) {
        const response = await axios.put(this.LOCALHOST + "/api/users/enroll_chat/" + userId, chat, {
            headers: {Authorization: "Bearer_" + token}
        });

        console.log(response)
        return response.data;
    }
}