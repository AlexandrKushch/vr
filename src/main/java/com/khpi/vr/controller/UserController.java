package com.khpi.vr.controller;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.User;
import com.khpi.vr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAll();
    }

    @GetMapping("{id}")
    public User getOneUser(@PathVariable("id") Long userId) {
        return userService.getById(userId);
    }

    @PutMapping("/enroll_chat/{id}")
    public User addUserIntoChat(
            @PathVariable("id") User user,
            @RequestBody ChatRoom chatRoom
    ) {
        return userService.enrollUserIntoChat(user, chatRoom);
    }
}
