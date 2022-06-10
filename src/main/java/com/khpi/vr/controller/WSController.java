package com.khpi.vr.controller;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.Message;
import com.khpi.vr.domain.User;
import com.khpi.vr.service.WSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class WSController {
    private final WSService service;

    @Autowired
    public WSController(WSService service) {
        this.service = service;
    }

    @MessageMapping("message")
    public Message receivePublicMessage(@Payload Message message) {
        service.sendMessage(message);
        return message;
    }

    @MessageMapping("users")
    public User receiveRegisteredUser(@Payload User user) {
        service.enrollUser(user);
        return user;
    }

    @MessageMapping("chats")
    public ChatRoom receiveChat(@Payload String data) {
        return service.enrollChat(data);
    }
}
