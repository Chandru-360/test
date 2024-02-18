package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.ThematicFund;
import com.springboot.main.repository.ThematicFundRepository;

@Service
public class ThematicFundService {

	@Autowired
	private ThematicFundRepository thematicFundRepository;
	
	public ThematicFund insert(ThematicFund thematicFund) {
		return thematicFundRepository.save(thematicFund);
	}

}
