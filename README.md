
# Sweet Shop Management System

A full-stack web application for managing a sweet shop's inventory and sales. This system provides distinct interfaces for Administrators and Customers, enabling secure management of products and a seamless purchasing experience.

---

## 🚀 Tech Stack

### Backend
- **Java 17**
- **Spring Boot**
- **Spring Security & JWT**
- **Spring Data JPA / Hibernate**
- **MySQL**
- **Apache Maven**

### Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**

---

## ✨ Key Features

### For Administrators
- Secure login using role-based authentication (JWT)
- Add, update, and delete sweet products
- Restock sweets by updating stock quantity
- Upload and manage product images
- Dashboard to view all sweets and stock status

### For Customers
- User registration and login
- Browse sweets with images and prices
- Purchase sweets with real-time stock updates
- Fully responsive UI for all devices

---

## 📂 Project Structure

```bash
sweet-shop-management-system/
├── Sweetshop/                 # Spring Boot Backend
│   ├── src/main/java/         # Controllers, Services, Models
│   ├── src/main/resources/    # Configuration files
│   ├── uploads/               # Uploaded product images
│   ├── .env                   # Environment variables (ignored)
│   ├── .env.example           # Sample environment variables
│   └── pom.xml                # Maven configuration
│
├── sweet-shop/                # React Frontend
│   ├── src/                   # React components
│   ├── public/                # Static assets
│   ├── package.json           # NPM dependencies
│   └── tailwind.config.js     # Tailwind configuration
│
└── README.md                  # Project documentation
````

---

## 🛠️ Prerequisites

* Java Development Kit (JDK) 17 or higher
* Node.js (v14 or higher) and npm
* MySQL Server

---

## ⚙️ Environment Setup

### Database Setup

Create a MySQL database named `sweetshop`.

```sql
CREATE DATABASE sweetshop;
```

---

### Backend Configuration

1. Navigate to the `Sweetshop` directory.
2. Create a `.env` file based on `.env.example`.
3. Configure the following values:

```properties
SERVER_PORT=8080
DB_URL=jdbc:mysql://localhost:3306/sweetshop?useSSL=false&serverTimezone=UTC
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secure_random_secret_key
JWT_EXPIRATION=86400000
```

---

## 🚀 Running the Project

### Backend (Spring Boot)

```bash
./mvnw spring-boot:run
```

Or run `SweetshopApplication.java` from your IDE.

Backend runs at:

```
http://localhost:8080
```

---

### Frontend (React)

```bash
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Authentication

* `POST /auth/user/register`
* `POST /auth/user/login`
* `POST /auth/admin/register`
* `POST /auth/admin/login`

### User APIs

* `GET /user/sweets`
* `POST /user/purchase/{id}`

### Admin APIs (JWT Protected)

* `GET /admin/sweets`
* `POST /admin/sweets` (Multipart image upload)
* `PUT /admin/sweets/{id}`
* `DELETE /admin/sweets/{id}`

---

## 🔒 Security Overview

* JWT-based stateless authentication
* Password hashing using `BCryptPasswordEncoder`
* Role-based authorization (ADMIN / USER)
* CORS configured for frontend origin
* Sensitive data stored using environment variables

---

## 📝 Author

Developed by **Ananya Vanampally**.
This project was built for educational purposes to demonstrate full-stack development and secure coding practices.

```
