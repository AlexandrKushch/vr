package com.khpi.vr.controller;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.User;
import com.khpi.vr.repo.ChatRoomRepo;
import com.khpi.vr.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin
public class ChatRoomController {
    private final ChatRoomRepo chats;
    private final UserRepo users;

    @Autowired
    public ChatRoomController(ChatRoomRepo chats, UserRepo users) {
        this.chats = chats;
        this.users = users;
    }

    @GetMapping()
    public List<ChatRoom> getAll() {
        return chats.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<ChatRoom> getChatsIdByUser(@PathVariable("userId") User user) {
        return getAll().stream().filter(chat -> {
            return chat.getUsers().contains(user);
        }).collect(Collectors.toList());
    }

    @GetMapping("/rooms/{userId}")
    public List<Set<User>> getRoomsOfUser(@PathVariable("userId") User user) {
        return getChatsIdByUser(user).stream().map(chat -> {
            chat.getUsers().remove(user);
            return chat.getUsers();
        }).collect(Collectors.toList());
    }

    @GetMapping("/user/{userId}/current/{currentId}")
    public ChatRoom isChatExist(
            @PathVariable("userId") User user,
            @PathVariable("currentId") User current
    ) {
        List<ChatRoom> userChatRooms = getChatsIdByUser(user);
        List<ChatRoom> currentChatRooms = getChatsIdByUser(current);

        userChatRooms.retainAll(currentChatRooms);
        return userChatRooms.size() != 0 ? userChatRooms.get(0) : new ChatRoom();
    }

    @GetMapping("{id}")
    public ChatRoom getOne(@PathVariable("id") ChatRoom chatRoom) {
        return chatRoom;
    }

    @PutMapping
    public ChatRoom createChat(@RequestBody ChatRoom chatRoom) {
        return chats.save(chatRoom);
    }
}
