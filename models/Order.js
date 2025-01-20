import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Basket item schema
const basketItemSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: { type: String, required: true },
  productType: { type: String, required: true },
  size: {
    en: { type: String },
    ar: { type: String },
  },
  breadType: {
    en: { type: String },
    ar: { type: String },
  },
  combo: {
    comboName: {
      en: { type: String },
      ar: { type: String },
    },
    price: { type: Number },
    description: {
      en: { type: String },
      ar: { type: String },
    },
    image: { type: String },
  },
  comboDrink: {
      en: { type: String },
      ar: { type: String },
    },

  extras: [
    {
      extraName: {
        en: { type: String },
        ar: { type: String },
      },
      price: { type: Number },
    },
  ],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Unit price
  totalPrice: { type: Number, required: true }, // Adjusted by quantity
});

// Contact information schema
const contactInfoSchema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

// Address information schema
const addressInfoSchema = new Schema({
  city: { type: String, required: true },
  area: { type: String, required: true },
  streetAddress: { type: String, required: true },
  buildingNumber: { type: String },
  apartmentNumber: { type: String },
  floorNumber: { type: String },
  extraDetails: { type: String },
}, { _id: false });

// Main order schema
const orderSchema = new Schema(
  {
    contactInfo: contactInfoSchema,
    addressInfo: addressInfoSchema,
    basketItems: [basketItemSchema],
    orderTotalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Order = model('Order', orderSchema);

export default Order;
