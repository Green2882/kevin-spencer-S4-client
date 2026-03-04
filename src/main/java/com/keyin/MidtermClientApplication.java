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

        System.out.println("\n2) What aircraft has each passenger flown on?");

        List<Flight> flights = flightClient.getAllFlights();

        Map<String, Set<String>> aircraftByPassenger = new LinkedHashMap<>();

        for (Flight flight : flights) {
            String aircraftLabel = flight.getAircraft().getType() + " - " + flight.getAircraft().getAirlineName();

            for (Passenger passenger : flight.getPassengers()) {
                String passengerKey = passenger.getFirstName() + " " + passenger.getLastName();
                aircraftByPassenger.computeIfAbsent(passengerKey, k -> new LinkedHashSet<>()).add(aircraftLabel);
            }
        }

        for (Map.Entry<String, Set<String>> entry : aircraftByPassenger.entrySet()) {
            System.out.println(entry.getKey() + ":");
            for (String aircraftLabel : entry.getValue()) {
                System.out.println(" - " + aircraftLabel);
            }
        }

        System.out.println("\n3) What airports do aircraft take off from and land at?");

        flights = flightClient.getAllFlights();

        for (Flight flight : flights) {
            System.out.println("Aircraft " + flight.getAircraft().getId() + " takes off from " + flight.getOriginAirport().getName() + " and lands at " + flight.getDestinationAirport().getName());
        }

        System.out.println("\n4) What airports have passengers used?");

        flights = flightClient.getAllFlights();

        Map<String, Set<String>> airportsByPassenger = new LinkedHashMap<>();

        for (Flight flight : flights) {

            String origin = flight.getOriginAirport().getName() +
                    " (" + flight.getOriginAirport().getCode() + ")";

            String destination = flight.getDestinationAirport().getName() +
                    " (" + flight.getDestinationAirport().getCode() + ")";

            for (Passenger passenger : flight.getPassengers()) {

                String passengerKey =
                        passenger.getFirstName() + " " + passenger.getLastName();

                airportsByPassenger
                        .computeIfAbsent(passengerKey, k -> new LinkedHashSet<>())
                        .add(origin);

                airportsByPassenger
                        .computeIfAbsent(passengerKey, k -> new LinkedHashSet<>())
                        .add(destination);
            }
        }

        for (Map.Entry<String, Set<String>> entry : airportsByPassenger.entrySet()) {
            System.out.println(entry.getKey() + ":");
            for (String airport : entry.getValue()) {
                System.out.println(" - " + airport);
            }
        }
    }
}
