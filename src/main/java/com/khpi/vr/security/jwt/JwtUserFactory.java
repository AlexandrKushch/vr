package com.khpi.vr.security.jwt;

import com.khpi.vr.domain.Role;
import com.khpi.vr.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public final class JwtUserFactory {

    public JwtUserFactory() {
    }

    public static JwtUser create (User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                maoToGrantedAuthorities(user.getRole()),
                user.isActive()
//                user.getChatRoomsOfUser(),
//                user.getMessages()
        );
    }

    private static List<GrantedAuthority> maoToGrantedAuthorities(Role userRole) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userRole.name()));
        return authorities;
    }
}
