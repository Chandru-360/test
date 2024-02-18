package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.MutualFund;
import com.springboot.main.repository.MutualFundRepository;

@Service
public class MutualFundService {
	@Autowired
	MutualFundRepository mutualFundRepository;

	public MutualFund insert(MutualFund mutualFund) {
		return mutualFundRepository.save(mutualFund);
	}


	public MutualFund getByid(int mfid) throws InvalidIdException {
		Optional<MutualFund> optional = mutualFundRepository.findById(mfid);
		if (!optional.isPresent())
			throw new InvalidIdException("MutualFund id Invalid");
		return optional.get();
	}
}
