package org.example;

public class App {
    public String getGreeting() {
        return "Bienvenue dans mon supermarché en ligne !";
    }

    public static void main(String[] args) {
        System.out.println(new App().getGreeting());
    }
}