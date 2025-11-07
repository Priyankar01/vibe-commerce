const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
