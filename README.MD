# FILE BASED USER MANAGEMENT SYATEM

**Description:**
A Node.js and Express-based project demonstrating MVC architecture with controllers, services, and file handling. Supports reading/writing user data to `user.txt` and provides REST API endpoints.

---

## 📂 Project Structure

```
project/
├── src/
│   ├── controllers/     # Handles HTTP requests and responses
│   ├── dto/             # Handles data tranfers
│   ├── entity/          # Sequelize models or entity definitions
│.  ├── errorHandler/    # Custom error handling middleware
│.  ├── i18n/            # Internationalization and localization files
│   ├── repositories/    # Database access layer (CRUD operations)
│   ├── services/        # Business logic
│   ├── models/          # Data models (if using DB)
│   ├── routes/          # API routes
│   ├── config/          # Utilities and setup (e.g., fileHandler)
|   |     ├── data       # Stores user.txt
│   └── index.js           # Main application entry
├── package.json
└── README.md
```

---

## ⚡ Features

* MVC architecture
* Express.js routing
* Services layer for business logic
* File handling for user data (`user.txt`)
* Crud operation

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project
```

2. Install dependencies:

```bash
npm install
```

3. Start the server (development mode with nodemon):

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| GET    | `/api/user` | Get user data          |
| POST   | `/api/user` | Create/save a new user |

Example request body for POST `/api/user`:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 🛠 Utilities

* **FileHandler**: Reads and writes data to `user.txt` (`src/config/fileHandler.js`)
* **Controllers**: Handle HTTP requests (`src/controllers/`)
* **Services**: Contain business logic (`src/services/`)

---

## 💡 Notes

* Uses **Express.js** for server and routing.
* Follows MVC + Service layer pattern for clean code organization.
* Easily replace `user.txt` with a database in the future without changing controllers.

---

## 📌 Scripts

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

---
