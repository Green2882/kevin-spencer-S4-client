package com.keyin;

import java.util.Scanner;

public class MidtermClientApplication {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean exit = false;

        while (!exit) {
            System.out.println("\nPlease choose an option:");
            System.out.println("1. What airports are there in each city?");
            System.out.println("2. What aircraft has each passenger flown on?");
            System.out.println("3. What airports do aircraft take off from and land at?");
            System.out.println("4. What airports have passengers used?");
            System.out.println("5. Exit");

            int choice = input.nextInt();
            input.nextLine();

            switch (choice) {
                case 1:
                    // Placeholder for question 1
                    System.out.println("Answer to question 1 will be here.");
                    break;
                case 2:
                    // Placeholder for question 2
                    System.out.println("Answer to question 2 will be here.");
                    break;
                case 3:
                    // Placeholder for question 3
                    System.out.println("Answer to question 3 will be here.");
                    break;
                case 4:
                    // Placeholder for question 4
                    System.out.println("Answer to question 4 will be here.");
                    break;
                case 5:
                    exit = true;
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
        input.close();
    }
}