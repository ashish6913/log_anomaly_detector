package com.login.logout.security.services;

import com.login.logout.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.login.logout.models.*;
@Service
public class UserService {
    @Autowired
	public UserRepository userRepository;

    public List<User> getAllUsers() {
	
        List<User> users = new ArrayList<>();
        
        userRepository.findAll()
        .forEach(users::add);
        
        return users;		
    }

    public Optional<User> getUser(long id) {
        return userRepository.findById(id);
   }
   public void deleteUser(long id) {
    userRepository.deleteById(id);
}





}
