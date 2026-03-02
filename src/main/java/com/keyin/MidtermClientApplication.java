package com.keyin;

import com.keyin.aircraft.Aircraft;
import com.keyin.aircraft.AircraftClient;
import com.keyin.airport.Airport;
import com.keyin.airport.AirportClient;
import com.keyin.common.RestClient;
import com.keyin.flight.Flight;
import com.keyin.flight.FlightClient;
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

        FlightClient flightClient = new FlightClient();
        flightClient.setRestClient(new RestClient());

        List<Airport> airports = airportClient.getAllAirports();

        System.out.println("\n1) What airports are there in each city?");

        Map<String, List<Airport>> airportsByCity = new LinkedHashMap<>();

        for (Airport airport : airports) {
            String cityKey = airport.getCity().getName() + ", " + airport.getCity().getState();
            airportsByCity.computeIfAbsent(cityKey, k -> new ArrayList<>()).add(airport);
        }

        for (Map.Entry<String, List<Airport>> entry : airportsByCity.entrySet()) {
            System.out.println(entry.getKey() + ":");
            for (Airport airport : entry.getValue()) {
                System.out.println(" - " + airport.getName() + " (" + airport.getCode() + ")");
            }
        }

    }
}