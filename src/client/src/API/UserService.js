import axios from "axios";


export default class UserService {
    static async getAll(token) {
        const response = await axios.get("http://localhost:8080/api/users", {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async getOne(id, token) {
        const response = await axios.get("http://localhost:8080/api/users/" + id,
                    {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async addUserIntoChat(userId, chat, token) {
        const response = await axios.put("http://localhost:8080/api/users/enroll_chat/" + userId, chat, {
            headers: {Authorization: "Bearer_" + token}
        });

        console.log(response)
        return response.data;
    }
}