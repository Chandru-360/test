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
import com.springboot.main.model.ThematicFund;
import com.springboot.main.service.CompanyService;
import com.springboot.main.service.ThematicFundService;

@RestController
@RequestMapping("/thematic")
public class ThematicFundController {

	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private ThematicFundService thematicFundService;
	 
	@PostMapping("/add/{cid}")
	public ResponseEntity<?> insertThematicFund(@PathVariable ("cid") int cid,@RequestBody ThematicFund thematicFund) {
			try {
				
				Company company = companyService.getCompanyById(cid);
				thematicFund.setCompany(company);
				ThematicFund savedThematicFund = thematicFundService.insert(thematicFund);
				return ResponseEntity.ok().body(savedThematicFund);
			}
			catch(InvalidIdException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
	}
}
