package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.Insurance;
import com.springboot.main.repository.InsuranceRepository;

@Service
public class InsuranceService {

	@Autowired
	private InsuranceRepository insuranceRepository;

	public Insurance insert(Insurance insurance) {
		return insuranceRepository.save(insurance);
	}
}
