const productSchema = require("../models/product");

module.exports = {
  createProducts,
  updateProducts,
  getAllProducts,
  getProductsById,
  deleteProducts,
};

// FUNCTION to Create Product
async function createProducts(payload, imageUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      if (!payload.userId || !payload.name || !payload.price || !payload.type) {
        return reject("All fields are required");
      }

      const createProducts = await productSchema.create({
        userId: payload.userId,
        name: payload.name,
        price: payload.price,
        type: payload.type,
        image: imageUrl,
      });

      if (!createProducts) {
        return reject("Error creating product");
      } else {
        return resolve(createProducts);
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// FUNCTION TO UPDATE PRODUCT
async function updateProducts(productId, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const updateProduct = await productSchema.findOneAndUpdate(
        { _id: productId },
        { $set: payload },
        { new: true }
      );

      if (!updateProduct) {
        return reject("Error Updating product");
      } else {
        return resolve(updateProduct);
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// FUNCTION TO GET ALL PRODUCT
async function getAllProducts(id, params) {
  return new Promise(async function (resolve, reject) {
    const pageNumber = parseInt(params.page) || 1;
    const itemsPerPage = parseInt(params.count) || 10;

    const sortOptions = {};
    if (params.sortBy) {
      sortOptions[params.sortBy] = params.sortOrder === "desc" ? -1 : 1;
    }
    try {
      if (id) {
        const getAllProducts = await productSchema
          .find({
            userId: id,
          })
          .sort(sortOptions)
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);

        if (!getAllProducts) {
          return reject("No Records Found!");
        }

        const result = {
          totalCount: getAllProducts.length,
          page: pageNumber,
          count: itemsPerPage,
          data: getAllProducts,
        };
        return resolve(result);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// FUNCTION TO GET PRODUCT BY ID
async function getProductsById(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const retriveProduct = await productSchema.findOne({
        _id: id,
      });

      if (!retriveProduct) {
        return reject("Products Not Found");
      }

      return resolve(retriveProduct);
    } catch (error) {
      return reject(error);
    }
  });
}

// FUNCTION TO DELETE PRODUCT BY ID
async function deleteProducts(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const deletedProduct = await productSchema.deleteOne({ _id: id });
      if (!deletedProduct) {
        return reject("Jobs Not Found");
      }
      return resolve(deletedProduct);
    } catch (error) {
      return reject(error);
    }
  });
}
