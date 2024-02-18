package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Investor;
import com.springboot.main.repository.InvestorRepository;

@Service
public class InvestorService {

	@Autowired
	private InvestorRepository investorRepository;
	
	public Investor insert(Investor investor) {
	  return investorRepository.save(investor);
	}

	public Investor saveInvestor(Investor investor) {
		return investorRepository.save(investor);
	}
	
	public Investor getByInvestorId(int iid) throws InvalidIdException {
		Optional<Investor> optional=investorRepository.findById(iid);
		if(!optional.isPresent())
			throw new InvalidIdException("Investor id Invalid");
		return optional.get();
	}

}
