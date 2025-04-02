package com.monsupermarche.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/products")
public class ProductController {
    private List<String> products = new ArrayList<>(List.of("Pomme", "Banane", "Lait"));

    @GetMapping
    public List<String> getProducts() {
        return products;
    }

    @PostMapping("/{product}")
    public String addProduct(@PathVariable String product) {
        products.add(product);
        return product + " ajouté au supermarché !";
    }
}
