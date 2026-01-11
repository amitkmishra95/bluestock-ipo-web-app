package com.example.stockbackend.controller;


import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.stockbackend.model.Company;
import com.example.stockbackend.service.CompanyExcelService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CompanyController {
	
	private static final String API_KEY = "ghfkffu6378382826hhdjgk";

    @GetMapping("company")
    public String getCompany(@RequestParam String id) {

        String url =
            "https://bluemutualfund.in/server/api/company.php?id="
            + id + "&api_key=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
    
    private final CompanyExcelService excelService;

    public CompanyController(CompanyExcelService excelService) {
        this.excelService = excelService;
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return excelService.getCompanies();
    }

}
