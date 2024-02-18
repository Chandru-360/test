package com.springboot.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Company;
import com.springboot.main.model.Insurance;
import com.springboot.main.service.CompanyService;
import com.springboot.main.service.InsuranceService;

@RestController
@RequestMapping("/insurance")
public class InsuranceController {

	@Autowired
	private InsuranceService insuranceService;
	
	@Autowired
	private CompanyService companyService;
	
	@PostMapping("/add/{cid}")
	public ResponseEntity<?> insertInsurance(@PathVariable ("cid") int cid,@RequestBody Insurance insurance) {
			try {
				
				Company company = companyService.getCompanyById(cid);
				insurance.setCompany(company);
				Insurance savedInsurance = insuranceService.insert(insurance);
				return ResponseEntity.ok().body(savedInsurance);
			}
			catch(InvalidIdException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
	}
}
