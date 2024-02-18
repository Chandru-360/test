package com.springboot.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.model.InvestorMutualFund;
import com.springboot.main.repository.InvestorMutualFundRepository;

@Service
public class InvestorMutualFundService {

	@Autowired
	InvestorMutualFundRepository investorMutualFundRepository;
	
	public InvestorMutualFund insert(InvestorMutualFund investorMutualFund) {
		return investorMutualFundRepository.save(investorMutualFund);
	}

}
