package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Insurance;

public interface InsuranceRepository extends JpaRepository<Insurance, Integer>{
	
	

}
