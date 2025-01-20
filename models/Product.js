import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema for localized fields (e.g., English and Arabic)
const localizedSchema = new Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });

// Schema for sizes
const sizeSchema = new Schema({
  size: { type: localizedSchema, required: true },
  price: { type: Number, required: true },
}, { _id: false });

// Schema for bread types
const breadTypeSchema = new Schema({
  breadType: { type: localizedSchema, required: true },
  price: { type: Number, required: true },
}, { _id: false });

// Schema for drink options
const drinkOptionSchema = new Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });

// Schema for combos
const comboSchema = new Schema({
  comboName: { type: localizedSchema, required: true },
  price: { type: Number, required: true },
  description: { type: localizedSchema, required: true },
  image: { type: String, default: '' },
  includesDrink: { type: Boolean, required: true },
  drinkOptions: { type: [drinkOptionSchema], default: [] },
}, { _id: false });

// Schema for extras
const extraSchema = new Schema({
  extraName: { type: localizedSchema, required: true },
  price: { type: Number, required: true },
}, { _id: false });

// Schema for offers
const offerDetails = new Schema( 
  {
    sandwiches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }], // each Reference to a sandwich product
    friesOptions: [
      {
        name: { type: localizedSchema, required: true },
        price: { type: Number, required: true }
      }
    ],
    drinkOptions: [
      {
        name: { type: localizedSchema, required: true },
        price: { type: Number, required: true }
      }
    ],
    extraSandwiches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }] // Reference to another sandwich
  }

)

// Main Product schema
const productSchema = new Schema({
  name: { type: localizedSchema, required: true },
  description: { type: localizedSchema, required: true },
  image: { type: String, required: true },
  basePrice: { type: Number, required: true },
  productType: { type: String, required: true, enum: ['food', 'beverage', 'other'] },
  categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  topselling: { type: Boolean, default: false },
  sizes: { type: [sizeSchema], default: [] },
  breadTypes: { type: [breadTypeSchema], default: [] },
  combos: { type: [comboSchema], default: [] },
  extras: { type: [extraSchema], default: [] },
  offer: {type: offerDetails},
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
