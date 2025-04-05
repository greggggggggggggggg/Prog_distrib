# Utiliser l’image de base OpenJDK
FROM openjdk:17

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers
COPY build/libs/mon-supermarche-1.0.0.jar app.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour exécuter l’application
ENTRYPOINT ["java", "-jar", "app.jar"]