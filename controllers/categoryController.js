import Category from '../models/Category.js';
import Subcategory from '../models/Subcategory.js';
import Product from '../models/Product.js';

const getCategories = async (req, res) => {
  try {
     // Fetch all categories
     const categories = await Category.find(); 
    
    // Send the categories in the response
    res.status(200).json(categories);

  } catch (error) {
    // Handle any errors
    console.error('Error fetching categories', error);
    res.status(500).json({ message: 'Server error. Unable to fetch catherogies.' });
  }
};


const getCategoryWithSubCategory = async (req, res) => {
  try {
     // Fetch all categories
     const categories = await Category.find();

     // Fetch all subcategories
     const subcategories = await Subcategory.find();
 
     // Format the response
     const data = categories.map(category => {
       const subcats = subcategories.filter(sub => sub.categoryId.toString() === category._id.toString());
       return {
         ...category.toObject(),
         //subcategories: subcats,
         subcategories: subcats.map((sub) => ({
          _id: sub._id,
          name: sub.name,
          description: sub.description
        })),
       };
     });
    
    
    // Send the categories in the response
    res.status(200).json(data);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching categories with their subcategories:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch catherogies with their subcategories.' });
  }
};

// GET /categories-with-products
const getCategoriesWithProducts = async (req,res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // For each category, fetch its associated products
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ categoryId: category._id })
          .select('name description image basePrice') // Include only necessary fields
          .lean();
        return { ...category.toObject(), products };
      })
    );

    res.status(200).json(categoriesWithProducts);
  } catch (error) {
    console.error('Error fetching categories with products:', error);
    res.status(500).json({ message: 'Failed to fetch categories with products', error });
  }

};


// Create a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a category
const deleteCategory =  async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json('Category has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getCategories , getCategoryWithSubCategory, getCategoriesWithProducts , createCategory,updateCategory, deleteCategory };