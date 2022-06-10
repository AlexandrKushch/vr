package com.khpi.vr.repo;

import com.khpi.vr.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepo extends JpaRepository<ChatRoom, Long> {}
