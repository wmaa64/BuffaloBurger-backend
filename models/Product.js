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

const offerContentSchema = new mongoose.Schema({
  sandwichOptions: [
    {
      sandwich: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to a product representing the sandwich
        required: true 
      },
      price: { type: Number, required: true },
    }  ],

  includesFries: { type: Boolean, required: true },
  friesOptions: [
    {
      fries: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to a product representing the sandwich
        required: true 
      },
      price: { type: Number, required: true },
    }  ],

  includesDrink: { type: Boolean, required: true },
  drinkOptions: [
    {
      drink: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to a product representing the sandwich
        required: true 
      },
      price: { type: Number, required: true },
    }  ],

    includesExtraSandwich: { type: Boolean, required: true },
    extraSandwichOptions: [
    {
      sandwich: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to a product representing the sandwich
        required: false 
      },
      price: { type: Number, required: true },
    }  ],
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
  productType: { type: String, enum: [ 'offer' , 'food', 'sauce', 'drink', 'appetizer' , 'dessert'], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true},
  topselling: { type: Boolean, default: false },
  sizes: [sizeSchema], // Optional sizes
  breadTypes: [breadTypeSchema], // Optional bread types
  combos: [comboSchema], // Combos with drinks and other details
  extras: [extraSchema], // Optional extras
  offerContent: offerContentSchema,
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