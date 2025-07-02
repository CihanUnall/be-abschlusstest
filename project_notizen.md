        https://github.com/dci-fbw-wd-24-d07-a/be-abschlusstest

##### 1. package.json und İnstallation

        npm init -y
        npm i
        npm i express dotenv cors cookie-parser express-validator jsonwebtoken bcrypt mongoose
        npm install --save-dev nodemon

##### 2. .env

        PORT=5500
        MONGO_URI=mongodb://localhost:5500/
        JWT_SECRET=supersecretkey

##### 3 .Project Layout

        project-root/
        │
        ├── src/
        │   ├── controllers/
        │   │   ├── authController.js
        │   │   └── jobController.js
        │   │
        │   ├── models/
        │   │   ├── User.js
        │   │   └── Job.js
        │   │
        │   ├── routes/
        │   │   ├── authRoutes.js
        │   │   └── jobRoutes.js
        │   │
        │   ├── middleware/
        │   │   ├── authMiddleware.js
        │   │   └── validationMiddleware.js
        │   │
        │   ├── utils/
        │   │   └── validators.js
        │   │
        │   ├── config/
        │   │   └── db.js
        │   │
        │   └── app.js
        │
        ├── tests/
        │   └── .rest
        │
        ├── .env
        ├── app.js
        ├── package.json
        └── README.md

##### Aufgabe 1 -

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

##### Aufgabe 2 -

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

     3. Modell: Job

        Felder: title, description, companyId, appliedUsers, createdAt, techStack usw.

     4. Beziehungen

        appliedUsers enthält ObjectId-Referenzen auf User

        populate('appliedUsers', 'fullname email') um User-Daten anzuzeigen

     4. Tests

        .rest Datei erstellen
