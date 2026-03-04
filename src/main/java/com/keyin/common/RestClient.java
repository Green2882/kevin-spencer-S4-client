package com.keyin.common;

import com.keyin.aircraft.Aircraft;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class RestClient {
    private String URLRoot;
    private HttpClient client;

    public String sendGetRequest() {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(URLRoot))
                .build();

        try {
            HttpResponse<String> response =
                    getClient().send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                System.out.println("Error Status Code: " + response.statusCode());
            }

            return response.body();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        return "";
    }

    public String getURLRoot() {
        return URLRoot;
    }

    public void setURLRoot(String URLRoot) {
        this.URLRoot = URLRoot;
    }

    public HttpClient getClient() {
        if (client == null) {
            client = HttpClient.newHttpClient();
        }

        return client;
    }
}