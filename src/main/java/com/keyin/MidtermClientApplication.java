package com.keyin;

import com.keyin.aircraft.Aircraft;
import com.keyin.aircraft.AircraftClient;
import com.keyin.airport.Airport;
import com.keyin.airport.AirportClient;
import com.keyin.common.RestClient;
import com.keyin.passenger.Passenger;
import com.keyin.passenger.PassengerClient;

import java.util.*;

public class MidtermClientApplication {

    public static void main(String[] args) throws Exception {

        RestClient restClient = new RestClient();

        AirportClient airportClient = new AirportClient();
        airportClient.setRestClient(restClient);

        PassengerClient passengerClient = new PassengerClient();
        passengerClient.setRestClient(restClient);

        AircraftClient aircraftClient = new AircraftClient();
        aircraftClient.setRestClient(restClient);

    }
}