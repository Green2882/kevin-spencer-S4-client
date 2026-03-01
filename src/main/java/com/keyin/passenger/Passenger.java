package com.keyin.passenger;

import com.keyin.aircraft.Aircraft;
import com.keyin.city.City;
import java.util.HashSet;
import java.util.Set;

public class Passenger {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private City city;
    private Set<Aircraft> aircraft = new HashSet<>();

    public Passenger(String firstName, String lastName, String phoneNum) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNum = phoneNum;
    }

    public Passenger() {}

    public long getId() { return id; }

    public void setId(long id) { this.id = id; }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<Aircraft> getAircraft() {
        return aircraft;
    }

    public void setAircraft(Set<Aircraft> aircraft) {
        this.aircraft = aircraft;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                '}';
    }
}