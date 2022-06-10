package com.khpi.vr.controller;

import com.khpi.vr.domain.Message;
import com.khpi.vr.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/chat/{chatId}")
    public List<Message> getOne(@PathVariable("chatId") Long chatId) {
        return messageService.getMessagesFromChat(chatId);
    }

    @PutMapping("/chat/{chatId}/sender/{senderId}")
    public Message putMessage(
            @PathVariable("chatId") Long chatId,
            @PathVariable("senderId") Long senderId,
            @RequestBody Message message
    ) {
        return messageService.sendMessage(chatId, senderId, message);
    }
}
