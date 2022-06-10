package com.khpi.vr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "chatRoomMessages")
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "chatRoomsOfUser")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Set<User> getUsers() {
        return users;
    }
}
