# Online Medical System - Spring Boot Backend

This is the fully functioning Spring Boot backend for the Online Medical System using MySQL database and JWT authentication.

## Render Deployment Instructions

To deploy this application to Render along with an Aiven MySQL database:

### 1. Set up Aiven MySQL database
1. Go to your [Aiven Console](https://console.aiven.io/).
2. Create a new MySQL service.
3. Get your connection details: Host, Port, User, Password, and Database Name.
4. Construct your JDBC connection string using those details: `jdbc:mysql://<host>:<port>/<dbname>?sslMode=REQUIRED`

### 2. Set up Render Web Service
1. Create a new "Web Service" on [Render](https://render.com/).
2. Connect your Git repository containing this code.
3. Keep the environment as `Docker` (Render will automatically detect the provided `Dockerfile`).
4. Under "Environment Variables", add the following variables:
   - `DB_URL`: The JDBC connection string you formed from Aiven (e.g. `jdbc:mysql://<your_aiven_host>.aivencloud.com:21345/defaultdb?sslMode=REQUIRED`).
   - `DB_USER`: Your Aiven MySQL user (e.g., `avnadmin`).
   - `DB_PASSWORD`: Your Aiven MySQL password.
   - `JWT_SECRET`: A very long, random string to sign JWT tokens (e.g. `9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9`).
   - `JWT_EXPIRATION_MS`: Token expiration time in milliseconds (e.g. `86400000` for 24 hours).
5. Click "Create Web Service". Render will use the Dockerfile to compile the Java application and deploy it!

## Features included
- **Spring Security (JWT Authentication)**: Secures all endpoints.
- **MySQL Integration**: Configured in `application.properties`.
- **Entities Setup**: User, Appointment, Prescription models mapping to tables.
- **Auto Data Initializer**: Inserts default users (`admin@medical.com`, `doctor@medical.com`, etc.) automatically when the backend starts, allowing immediate login.

## Test locally
If you have Maven (`mvn`) and Java 17 installed:
```bash
mvn spring-boot:run
```
Make sure you have a local MySQL database named `oms_db` running before testing locally or modify `application.properties` to connect to Aiven locally!
