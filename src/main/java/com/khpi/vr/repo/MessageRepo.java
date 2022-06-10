package com.khpi.vr.repo;

import com.khpi.vr.domain.ChatRoom;
import com.khpi.vr.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message, Long> {
    List<Message> findAllByChatRoomMessages(ChatRoom chatRoom);
}
