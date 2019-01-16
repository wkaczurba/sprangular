package com.kaczurba.bootside.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kaczurba.bootside.model.FirstBean;

@RestController
@CrossOrigin("http://localhost:4200")
public class UnrestrictedResourceController {

	@GetMapping("/api/firstbean")
	public FirstBean firstBean() {
		return new FirstBean("first", "bean", 1);
	}
}
