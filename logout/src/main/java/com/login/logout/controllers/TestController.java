package com.login.logout.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.Optional;

import com.login.logout.repository.*;
import com.login.logout.security.services.UserService;
import com.login.logout.models.User;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private UserService userService;


	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/users")
	public List<User> allUsers() {
	return userService.getAllUsers();

	}

	@GetMapping("/user/{id}")
	public Optional<User> getUser(@PathVariable long id) {
	return userService.getUser(id);

	}
	
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable long id) {
		userService.deleteUser(id);
			 
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
