import prisma from "../modules/db";

// Get all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  return res.json({ data: user.products });
};

// Get One
export const getOneProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.query.id,
      belongsToId: req.user.id,
    },
  });

  return res.json({ data: product });
};

// Create Product
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  return res.json({ data: product });
};

// Update Product
export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  return res.json({ data: product });
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  return res.json({ data: product });
};
