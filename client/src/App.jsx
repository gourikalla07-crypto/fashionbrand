import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AddProduct from './pages/Admin/AddProduct';
import ScrollToTop from './components/ScrollToTop';
import PromotionBanner from './components/PromotionBanner';
import AIStylistWidget from './components/AIStylistWidget';
import NewsletterModal from './components/NewsletterModal';


function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <PromotionBanner />
        <NewsletterModal />
        <AIStylistWidget />
        <div className="min-h-screen flex flex-col font-inter">
          <Routes>
            {/* Storefront Routes (with Navbar & Footer) */}
            <Route path="/" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Home />
                </main>
                <Footer />
              </>
            } />
            <Route path="/shop" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Shop />
                </main>
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <ProductDetails />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Cart />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Checkout />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/wishlist" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Wishlist />
                </main>
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Login />
                </main>
                <Footer />
              </>
            } />
            <Route path="/signup" element={
              <>
                <Navbar />
                <main className="flex-grow pt-10">
                  <Signup />
                </main>
                <Footer />
              </>
            } />
            <Route path="/success" element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <Success />
                </main>
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="orders" element={<div className="p-20 text-center font-black dark:text-white text-3xl">ORDERS MANAGEMENT COMING SOON</div>} />
              <Route path="users" element={<div className="p-20 text-center font-black dark:text-white text-3xl">USER MANAGEMENT COMING SOON</div>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
