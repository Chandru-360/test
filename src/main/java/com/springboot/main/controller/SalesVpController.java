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
import com.springboot.main.model.SalesVp;
import com.springboot.main.model.User;
import com.springboot.main.service.SalesVpService;
import com.springboot.main.service.UserService;

@RestController
@RequestMapping("/salesvp")
public class SalesVpController {
	

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private SalesVpService salesVpService;
	
	@PostMapping("/add")
	public SalesVp insertSalesVp(@RequestBody SalesVp salesVp) {
		/*save user info in db*/
		User user=salesVp.getUser();
		String passwordPlain=user.getPassword();
		String encodedPassword=passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		
		user.setRole(Role.SALES_VP);
		user=userService.insert(user);
		
		salesVp.setUser(user);
		
		return salesVpService.insert(salesVp);
	}

	@GetMapping("/getone/{sid}")
	public ResponseEntity<?> getOne(@PathVariable("sid")int sid) {
		
		try {
			SalesVp salesVp = salesVpService.getBysalesVpId(sid);
			return ResponseEntity.ok().body(salesVp);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}  

}
