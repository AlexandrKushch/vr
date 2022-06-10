package com.khpi.vr.service;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.Message;
import com.khpi.vr.domain.User;
import com.khpi.vr.repo.ChatRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WSService {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomRepo chats;

    @Autowired
    public WSService(SimpMessagingTemplate messagingTemplate, ChatRoomRepo chats) {
        this.messagingTemplate = messagingTemplate;
        this.chats = chats;
    }

    public void sendMessage(final Message message) {
        messagingTemplate.convertAndSendToUser(message.getChatRoomMessages().getId().toString(), "/chat/messages", message);
    }

    public void enrollUser(final User user) {
        messagingTemplate.convertAndSend("/chat/users", user);
    }

    public ChatRoom enrollChat(final String data) {  // final Optional<ChatRoom> chatRoom, final Long userId, final Long currentUserId
        String [] splitedData = data.split(":");

        ChatRoom chatRoom = chats.findById(Long.parseLong(splitedData[0])).orElse(null);
        long userId = Long.parseLong(splitedData[1]);
        long currentUserId = Long.parseLong(splitedData[2]);

        if (chatRoom != null) {
            messagingTemplate.convertAndSendToUser(Long.toString(currentUserId), "/chat/enroll_chat", chatRoom);
            messagingTemplate.convertAndSendToUser(Long.toString(userId), "/chat/enroll_chat", chatRoom);
        }

        return chatRoom;
    }
}
