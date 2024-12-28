import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  size: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  price: { type: Number, required: true },
});

const breadTypeSchema = new mongoose.Schema({
  breadType: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  price: { type: Number, required: true },
});

const extraSchema = new mongoose.Schema({
  extraName: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  price: { type: Number, required: true },
});

const comboSchema = new mongoose.Schema({
  comboName: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  price: { type: Number, required: true },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: { type: String, required: false },
  includesDrink: { type: Boolean, required: true },
  drinkOptions: [
    {
      en: { type: String, required: true },
      ar: { type: String, required: true }
    }
  ],
});

const productSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: { type: String, required: true },
  basePrice: { type: Number, required: true }, // Base price
  productType: { type: String, enum: ['food', 'sauce', 'drink'], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
  topselling: { type: Boolean, default: false },
  sizes: [sizeSchema], // Optional sizes
  breadTypes: [breadTypeSchema], // Optional bread types
  combos: [comboSchema], // Combos with drinks and other details
  extras: [extraSchema], // Optional extras
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;


/*
import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      en: {type: String, require: true, trim: true },
      ar: {type: String, require: true, trim: true }
  },
  description: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true }
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
  topselling: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
*/