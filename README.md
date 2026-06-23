# ⚓ Smart Dashboard UI

A professional **React + Vite dashboard interface** with a modern login/signup system, protected dashboard routing, sidebar navigation, profile section, logout functionality, and API-based authentication flow.

This project is designed as a clean frontend dashboard UI for managing and viewing different naval/defense unit categories such as tanks, APCs, submarines, sea drones, and warships.

---

## 📌 Project Overview

**Smart Dashboard UI** is a frontend web application built using **React**. It contains a complete user interface flow starting from login/signup and moving into a secure dashboard after authentication.

The project focuses on:

- Clean and professional UI design
- Authentication-based navigation
- Protected dashboard access
- Sidebar menu with expandable categories
- Organized React component structure
- API integration using Axios
- Modern dark dashboard theme

---

## ✨ Key Features

### 🔐 Login & Signup UI

- Beautiful login and signup form design
- Smooth sliding tab animation between Login and Signup
- Email and password input validation
- Confirm password validation in signup form
- Error highlighting for empty or incorrect fields
- Pakistan-themed header with flag asset

### 🛡️ Authentication Flow

- Login request handled through Axios
- Signup request handled through Axios
- JWT/access token stored in `localStorage`
- Username stored in `localStorage`
- User redirected to dashboard after successful login
- Dashboard protected from direct access without token

### 📊 Dashboard Interface

- Professional dark command-center style dashboard
- Fixed sidebar navigation
- Expandable menu categories
- Active menu item highlighting
- Breadcrumb navigation
- Dashboard home cards
- Unit detail cards
- Loading state for secure data

### 🧭 Sidebar Categories

The dashboard includes expandable categories for:

- Tanks
- APCS
- Submarine
- Sea Drone
- Warships

Each category contains multiple sub-units, and clicking a sub-unit opens its detail page.

### 👤 Profile & Session

- Profile page shows current logged-in user
- Logout clears local storage
- User is redirected back to login after logout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| Vite | Fast development and build tool |
| React Router DOM | Page routing and navigation |
| Axios | API requests |
| CSS3 | Custom styling and layout |
| Google Fonts | Professional typography |
| LocalStorage | Token and username storage |

---

## 📂 Project Structure

```bash
Smart-Dashboard-UI-main/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── Flag_of_Pakistan.svg
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── App.jsx
│   ├── LoginSignup.jsx
│   ├── LoginSignup.css
│   ├── NavyDashboard.jsx
│   ├── NavyDashboard.css
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/danishkhan136/Smart-Dashboard-UI.git
```

### 2. Move into the Project Folder

```bash
cd Smart-Dashboard-UI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

Vite will show a local URL like:

```bash
http://localhost:5173
```

Open it in your browser.

---

## 🔗 API Configuration

This frontend is connected with a backend API using Axios.

Current API base URL:

```js
http://127.0.0.1:8000
```

The project currently expects these backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Login user and receive access token |
| POST | `/auth/signup` | Create a new user account |
| GET | `/units` | Fetch unit data for dashboard |

### Important Note

This repository contains the **frontend UI**. To use login, signup, and live unit data properly, a backend server should be running on:

```bash
http://127.0.0.1:8000
```

Without the backend, the UI will still load, but login/signup API actions will not complete successfully.

---

## 🧩 Main Components

### `LoginSignup.jsx`

Handles the authentication UI and form logic.

Main responsibilities:

- Login form
- Signup form
- Form validation
- Axios login/signup requests
- Token storage
- Navigation to dashboard

### `NavyDashboard.jsx`

Handles the main dashboard layout and dashboard logic.

Main responsibilities:

- Protected dashboard access
- Sidebar navigation
- Expandable unit categories
- Unit detail pages
- Profile view
- Logout functionality
- Fetching unit data from API

### `App.jsx`

Handles application routes.

```jsx
<Route path="/" element={<LoginSignup />} />
<Route path="/dashboard" element={<NavyDashboard />} />
<Route path="*" element={<Navigate to="/" />} />
```

---

## 🎨 UI Design Highlights

- Dark navy dashboard theme
- Cyan accent color for active items
- Smooth sidebar dropdown animation
- Clean card-based layout
- Professional fonts using Google Fonts
- Login/signup form with modern gradient buttons
- Military/command-center inspired visual style

---

## 📦 Available Scripts

In the project directory, you can run:

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

---

## 🌱 Learning Outcomes

Through this project, I practiced:

- React component-based development
- React Router page navigation
- Form handling in React
- State management using `useState`
- Side effects using `useEffect`
- API requests using Axios
- Token handling with localStorage
- Protected route logic
- Dashboard layout design
- Custom CSS styling
- Professional project folder structure

---

## 🔮 Future Improvements

Possible future improvements for this project:

- Add complete backend integration
- Add role-based dashboard access
- Improve security page functionality
- Add real-time unit status updates
- Add charts and analytics cards
- Add search and filter options
- Add mobile responsive sidebar menu
- Add dark/light theme toggle
- Add user profile editing
- Add forgot password functionality

---

## 👨‍💻 Author

**Danish Khan**  
Software Engineering 
Frontend / MERN Stack Developer

GitHub: [@danishkhan136](https://github.com/danishkhan136)

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub.

---

## 📄 License

This project is open for learning and portfolio purposes. You can add a specific license such as MIT if needed.

---

### Made with dedication by Danish Khan

