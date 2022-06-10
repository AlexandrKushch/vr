package com.khpi.vr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "senderId", referencedColumnName = "id")
//    @JsonIgnore
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="chatRoomId", referencedColumnName = "id")
    private ChatRoom chatRoomMessages;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public ChatRoom getChatRoomMessages() {
        return chatRoomMessages;
    }

    public void sendMessage(ChatRoom chatRoom, User user) {
        this.chatRoomMessages = chatRoom;
        this.sender = user;
    }
}
