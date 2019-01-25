package com.kaczurba.bootside.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BasicAuthentication {
	
	private String username;
	private String password;

	public String toString() {
		return username;
	}
	
}
