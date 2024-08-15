import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
  };
  
  export const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error in add products' });
    }
    
    
  };


  //---------------Cart-----------------------------------
  // Add product to cart
export const addToCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
      if (productIndex > -1) {
        // If product exists in cart, increase the quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // If product does not exist, add it to the cart
        cart.products.push({ product: productId });
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart', error });
    }
  };

  // Update product quantity in cart
export const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart quantity', error });
    }
  };
  
  // Get cart by user
  export const getCartByUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await Cart.findOne({ user: userId }).populate('products.product');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error });
    }
  };