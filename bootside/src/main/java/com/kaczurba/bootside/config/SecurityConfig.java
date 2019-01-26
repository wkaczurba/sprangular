package com.kaczurba.bootside.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import lombok.extern.slf4j.Slf4j;

/**
 * BasicAuthentication
 * 
 * @author kaczurwi
 *
 */
@Slf4j
@Configuration
@Order(1000)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		log.info("setting security...");
		
		http
			.csrf().disable()
			.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/api/firstbean").permitAll() // unrestricted resource.
				.anyRequest().authenticated()
				.and()
			.httpBasic();
	}
}
