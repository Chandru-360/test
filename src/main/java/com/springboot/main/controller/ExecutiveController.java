package com.springboot.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enums.Role;
import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Executive;
import com.springboot.main.model.User;
import com.springboot.main.service.ExecutiveService;
import com.springboot.main.service.UserService;

@RestController
@RequestMapping("/executive")
public class ExecutiveController {
	
	@Autowired
	private ExecutiveService executiveService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/add")
	public Executive insertExecutive(@RequestBody Executive executive) {
		/*save user info in db*/
		User user=executive.getUser();
		String passwordPlain=user.getPassword();
		String encodedPassword=passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		
		user.setRole(Role.EXECUTIVE);
		user=userService.insert(user);
		
		executive.setUser(user);
		
		return executiveService.insert(executive);
	}
	
	@GetMapping("/getone/{eid}")
	public ResponseEntity<?> getOne(@PathVariable("eid")int eid) {
		
		try {
			Executive executive = executiveService.getByExecutiveId(eid);
			return ResponseEntity.ok().body(executive);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}  
}
