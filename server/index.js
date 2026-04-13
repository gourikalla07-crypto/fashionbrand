const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51P...');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Product Data (Synchronized with Frontend)
const products = [
  {
    id: 1,
    name: "Urban Midnight Black Oversized Hoodie",
    category: "Streetwear",
    price: 49.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop",
    description: "Premium heavy-weight cotton oversized hoodie in a sleek midnight black. Perfect for everyday street style comfort.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    tags: ["New", "Bestseller"]
  },
  {
    id: 2,
    name: "Cyber Graffiti Graphic T-Shirt",
    category: "Streetwear",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop",
    description: "Breathable cotton tee featuring a high-definition cyber-punk inspired graffiti print.",
    sizes: ["M", "L", "XL"],
    rating: 4.5,
    reviews: 89,
    tags: ["Street"]
  },
  {
    id: 3,
    name: "Tactical Obsidian Cargo Pants",
    category: "Streetwear",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000&auto=format&fit=crop",
    description: "Multi-pocket tactical design with adjustable cuffs for a true streetwear silhouette.",
    sizes: ["30", "32", "34", "36"],
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: "Executive Charcoal Slim-Fit Blazer",
    category: "Formal Wear",
    price: 129.99,
    oldPrice: 199.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop",
    description: "Tailored charcoal gray blazer made from premium wool blend. Ideal for corporate and formal events.",
    sizes: ["38", "40", "42", "44"],
    rating: 4.9,
    reviews: 210,
    tags: ["Premium"]
  },
  {
    id: 5,
    name: "Arctic Silk Crisp White Shirt",
    category: "Formal Wear",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=2000&auto=format&fit=crop",
    description: "Ultra-fine cotton shirt with a wrinkle-free finish and modern slim-fit cut.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 145
  },
  {
    id: 6,
    name: "Ethereal Floral Summer Silk Dress",
    category: "Women's Fashion",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2000&auto=format&fit=crop",
    description: "Flowing mid-length dress with a delicate floral pattern and adjustable waist tie.",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 78,
    tags: ["Trending"]
  },
  {
    id: 7,
    name: "Luxe Ribbed Knit Crop Top",
    category: "Women's Fashion",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    description: "Soft ribbed fabric crop top in a versatile beige tone. Great for layering.",
    sizes: ["S", "M", "L"],
    rating: 4.4,
    reviews: 112
  },
  {
    id: 8,
    name: "Kashmiri Hand-Embroidered Silk Saree",
    category: "Ethnic Wear",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop",
    description: "Lush silk saree featuring intricate hand-done embroidery from the valley of Kashmir.",
    sizes: ["Free Size"],
    rating: 5.0,
    reviews: 45,
    tags: ["Exquisite"]
  },
  {
    id: 9,
    name: "Royal Navy Embroidered Sherwani",
    category: "Ethnic Wear",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=2000&auto=format&fit=crop",
    description: "Regal sherwani with gold zardozi work, perfect for wedding ceremonies.",
    sizes: ["M", "L", "XL"],
    rating: 4.9,
    reviews: 32
  },
  {
    id: 10,
    name: "Cloud-Step White Street Sneakers",
    category: "Footwear",
    price: 79.99,
    oldPrice: 119.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop",
    description: "Ultra-comfy sneakers with memory foam insoles and a durable minimalist exterior.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.7,
    reviews: 189,
    tags: ["Hot"]
  },
  {
    id: 11,
    name: "Glamour Red Stiletto Heels",
    category: "Footwear",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop",
    description: "Vibrant red 4-inch stilettoes designed for both elegance and stability.",
    sizes: ["5", "6", "7", "8"],
    rating: 4.6,
    reviews: 67
  },
  {
    id: 12,
    name: "Tokyo Talkies Bodycon Dress",
    category: "Budget",
    price: 5.10,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/tokyo_talkies_dress_1775795504946.png",
    description: "Trendy and affordable bodycon dress, perfect for daily wear and student life.",
    sizes: ["S", "M", "L"],
    rating: 4.4,
    reviews: 1560,
    tags: ["Student Choice", "Budget"]
  },
  {
    id: 13,
    name: "Littlebox India Bodycon Midi Dress",
    category: "Budget",
    price: 10.90,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/littlebox_midi_dress_1775795555895.png",
    description: "Chic midi bodycon dress from Littlebox India. Elevate your street style.",
    sizes: ["XS", "S", "M"],
    rating: 4.5,
    reviews: 890,
    tags: ["Trending"]
  },
  {
    id: 14,
    name: "Iconic India Men's Shirt",
    category: "Budget",
    price: 23.10,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/iconic_india_shirt_1775795572827.png",
    description: "Classical formal shirt by Iconic India. Premium feel at an affordable price.",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 420
  },
  {
    id: 15,
    name: "Myntra Sangria A-Line Top",
    category: "Budget",
    price: 9.10,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/myntra_sangria_top_1775795591603.png",
    description: "Stylish A-line top from Myntra's Sangria collection. Fresh and vibrant.",
    sizes: ["S", "M", "L"],
    rating: 4.3,
    reviews: 2100,
    tags: ["Best Seller"]
  },
  {
    id: 16,
    name: "Jean Paul Gaultier Bodysuit",
    category: "Premium",
    price: 229.00,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    description: "High-end designer bodysuit by Jean Paul Gaultier. Avant-garde style for the bold.",
    sizes: ["XS", "S", "M"],
    rating: 4.9,
    reviews: 12,
    tags: ["Designer", "Luxury"]
  },
  {
    id: 17,
    name: "Brandon Maxwell Luma Top",
    category: "Premium",
    price: 725.00,
    image: "https://images.unsplash.com/photo-1539109132304-399bb44e82df?q=80&w=2000&auto=format&fit=crop",
    description: "Sophisticated luxury top by Brandon Maxwell. Timeless elegance and superior craft.",
    sizes: ["S", "M"],
    rating: 5.0,
    reviews: 5,
    tags: ["Exclusive"]
  },
  {
    id: 18,
    name: "Proenza Schouler Dress",
    category: "Premium",
    price: 1310.00,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2000&auto=format&fit=crop",
    description: "Stunning runway-ready dress from Proenza Schouler. The pinnacle of modern luxury.",
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviews: 8,
    tags: ["Runway", "Premium"]
  },
  {
    id: 19,
    name: "Khaite Knitted Top",
    category: "Premium",
    price: 760.00,
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2000&auto=format&fit=crop",
    description: "Luxurious knitted top by Khaite. Minimalist design with exceptional texture.",
    sizes: ["XS", "S", "M"],
    rating: 4.8,
    reviews: 15,
    tags: ["Style Edit"]
  },
  // Ethnic Wear (Sarees)
  {
    id: 22,
    brand: "GK Ethnic",
    name: "Premium Banarasi Pink Silk Saree",
    category: "Ethnic Wear",
    price: 120.00,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/saree_banarasi_pink_1775803246619.png",
    description: "Elegant Banarasi silk saree in vibrant pink and gold finish.",
    sizes: ["Free Size"],
    rating: 4.9,
    reviews: 154,
    tags: ["New Arrival"]
  },
  {
    id: 23,
    brand: "GK Ethnic",
    name: "Deep Blue Chiffon Summer Saree",
    category: "Ethnic Wear",
    price: 85.00,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/saree_chiffon_blue_1775803262718.png",
    description: "Lightweight summer chiffon saree with pure silver embellishments.",
    sizes: ["Free Size"],
    rating: 4.7,
    reviews: 89
  },
  {
    id: 24,
    brand: "GK Ethnic",
    name: "Emerald Green Organza Saree",
    category: "Ethnic Wear",
    price: 145.50,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/saree_organza_green_1775803327765.png",
    description: "Stunning organza saree with delicate floral hand-embroidery.",
    sizes: ["Free Size"],
    rating: 4.8,
    reviews: 210,
    tags: ["Best Seller"]
  },
  {
    id: 25,
    brand: "GK Ethnic",
    name: "Classic Red Kanjeevaram Saree",
    category: "Ethnic Wear",
    price: 199.99,
    image: "/brain/ea4b9113-1611-4135-8c85-c7ff48f20b11/saree_silk_red_1775803344700.png",
    description: "Rich Kanjeevaram silk saree with metallic woven borders.",
    sizes: ["Free Size"],
    rating: 5.0,
    reviews: 320,
    tags: ["Premium"]
  },
  // Summer Clothes
  {
    id: 26,
    brand: "Zara",
    name: "Flowy White Summer Dress",
    category: "Summer",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1515347619362-ae6a0ebbf822?q=80&w=2000&auto=format&fit=crop",
    description: "A breezy, flowy white dress perfectly suited for hot summer days and beach outings.",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviews: 890,
    tags: ["Summer Collection"]
  },
  {
    id: 27,
    brand: "H&M",
    name: "Linen Beach Top",
    category: "Summer",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=2000&auto=format&fit=crop",
    description: "Light linen top providing maximum breathability under the sun.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviews: 512
  }
];

// Product Routes
app.get('/api/search', async (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  // 1. Local Search First
  const localResults = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    (p.brand && p.brand.toLowerCase().includes(query)) ||
    p.category.toLowerCase().includes(query) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
  );

  if (localResults.length > 0) {
    return res.json({ source: "local", data: localResults });
  }

  // 2. Fallback External Search 
  try {
    let fallbackResults = [];
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleCx = process.env.GOOGLE_CX;

    // Optional: Primary Fallback using Google Custom Search API if Keys are provided
    if (googleApiKey && googleCx) {
      const gSearchQuery = encodeURIComponent(query + ' fashion clothing');
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${gSearchQuery}&searchType=image&num=8`);
      
      if (response.ok) {
        const externalData = await response.json();
        if (externalData.items && externalData.items.length > 0) {
          fallbackResults = externalData.items.map((item, index) => ({
            id: `ext-g-${index}`,
            name: item.title,
            brand: "Google Results",
            category: "External Product",
            price: Math.floor(Math.random() * 80) + 20 + 0.99, // Generated price
            image: item.link,
            description: item.snippet || "Found via Google search.",
            sizes: ["S", "M", "L"],
            rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
            reviews: Math.floor(Math.random() * 500) + 10,
            tags: ["External Item", "Google"],
            isExternal: true
          }));
        }
      }
    }

    // Secondary Fallback (DummyJSON) if Google API is not configured or fails
    if (fallbackResults.length === 0) {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const externalData = await response.json();
      
      fallbackResults = (externalData.products || [])
        .map(item => ({
          id: `ext-${item.id}`,
          name: item.title,
          brand: item.brand || "Global Partner",
          category: "External Product",
          price: item.price,
          image: item.thumbnail,
          description: item.description,
          sizes: ["S", "M", "L"],
          rating: item.rating || 4.5,
          reviews: item.reviews?.length || 100,
          tags: ["External Item"],
          isExternal: true
        }));
    }

    // If still no results from fake store with the exact query, fetch generic fashion items to NEVER return empty
    if (fallbackResults.length === 0) {
      const genericResponse = await fetch(`https://dummyjson.com/products/category/mens-shirts`);
      const genericData = await genericResponse.json();
      fallbackResults = (genericData.products || []).slice(0, 4).map(item => ({
        id: `ext-gen-${item.id}`,
        name: item.title,
        brand: item.brand || "Global Partner",
        category: "External Product",
        price: item.price,
        image: item.thumbnail,
        description: item.description,
        sizes: ["S", "M", "L"],
        rating: item.rating || 4.5,
        reviews: item.reviews?.length || 100,
        tags: ["External Item", "Suggested"],
        isExternal: true
      }));
    }

    return res.json({ source: "external", data: fallbackResults });
  } catch (error) {
    console.error("External Search Error:", error);
    return res.status(500).json({ source: "error", data: [] });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    res.json(data || products); // Fallback to mock if empty
  } catch (error) {
    console.error('Supabase Fetch Error:', error);
    res.json(products); // Hard fallback
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  }
});

// Category Route
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('category');
    if (error) throw error;
    const categories = [...new Set(data.map(p => p.category))];
    res.json(categories);
  } catch (error) {
    const categories = [...new Set(products.map(p => p.category))];
    res.json(categories);
  }
});

// Add Product to Supabase
app.post('/api/products', async (req, res) => {
  try {
    const product = req.body;
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Supabase Insert Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Order Demo Route
app.post('/api/orders', (req, res) => {
  const order = req.body;
  console.log('New Order Received:', order);
  res.status(201).json({ 
    message: 'Order placed successfully', 
    orderId: `GK-${Math.floor(Math.random() * 100000)}`
  });
});

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      customer_email: customerEmail,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Mock Routes
app.post('/api/users/login', (req, res) => {
  res.json({ message: 'Logged in successfully', user: { name: 'Demo User', email: 'user@example.com' } });
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('New Contact Form Submission:', { name, email, subject, message });

    // Try to save to Supabase if "contacts" table exists, but don't fail if it doesn't
    const { error } = await supabase.from('contacts').insert([{ name, email, subject, message }]);
    if (error) {
       console.log('Supabase contact insert error (likely table does not exist yet):', error.message);
    }

    res.status(200).json({ success: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ success: false, message: 'Failed to process message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
