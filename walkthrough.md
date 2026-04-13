# 🧥 GK FASHION WORLD - Project Walkthrough

Welcome to the **GK FASHION WORLD** codebase! This is a production-ready, feature-rich fashion eCommerce platform designed with a focus on premium aesthetics and smooth user experience.

## 🏗️ Architecture & Structure

The project is split into two main sections:
- **`client/`**: React + Vite + Tailwind CSS frontend.
- **`server/`**: Node.js + Express backend.

### Project Breakdown:
```text
fashionbrand/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Hero, ProductCard, etc.)
│   │   ├── context/        # State Management (ShopContext)
│   │   ├── data/           # Mock Product Data
│   │   ├── pages/          # Full Page Views
│   │   ├── App.jsx         # Main Router & Provider
│   │   └── index.css       # Global Premium Styling
├── server/                 # Express Backend
│   ├── index.js            # Main Server File
│   └── .env.example        # Environment Variable Template
└── deployment_guide.md     # How to go live
```

## ✨ Key Features

1.  **Premium UI/UX**:
    - **Dual Theme**: Integrated Light and Dark modes with smooth transitions.
    - **Responsive Design**: Mobile-first approach with a dedicated sticky bottom navigation for mobile users.
    - **Micro-animations**: Powered by `framer-motion` for a fluid, high-end feel.
    
2.  **Dynamic eCommerce Logic**:
    - **Cart System**: Real-time quantity updates and total calculation via Context API.
    - **Wishlist**: Persistence-ready wishlist system.
    - **Recently Viewed**: Automatically track and display recently viewed products.
    - **Searching & Filtering**: Functional search bar and category/price filters on the Shop page.

3.  **Realistic Fashion Data**:
    - Curated products across 5 categories: Streetwear, Formal Wear, Women's Fashion, Ethnic Wear (Indian), and Footwear.
    - High-quality imagery from Unsplash and realistic naming conventions.

4.  **Seamless Checkout**:
    - Multi-step checkout simulation with form validation and success feedback.

## 🚀 Getting Started Locally

### 1. Start the Backend
```bash
cd server
npm install
npm run dev # (Uses nodemon for auto-restart)
```

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide React (Icons), Framer Motion (Animations).
- **Backend**: Node.js, Express, Cors, Dotenv.
- **Database**: Structure is ready for MongoDB / Supabase integration.

---

**GK FASHION WORLD** - *Wear Your Style, Own Your Confidence.*
