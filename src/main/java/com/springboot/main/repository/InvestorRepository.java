package com.springboot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.main.model.Investor;

public interface InvestorRepository extends JpaRepository<Investor, Integer>{

}
