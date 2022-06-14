import axios from "axios";

export default class ChatRoomService {

    static ROOT_URL = "http://vr-env.eba-whe5ngp5.us-east-1.elasticbeanstalk.com";
    static LOCALHOST = "http://localhost:8080";

    static async getAllByUserId(userId, token) {
        const response = await axios.get(this.LOCALHOST + "/api/chats/user/" + userId,
            {headers: {Authorization: "Bearer_" + token}});
        
        return response.data;
    }

    static async getAllFriendsByUserId(userId, token) {
        const response = await axios.get(this.LOCALHOST + "/api/chats/rooms/" + userId,
                    {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async createChat(token) {
        const chat = {}
        const response = await axios.put(this.LOCALHOST + "/api/chats", chat, {
            headers: {Authorization: "Bearer_" + token}
        });
        return response.data;
    }

    static async isChatExist(userId, currentId, token) {
        const response = await axios.get(this.LOCALHOST + "/api/chats/user/" + userId + "/current/" + currentId,
                    {headers: {Authorization: "Bearer_" + token}});
        return response;
    }
}