package com.springboot.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.springboot.main.service.UserService;



@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {//ioc inversion of controll  give the source code i am override

	@Autowired
	private UserService userService;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(getProvider());
	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.authorizeRequests()
		.antMatchers(HttpMethod.GET,"/user/login","/executive/getone/{uid").authenticated()
		.antMatchers("/executive/add","/thematic/add/{cid}","/insurance/add/{cid}","/mutualfund/add/{iid}/{mfid}").permitAll()
		.antMatchers("/company/add","company/getone/{cid}").permitAll()
		.antMatchers("/executive/getone/{uid}").permitAll()
		.antMatchers("/investor/add","/investor/getone/{iid}").permitAll()
		.antMatchers("/hr/add","/hr/getone/{hid}").permitAll()
		.antMatchers("/salesvp/add","/salesvp/getone/{sid}").permitAll()
		.antMatchers("/mutualfund/add/{cid}").permitAll()
		.anyRequest().authenticated()
		.and().httpBasic()
		.and()
		.csrf().disable()
		.cors().disable();
	}
	
	@Bean
	public PasswordEncoder getEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	public DaoAuthenticationProvider getProvider() {
		DaoAuthenticationProvider dao=new DaoAuthenticationProvider();
		//to tell the spring that the password is encrypted
		dao.setPasswordEncoder(getEncoder());
		//go to db and fetch users
		dao.setUserDetailsService(userService);//UserDetailsService:UserService
		
		return dao;
	}
}
