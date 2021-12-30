package com.example.dashboard;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.stream.Collectors;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/predicted_values")
public class DashboardResource {

    private final DashboardRepository repository;
    private final DashboardModelAssembler assembler;

    public DashboardResource(DashboardRepository repository,DashboardModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
        
    }

    
    @GetMapping("/")
    public CollectionModel<EntityModel<Dashboard>> getAllPredictedData() {
        List<EntityModel<Dashboard>> predicted_values = repository.findAll().stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(predicted_values, linkTo(methodOn(DashboardResource.class).getAllPredictedData()).withSelfRel());
    }

    @GetMapping("/fromDate/{from}/toDate/{to}")
    public CollectionModel<EntityModel<Dashboard>> getPredictedDataFromTo(@PathVariable("from") String from,@PathVariable("to") String to) {
        String from_date = from.substring(from.length() - 2);
        String end_date = to.substring(to.length() - 2);

       // int difference_date = (int)end_date - (int)from_date;
        int start_date = Integer.parseInt(from_date);
        System.out.println("from date is "+ start_date);

        int to_date = Integer.parseInt(end_date);
        System.out.println("end date is "+ to_date);
        int i =0;

        List<EntityModel<Dashboard>> final_list = new ArrayList<>(); 

        while(start_date + i <= to_date){

            String date_to_search = String.valueOf(start_date + i);
            // int date_to_search2 = Integer.parseInt(from.substring(0,from.length()-2)+date_to_search );

            
            System.out.println("inside while loop");
            //System.out.println(date_to_search2);
            //String date_to_search2 = date_to_search + from.substring(2,);
          List<EntityModel<Dashboard>> predicted_values = repository.findDataByDate(String.valueOf(from.substring(0,from.length()-2)+date_to_search)).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

            System.out.println(predicted_values);
           final_list.addAll(predicted_values);

           i++;

        }
        System.out.println("final list is "+ final_list);
        return CollectionModel.of(final_list, linkTo(methodOn(DashboardResource.class).getPredictedDataFromTo(from,to)).withSelfRel());
        
        // List<Dashboard> predicted_values = repository.findDataByDate(from).stream()
        //     .map(assembler::toModel)
        //     .collect(Collectors.toList());
                  

        //     .map(assembler::toModel)
        //     .collect(Collectors.toList());

        //  System.out.println(predicted_values);

        // return CollectionModel.of(predicted_values, linkTo(methodOn(DashboardResource.class).getAllPredictedData()).withSelfRel());
    }

    
}
