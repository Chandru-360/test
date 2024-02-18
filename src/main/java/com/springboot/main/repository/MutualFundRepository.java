package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.MutualFund;

public interface MutualFundRepository extends JpaRepository<MutualFund, Integer> {


}
