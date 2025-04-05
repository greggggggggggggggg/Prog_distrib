import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Définir Card et CardContent dans ce fichier
const Card = ({ children }) => {
  return <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>{children}</div>;
};

const CardContent = ({ content }) => {
  return <div>{content}</div>;
};

// Définir le Button ici
const Button = ({ label, onClick }) => {
  return <button onClick={onClick} style={{ margin: "0.5rem" }}>{label}</button>;
};

const App = () => {
  const [panier, setPanier] = useState([]); // Le panier des produits
  const [message, setMessage] = useState(""); // L'état pour afficher le message de validation

  const [products, setProducts] = useState([
    { nom: "Pomme", prix: 1.2 },
    { nom: "Banane", prix: 0.8 },
    { nom: "Lait", prix: 0.99 },
    { nom: "Pain", prix: 1.5 },
    { nom: "Fromage", prix: 2.7 },
    { nom: "Œufs", prix: 2.0 },
    { nom: "Beurre", prix: 1.8 },
    { nom: "Tomate", prix: 1.1 },
    { nom: "Carotte", prix: 0.6 },
    { nom: "Riz", prix: 1.4 },
    { nom: "Pâtes", prix: 1.3 },
    { nom: "Poulet", prix: 5.5 },
    { nom: "Steak haché", prix: 4.8 },
    { nom: "Yaourt", prix: 0.9 },
    { nom: "Céréales", prix: 3.2 },
    { nom: "Jus d’orange", prix: 2.3 },
    { nom: "Eau minérale", prix: 0.5 },
    { nom: "Chocolat", prix: 1.9 },
    { nom: "Chips", prix: 1.6 },
    { nom: "Biscottes", prix: 1.2 }
  ]);

  const ajouterAuPanier = (produit) => {
    const existant = panier.find(p => p.nom === produit.nom);
    if (existant) {
      setPanier(
        panier.map(p =>
          p.nom === produit.nom ? { ...p, quantite: p.quantite + 1 } : p
        )
      );
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  };

  const retirerDuPanier = (produit) => {
    const existant = panier.find(p => p.nom === produit.nom);
    if (existant.quantite === 1) {
      setPanier(panier.filter(p => p.nom !== produit.nom));
    } else {
      setPanier(
        panier.map(p =>
          p.nom === produit.nom ? { ...p, quantite: p.quantite - 1 } : p
        )
      );
    }
  };

  const validerPanier = async () => {
    try {
      const response = await fetch("http://localhost:8080/supermarchéenligne/valider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panier),
      });

      if (response.ok) {
        const messageBackend = await response.text();
        setMessage(messageBackend); // Afficher le message reçu du backend
        setPanier([]); // Réinitialiser le panier
      } else {
        alert("Erreur lors de la validation du panier");
      }
    } catch (error) {
      console.error("Erreur lors de la validation du panier", error);
      alert("Erreur lors de la validation du panier");
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Bienvenue dans mon application</h1>

        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Page d'Accueil</Link>
            </li>
            <li>
              <Link to="/produits">Produits</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Page d'Accueil</h2>
                <p>Voici la page d'accueil de l'application !</p>
                {message && <h2>{message}</h2>} {/* Affiche le message de confirmation si disponible */}
              </div>
            }
          />
          <Route
            path="/produits"
            element={
              <div>
                <h2>Produits disponibles</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {products.map((prod, index) => (
                    <Card key={index}>
                      <CardContent content={`${prod.nom} - ${prod.prix.toFixed(2)} €`} />
                      <Button label="➕" onClick={() => ajouterAuPanier(prod)} />
                    </Card>
                  ))}
                </div>

                <h3>🛒 Panier</h3>
                {panier.length === 0 ? (
                  <p>Le panier est vide.</p>
                ) : (
                  <ul>
                    {panier.map((item, index) => (
                      <li key={index}>
                        {item.nom} x {item.quantite} = {(item.prix * item.quantite).toFixed(2)} €
                        <Button label="➖" onClick={() => retirerDuPanier(item)} />
                      </li>
                    ))}
                  </ul>
                )}

                {panier.length > 0 && (
                  <Button label="✅ Valider le panier" onClick={validerPanier} />
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



