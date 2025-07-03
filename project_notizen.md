##### 1. package.json und İnstallation

        npm init -y
        npm i
        npm i express dotenv cors cookie-parser express-validator jsonwebtoken bcrypt mongoose
        npm install --save-dev nodemon
        npm run dev

(
Wenn eine Fehlermeldung auftritt, prüfen Sie, ob die Portnummer irgendwo anders im Hintergrund ausgeführt wird, und schließen Sie sie.

        sudo lsof -i :5500
        sudo kill -9 420652

)

##### 2. .env

        PORT=5500
        MONGO_URI=mongodb://localhost:5500/
        JWT_SECRET=supersecretkey

##### 3 .Project Layout

        project-root/
        │
        ├── src/
        │   ├── controllers/
        │   │   ├── jobController.js
        │   │   └── userJobController.js
        │   │
        │   ├── models/
        │   │   └── Job.js
        │   │
        │   ├── routes/
        │   │   ├── userJobRoutes.js
        │   │   └── jobRoutes.js
        │   │
        │   ├── middleware/
        │   │   └── validationMiddleware.js
        │   │
        │   ├── utils/
        │   │   └── validators.js
        │   │
        │   ├── libs/
        │   │   └── db.js
        │   │
        │   └── app.js
        │
        ├── tests/
        │   └── company.rest
        │   └── user.rest
        │
        ├── .env
        ├── index.html
        ├── app.js
        ├── package.json
        └── README.md

##### Aufgabe 1 - Meli

> Benutzerverwaltung + Authentifizierung

     1. Registrierung

        Registrierung mit den Rollen applicant oder company

        E-Mail muss eindeutig sein

        Passwort-Validierung (mind. 10 Zeichen, Groß-/Kleinbuchstaben, Sonderzeichen)

        Passwort-Hashing mit bcrypt

        Datenvalidierung (z. B. fullname/companyName Länge)

     2. Login

        Login mit E-Mail und Passwort

        JWT-Token generieren

        Token als httpOnly-Cookie senden

        Session darf max. 12 Stunden gültig sein

     3. Middleware

        JWT-Überprüfung (authMiddleware.js)

        Rollenbasierte Zugriffskontrolle

        (Optional) Eingabevalidierung als Middleware

     4. Modell: User

        Felder: role, email, password, fullname, companyName, contactPerson

     5. Tests

       .rest Datei testen

##### Aufgabe 2 - Cihan

> Stellenanzeigen + Bewerbungen

     1. Für Unternehmen (Company)

        addJob: Neue Stellenanzeige erstellen

        updateJob: Eigene Anzeige bearbeiten

        deleteJob: Eigene Anzeige löschen

        showJobs: Alle Anzeigen inkl. Bewerber anzeigen

     2. Für Bewerber (Applicant)

        loadAll: Alle offenen Stellenanzeigen anzeigen

        loadFiltered: Anzeigen mit „react“ im Titel filtern

        apply: Sich auf eine Anzeige bewerben (UserID wird gespeichert)

     3. Tests

        .rest Datei erstellen
