import Order from '../models/Order.js';
import sendEmail from '../utils/emailService.js';

const placeOrder = async (req, res) => {
  try {
    const { contactInfo, addressInfo, basketItems, orderTotalPrice, status } = req.body;

    // Validate that basketItems exist
    if (!basketItems || basketItems.length === 0) {
      return res.status(400).json({ message: 'No items in the basket.' });
    }

    // Use the provided orderTotalPrice if available, otherwise calculate it
    //const OrderTotalPrice = orderTotalPrice ?? basketItems.reduce((total, item) => total + item.totalPrice, 0);

    // Create new order
    const newOrder = new Order({
      contactInfo,
      addressInfo,
      basketItems: basketItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        productType: item.productType,
        size: item.size,
        breadType: item.breadType,
        combo: item.combo,
        comboDrink: item.comboDrink,
        extras: item.extras,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      orderTotalPrice,
      status: status || 'pending', // Use provided status or default to 'pending'
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    // Prepare email content
    const emailHtml = `
      <h1>Thank you for your order!</h1>
      <p>Order ID: ${savedOrder._id}</p>
      <h2>Order Summary:</h2>
      <ul>
        ${basketItems.map(
          (item) => `
          <li>
            <strong>${item.name.en} (${item.quantity})</strong>: EGP ${item.totalPrice.toFixed(2)}
          </li>`
        ).join('')}
      </ul>
      <p><strong>Total:</strong> EGP ${orderTotalPrice.toFixed(2)}</p>
      <h3>Delivery Address:</h3>
      <p>${addressInfo.streetAddress}, ${addressInfo.area}, ${addressInfo.city}</p>
      <p>Floor: ${addressInfo.floorNumber}, Apartment: ${addressInfo.apartmentNumber}, Building: ${addressInfo.buildingNumber}</p>
      <p>Extra Details: ${addressInfo.extraDetails || 'N/A'}</p>
    `;

    // Send email
    await sendEmail(
      contactInfo.email,
      'Your Order Confirmation',
      emailHtml
    );

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order', error });
  }
};

export { placeOrder };




/*
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    // Validate that user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate that each product exists
    for (const item of products) {
      const product = await Product.findById(item.productId._id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId._id} not found` });
      }
    }

    const newOrder = new Order({
      user: userId,
      products: products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

export  { placeOrder };
*/