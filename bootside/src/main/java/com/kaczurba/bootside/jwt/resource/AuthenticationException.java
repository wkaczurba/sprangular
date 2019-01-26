package com.kaczurba.bootside.jwt.resource;

public class AuthenticationException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2151576241442962662L;

	public AuthenticationException(String message, Throwable cause) {
		super(message, cause);
	}
}
