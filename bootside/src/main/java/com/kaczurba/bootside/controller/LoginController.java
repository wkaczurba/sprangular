package com.kaczurba.bootside.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaczurba.bootside.model.BasicAuthentication;

@RestController
@CrossOrigin("http://localhost:4200")
public class LoginController {

	@GetMapping("/api/basicAuth")
	public ResponseEntity<BasicAuthentication> login() {
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		
		return new ResponseEntity<>(new BasicAuthentication(username, null), HttpStatus.OK);
	}
	
}
