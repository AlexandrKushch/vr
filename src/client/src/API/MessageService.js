import axios from "axios";

export default class MessageService {
    // static async getAll(chatId) {
    //     const response = await axios.get("http://localhost:8080/api/messages/chat", chatId);
    //     return response.data;
    // }

    static async getByChatId(chatId, token) {
        const response = await axios.get("http://localhost:8080/api/messages/chat/" + chatId, 
                                            {headers:{Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async putMessage(chatId, senderId, message, token) {
        const response = await axios.put("http://localhost:8080/api/messages/chat/" + chatId + "/sender/" + senderId, message, {
            headers: {Authorization: "Bearer_" + token}
        });
        return response.data;
    }
}