const { Order } = require("../models/order");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const { default: axios } = require("axios");
const midtransClient = require("midtrans-client");
const { User } = require("../models/user");

const router = require("express").Router();

//CREATE
router.post('/', async (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-EHSak3_uAAvaFgT3QEG8w27I',
      clientKey: 'SB-Mid-client-YsLvrX16dputBRg8',
    });

    const { 
      userId, 
      products, 
      selectedFeatures, 
      total, 
      userEmail, 
      userName, 
      userPhone, 
      userAddress,
      productsId,
      pQuantity,
      pCategory,
    } = req.body;
    const pId = productsId[0];
    const pName = products[0];
    const totals = total[0];
    const quantity = pQuantity[0];
    // console.log(total);
    const totalPrice = quantity * totals;

    // Create a new Order document and save it to the database
    // const user = await User.findOne({ _id: userId });
    const newOrder = new Order({
      userId: userId,
      userEmail: userEmail,
      products: products,
      selectedFeatures: selectedFeatures,
      total: totalPrice,
      // Add other order data as needed
    });

    await newOrder.save();
    // console.log(userName);

    // Construct the Midtrans request payload
    const midtransPayload = {
      transaction_details: {
        order_id: newOrder._id.toString(),
        gross_amount: totalPrice,
      },
      // credit_card: {
      //   secure: true,
      // },
      customer_details: {
        first_name: userName,
        email: userEmail,
        phone: userPhone,
        billing_address: {
          first_name: userName,
          phone: userPhone,
          country_code: "IDN",
          address: userAddress,
        },
        shipping_address: {
          first_name: userName,
          phone: userPhone,
          address: userAddress,
          country_code: "IDN"
        },
      },
      item_details: [{
        id: pId,
        price: totals,
        quantity: quantity,
        name: pName,
        brand: "Astroflaz",
        category: pCategory,
        merchant_name: "Code Space Indonesia",
      }],
      notification: {
        // Set the notification URL here
        // Replace 'https://your-server.com/midtrans-notification' with your actual URL
        // Make sure it matches the URL you configured in your Midtrans account
        callback_url: 'http://localhost:5000/midtrans-notification',
        // Other notification options if needed
      },

    };

    snap.createTransaction(midtransPayload).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      }
      const token = transaction.token;
      res.status(200).json({ message: "berhasil", dataPayment, token: token });
    })



    // Make a request to Midtrans API to get a payment token
    // const transaction = await snap.createTransaction(midtransPayload);
    // res.send({ transactionToken: transaction.token });

    // // Return the Midtrans payment token to the client
    // res.json({ token: response.data.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

//UPDATE
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL ORDERS

router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET AN ORDER
router.get("/findOne/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (req.user._id !== order.userId || !req.user.isAdmin)
      return res.status(403).send("Access denied. Not authorized...");

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ORDER STATS
router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 2)
    .format();

  try {
    const orders = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(previousMonth) } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 2)
    .format();

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(previousMonth) } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

// WEEK'S SALES

router.get("/week-sales", isAdmin, async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 7)
    .format();

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(last7Days) } } },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Handle Midtrans notification
router.post('/midtrans-notification', async (req, res) => {
  try {
    const midtransResponse = req.body;

    // Check if the payment is successful
    if (midtransResponse.status_code === '200') {
      const orderId = midtransResponse.order_id;

      // Update the order status in your database
      const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, { payment_status: 'paid' }, { new: true });

      // You may also want to handle other post-payment actions here
      // such as sending order confirmation emails, etc.

      // Respond to Midtrans with a success message
      res.status(200).send(updatedOrder);
    } else {
      // Handle unsuccessful payment
      res.status(400).send('Bad Request');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
