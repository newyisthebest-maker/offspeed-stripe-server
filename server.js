const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_51Tkz1SJvlNvMA2aVo06wzNX27x4WYJJP9WgtYvLXOPq0eQUJsh7lIvxPAgAL1SNga1gdNTvRge52pNJjIOyLUQXl00A0hn8nmi"
);

app.get("/", (req, res) => {
  res.send("OFFspeed Stripe Server Running");
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
