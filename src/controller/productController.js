const sequelize = require("../config/database");
const { variables } = require("../config/variables");
const { uploadFile } = require("../helper/uploadFileS3");
const { Product, Variant, Image } = require("../schema/productSchema");

exports.productListing = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, description, price, variants } = req.body;

    // Ensure `variants` is parsed correctly
    let parsedVariants = [];
    if (typeof variants === "string") {
      try {
        parsedVariants = JSON.parse(variants);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON format for variants" });
      }
    } else if (Array.isArray(variants)) {
      parsedVariants = variants;
    } else {
      return res.status(400).json({ message: "Variants should be an array" });
    }

    // Create product entry in the database
    const newProduct = await Product.create(
      { name, description, price },
      { transaction }
    );

    // Prepare image storage
    const uploadedImages = {};

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const s3FileName = `products/${Date.now()}_${file.originalname}`;
        await uploadFile(file.buffer, s3FileName, file.mimetype);

        // Construct correct S3 URL
        const fileUrl = `https://${variables.s3Configs.s3BucketName}.s3.${variables.s3Configs.awsRegion}.amazonaws.com/${s3FileName}`;

        // Extract variant index from field name
        const match = file.fieldname.match(
          /variants\[(\d+)\]\[images\](?:\[\w+\])?\[\]/
        );
        if (match) {
          const index = match[1]; // Extracts the correct variant index
          if (!uploadedImages[index]) {
            uploadedImages[index] = [];
          }
          uploadedImages[index].push(fileUrl);
        }
      }
    }

    // Create variants and associate with the product
    const createdVariants = [];
    for (let i = 0; i < parsedVariants.length; i++) {
      const variant = parsedVariants[i];

      const newVariant = await Variant.create(
        {
          productId: newProduct.id,
          size: variant.size,
          color: variant.color,
          quantity: variant.quantity,
          price: variant.price,
        },
        { transaction }
      );

      // Create image records for the variant
      let savedImages = [];
      if (uploadedImages[i] && uploadedImages[i].length > 0) {
        const imageRecords = uploadedImages[i].map((url) => ({
          variantId: newVariant.id,
          url,
        }));

        savedImages = await Image.bulkCreate(imageRecords, { transaction });
      }

      // Fetch images from the database and associate with the variant
      const storedImages = await Image.findAll({
        where: { variantId: newVariant.id },
      });

      createdVariants.push({
        ...newVariant.dataValues,
        images: storedImages.map((img) => img.url),
      });
    }

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: "Product created successfully!",
      product: {
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        variants: createdVariants,
      },
    });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    console.error("Error listing product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
