# 🚀 Deployment Guide: GK FASHION WORLD

Follow these steps to deploy your premium fashion eCommerce website to production.

## 1. Frontend Deployment (Netlify / Vercel)

### Option A: Netlify (Recommended for Vite/React)
1. **Prepare your code**:
   - Ensure your `client` folder is pushed to a GitHub repository.
2. **Setup Netlify**:
   - Log in to [Netlify](https://www.netlify.com/).
   - Click **Add new site** > **Import from GitHub**.
   - Select your repository.
3. **Configure Build Settings**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Environment Variables**:
   - Add `VITE_API_URL` (pointing to your deployed backend URL).
5. **Redirects**:
   - Create a file named `_redirects` in `client/public` with:
     ```
     /*  /index.html  200
     ```

---

## 2. Backend Deployment (Render / Railway)

### Option A: Render
1. **Setup Render**:
   - Log in to [Render](https://render.com/).
   - Click **New** > **Web Service**.
   - Connect your GitHub repository.
2. **Configure Build Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
3. **Environment Variables**:
   - Add `PORT` (usually `5000` or Render handles it automatically).
   - Add `MONGODB_URI` or `SUPABASE_URL` if you connect a real database.

---

## 3. Database Integration (Supabase / MongoDB Atlas)

### Option A: Supabase
1. Create a project at [Supabase](https://supabase.com/).
2. Grab the `Project URL` and `Anon Key`.
3. In your backend or direct frontend (for client-side auth/data), use the `@supabase/supabase-js` library.

### Option B: MongoDB Atlas
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Get the Connection String.
3. Update your `server/.env` with `MONGODB_URI=your_connection_string`.

---

## 4. Final Checklist
- [ ] Ensure all API calls in the frontend use the production backend URL.
- [ ] Check that `darkMode` works on the production domain.
- [ ] Verify that images load correctly (Unsplash images are stable; locally stored images need to be in `public`).
- [ ] Test the Checkout flow to ensure success screens appear.

---

**Developed with ❤️ by Antigravity**
