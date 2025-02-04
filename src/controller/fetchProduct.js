const { Product, Variant, Image } = require("../schema/productSchema");

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Variant,
            as: 'variants', // Use the lowercase alias 'variants'
            include: [
              {
                model: Image,
                as: 'images', // Use the lowercase alias 'images'
                attributes: ['url'],
              },
            ],
          },
        ],
      });
  
      const formattedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        soldCount: product.soldCount || 0,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        location: product.location || 'Dhaka',
        variants: product.variants.map((variant) => ({
          id: variant.id,
          size: variant.size,
          color: variant.color,
          quantity: variant.quantity,
          price: variant.price,
          images: variant.images.map((image) => ({ url: image.url })),
        })),
      }));
  
      res.status(200).json(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
