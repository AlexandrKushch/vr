package com.khpi.vr.service;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.Message;
import com.khpi.vr.domain.User;
import com.khpi.vr.repo.ChatRoomRepo;
import com.khpi.vr.repo.MessageRepo;
import com.khpi.vr.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepo messages;
    private final ChatRoomRepo chats;
    private final UserRepo users;

    @Autowired
    public MessageService(MessageRepo messages, ChatRoomRepo chats, UserRepo users) {
        this.messages = messages;
        this.chats = chats;
        this.users = users;
    }

    public List<Message> getMessagesFromChat(Long chatId) {
        ChatRoom chat = chats.findById(chatId).orElse(null);
        return messages.findAllByChatRoomMessages(chat);
    }

    public Message sendMessage(Long chatId, Long senderId, Message message) {
        ChatRoom chat = chats.findById(chatId).orElse(null);
        User sender = users.findById(senderId).orElse(null);

        message.sendMessage(chat, sender);
        return messages.save(message);
    }
}
