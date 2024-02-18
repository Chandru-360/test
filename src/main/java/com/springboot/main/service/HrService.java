package com.springboot.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Hr;
import com.springboot.main.repository.HrRepository;

@Service
public class HrService {
	
	@Autowired
	private HrRepository hrRepository;

	public Hr insert(Hr hr) {
		return hrRepository.save(hr);
	}
  
	public Hr getByHrId(int hid) throws InvalidIdException {
		Optional<Hr> optional=hrRepository.findById(hid);
		if(!optional.isPresent())
			throw new InvalidIdException("HR id Invalid");
		return optional.get();
	}
}
