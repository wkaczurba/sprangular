package com.kaczurba.bootside;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncoderMain {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		for (int i = 0; i < 10; i++) {
			System.out.println(encoder.encode("123"));
		}
	}
}
