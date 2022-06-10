import axios from "axios";

export default class ChatRoomService {
    static async getAllByUserId(userId, token) {
        const response = await axios.get("http://localhost:8080/api/chats/user/" + userId,
            {headers: {Authorization: "Bearer_" + token}});
        
        return response.data;
    }

    static async getAllFriendsByUserId(userId, token) {
        const response = await axios.get("http://localhost:8080/api/chats/rooms/" + userId,
                    {headers: {Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async createChat(token) {
        const chat = {}
        const response = await axios.put("http://localhost:8080/api/chats", chat, {
            headers: {Authorization: "Bearer_" + token}
        });
        return response.data;
    }

    static async isChatExist(userId, currentId, token) {
        const response = await axios.get("http://localhost:8080/api/chats/user/" + userId + "/current/" + currentId,
                    {headers: {Authorization: "Bearer_" + token}});
        return response;
    }
}