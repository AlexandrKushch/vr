package com.khpi.vr.service;

import com.khpi.vr.configure.PasswordEncoder;
import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.Role;
import com.khpi.vr.domain.User;
import com.khpi.vr.repo.ChatRoomRepo;
import com.khpi.vr.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepo users;
    private final ChatRoomRepo chats;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo users, ChatRoomRepo chats, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.chats = chats;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() {
        return users.findAll();
    }

    public User getById(Long id) {
        return users.findById(id).orElse(null);
    }

    public User enrollUser(User user) {
        user.setActive(true);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(user.getPassword()));
        return users.save(user);
    }

    public User enrollUserIntoChat(User user, ChatRoom chat) {
        user.addIntoChat(chat);
        return users.save(user);
    }

    public User findByUsername(String username) {
        return users.findByUsername(username);
    }
}
