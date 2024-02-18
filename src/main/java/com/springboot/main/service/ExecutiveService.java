package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Executive;
import com.springboot.main.repository.ExecutiveRepository;


@Service
public class ExecutiveService {
	@Autowired
	ExecutiveRepository executiveRepository;
	
	public Executive insert(Executive executive) {
		return executiveRepository.save(executive);
	}


	public Executive getByExecutiveId(int eid) throws InvalidIdException {
		Optional<Executive> optional=executiveRepository.findById(eid);
		if(!optional.isPresent())
			throw new InvalidIdException("Executive id Invalid");
		return optional.get();
	}

}
