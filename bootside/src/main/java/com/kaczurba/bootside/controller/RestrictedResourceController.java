package com.kaczurba.bootside.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaczurba.bootside.model.GoldenBean;

@RestController
@CrossOrigin("http://localhost:4200")
public class RestrictedResourceController {

	@GetMapping("/api/goldenbean")
	public GoldenBean goldenBean() {
		return new GoldenBean("golden", "bean", 123);
	}
	
	@PostMapping("/api/postbean")
	public String postBean() {
		return "{ \"debug\":\"ok\" }";
	}
}
