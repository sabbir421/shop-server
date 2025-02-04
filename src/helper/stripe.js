const country = require("which-country/lib/which-country");
const {
  luggageBooking,
  getBookingByStripeId,
} = require("../models/luggageBookingModel");
const { getStorePriceByCountry } = require("../models/storePriceModel");
const { createTransection } = require("../models/transectionModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripePayment = async (req, res) => {
  const {
    price,
    customerName,
    customerId,
    storeName,
    storeId,
    providerName,
    providerID,
    storeLat,
    storeLng,
    location,
    quantity,
    checkOutTime,
    checkInTime,
    checkinDate,
    checkoutDate,
    total,
    tax,
    numOfDay,
    storePrice,
    currency,
    currencySymbol,
    currencyCode,
    hour,
    country,
  } = req.body;
  console.log("----------------------req body----------------", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currencyCode.toLowerCase(),
            product_data: { name: "Luggage Storage" },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/orderHistory?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        price,
        customerName,
        customerId,
        storeId,
        providerName,
        hour,
        storeLat,
        storeLan: storeLng,
        location,
        quantity,
        checkInTime,
        checkoutTime: checkOutTime,
        checkinDate,
        checkoutDate,
        total,
        tax,
        numOfDay,
        providerID,
        storePrice,
        currency,
        currencySymbol,
        currencyCode,
        country,
        storeName,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Session Creation Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.validatePayment = async (req, res) => {
  const { sessionId } = req.body;

  try {
    // Fetch the session details from Stripe
    const booking = await getBookingByStripeId(sessionId);
    if (booking) {
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("---------------session---------------", session);

    // Check if payment is successful
    if (session.payment_status === "paid") {
      const bookingData = {
        storeNmae: session.metadata.storeName,
        price: session.metadata.price,
        customerName: session.metadata.customerName,
        customerId: session.metadata.customerId,
        storeId: session.metadata.storeId,
        providerName: session.metadata.providerName,
        hour: session.metadata.hour,
        storeLat: session.metadata.storeLat,
        storeLan: session.metadata.storeLan,
        location: session.metadata.location,
        quantity: session.metadata.quantity,
        checkInTime: session.metadata.checkInTime,
        checkoutTime: session.metadata.checkoutTime,
        checkinDate: session.metadata.checkinDate,
        checkoutDate: session.metadata.checkoutDate,
        total: session.metadata.total,
        tax: session.metadata.tax,
        numOfDay: session.metadata.numOfDay,
        providerID: session.metadata.providerID,
        storePrice: session.metadata.storePrice,
        paymentStatus: session.payment_status,
        stripeSessionId: session.id,
        currency: session.metadata.currency,
        currencySymbol: session.metadata.currencySymbol,
        currencyCode: session.metadata.currencyCode,
      };

      // Save the booking data
      const response = await luggageBooking(bookingData);
      const storePrice = await getStorePriceByCountry(session.metadata.country);
      const transectionData = {
        bookingId: response.id,
        totalAmount: session.metadata.price,
        customerName: session.metadata.customerName,
        customerId: session.metadata.customerId,
        storeId: session.metadata.storeId,
        providerName: session.metadata.providerName,
        hour: session.metadata.hour,
        storeLat: session.metadata.storeLat,
        storeLan: session.metadata.storeLan,
        location: session.metadata.location,
        quantity: session.metadata.quantity,
        country: session.metadata.country,
        total: session.metadata.total,
        tax: session.metadata.tax,
        numOfDay: session.metadata.numOfDay,
        providerID: session.metadata.providerID,
        status: session.payment_status,
        stripeSessionId: session.id,
        currency: session.metadata.currency,
        currencySymbol: session.metadata.currencySymbol,
        currencyCode: session.metadata.currencyCode,
        partnerAmount:
          storePrice?.vendor *
          session.metadata.quantity *
          session.metadata.numOfDay,
        systemFee:
          storePrice?.systemFee *
          session.metadata.quantity *
          session.metadata.numOfDay,
      };
      await createTransection(transectionData);
      res.status(200).json({ success: true, booking: bookingData });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment not completed." });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
