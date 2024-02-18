package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.SalesVp;
import com.springboot.main.repository.SalesVpRepository;

@Service
public class SalesVpService {

	@Autowired
	private SalesVpRepository salesVpRepository;
	
	public SalesVp insert(SalesVp salesVp) {
		  return salesVpRepository.save(salesVp);
		}

	public SalesVp getBysalesVpId(int sid) throws InvalidIdException {
		Optional<SalesVp> optional=salesVpRepository.findById(sid);
		if(!optional.isPresent())
			throw new InvalidIdException("SalesVp id Invalid");
		return optional.get();
	}
}
