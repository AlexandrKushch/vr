import axios from "axios";

export default class MessageService {

    static ROOT_URL = "http://vr-env.eba-whe5ngp5.us-east-1.elasticbeanstalk.com";
    static LOCALHOST = "http://localhost:8080";

    static async getByChatId(chatId, token) {
        const response = await axios.get(this.LOCALHOST + "/api/messages/chat/" + chatId,
                                            {headers:{Authorization: "Bearer_" + token}});
        return response.data;
    }

    static async putMessage(chatId, senderId, message, token) {
        const response = await axios.put(this.LOCALHOST + "/api/messages/chat/" + chatId + "/sender/" + senderId, message, {
            headers: {Authorization: "Bearer_" + token}
        });
        return response.data;
    }
}