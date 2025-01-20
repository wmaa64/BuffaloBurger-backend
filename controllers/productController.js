import Product from '../models/Product.js' ;

const getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch products.' });
  }
};

const getTopsellingProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find({'topselling': true })

    // Send the products in the response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching topselling products:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch topselling products.' });
  }
};


const getProductById = async (req, res) => {
  try {
    // Fetch product from the database
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // Handle any errors
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch product.' });
  }

};


export { getProducts, getTopsellingProducts , getProductById };