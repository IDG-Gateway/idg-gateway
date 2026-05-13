import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import axios from "axios";

const app = express();
const PORT = 3000;
app.use(express.json());

// API routes
app.post("/api/create-subscription", async (req, res) => {
    const { priceId, customerId } = req.body;
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
        return res.status(500).json({ error: "Stripe key not configured" });
    }
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-04-22.dahlia' });
    
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
        });
        res.json({ subscriptionId: subscription.id });
    } catch (err) {
        res.status(500).json({ error: "Failed to create subscription" });
    }
});

app.get("/api/track", async (req, res) => {
    const trackingNumber = req.query.trackingNumber;
    const apiKey = process.env.TRACKINGMORE_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "TrackingMore key not configured" });
    }
    
    try {
        const response = await axios.get(`https://api.trackingmore.com/v3/trackings/get?tracking_number=${trackingNumber}`, {
            headers: { 'Tracking-Api-Key': apiKey }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to track shipment" });
    }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
