package org.example;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/supermarchéenligne")
public class ProductController {
    private List<String> products = new ArrayList<>(List.of("Pomme", "Banane", "Lait"));

    @GetMapping
    public List<String> getProducts() {
        return products;
    }

    public String getNom() {
        return "supermarchéenligne";
    }

    @PostMapping("/{product}")
    public String addProduct(@PathVariable String product) {
        products.add(product);
        return product + " ajouté au supermarché !";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/valider")
    public String validerPanier(@RequestBody List<String> panier) {
        // Traitement du panier
        if (panier == null || panier.isEmpty()) {
            return "Votre panier est vide.";
        }
        
        // Simulation d'un traitement du panier
        String message = "Merci de votre achat ! Vous avez acheté : ";
        message += String.join(", ", panier);
        
        return message; // Retourne la liste des produits achetés
    }

}
