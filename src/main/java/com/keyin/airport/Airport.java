package com.keyin.airport;

import com.keyin.city.City;

public class Airport {
    private Long id;
    private City city;
    private String name;
    private String code;

    public Airport(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public Airport() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "Airport{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
