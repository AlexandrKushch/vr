package com.khpi.vr.controller;

import com.khpi.vr.domain.User;
import com.khpi.vr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin
public class RegisterController {
    private final UserService userService;

    @Autowired
    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping
    public ResponseEntity<?> enrollUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) == null) {
            return ResponseEntity.ok(userService.enrollUser(user));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(user);
    }
}
