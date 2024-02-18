package com.springboot.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Investor;
import com.springboot.main.model.InvestorMutualFund;
import com.springboot.main.model.MutualFund;
import com.springboot.main.service.InvestorMutualFundService;
import com.springboot.main.service.InvestorService;
import com.springboot.main.service.MutualFundService;

@RestController
public class InvestorMutualFundController {
	@Autowired
	InvestorService investorService;

	@Autowired
	MutualFundService mutualFundService;

	@Autowired
	InvestorMutualFundService investorMutualFundService;
	
	@PostMapping("/mutualfund/add/{iid}/{mfid}")
	public ResponseEntity<?> mutualfund(@PathVariable("iid") int iid, @PathVariable("mfid") int mfid,
			@RequestBody InvestorMutualFund investorMutualFund) {
		try {
			Investor investor = investorService.getByInvestorId(iid);
			MutualFund mutualFund = mutualFundService.getByid(mfid);
			investorMutualFund.setInvestor(investor);
			investorMutualFund.setMutualFund(mutualFund);
			investorMutualFund = investorMutualFundService.insert(investorMutualFund);
			return ResponseEntity.ok().body(investorMutualFund);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

}
