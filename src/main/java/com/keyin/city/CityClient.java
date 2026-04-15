package com.keyin.city;

import com.keyin.common.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

public class CityClient {

    private RestClient restClient;

    public List<City> getAllCities(){

        if(getRestClient() != null) {

            restClient.setURLRoot("http://54.197.148.236:8080/api/1.0.0/cities");

            String response = restClient.sendGetRequest();

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(response, new TypeReference<List<City>>() {
            });

        }
        return List.of();
    }

    public RestClient getRestClient() {
        return restClient;
    }

    public void setRestClient(RestClient restClient) {
        this.restClient = restClient;
    }


}
