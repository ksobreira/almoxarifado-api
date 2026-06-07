import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, supplier: true }
  })
  res.json(products)
}

export const getProductById = async (req, res) => {
  const { id } = req.params
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true, supplier: true }
  })

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' })
  }

  res.json(product)
}

export const createProduct = async (req, res) => {
  const { name, description, unity, currentStock, minimunStock, categoryId, supplierId } = req.body
  const product = await prisma.product.create({
    data: { name, description, unity, currentStock, minimunStock, categoryId: Number(categoryId), supplierId: Number(supplierId) }
  })
  res.status(201).json(product)
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, unity, currentStock, minimunStock, categoryId, supplierId } = req.body

  const product = await prisma.product.findUnique({
    where: { id: Number(id) }
  })

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' })
  }

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, description, unity, currentStock, minimunStock, categoryId: Number(categoryId), supplierId: Number(supplierId) }
  })

  res.json(updated)
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  const product = await prisma.product.findUnique({
    where: { id: Number(id) }
  })

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' })
  }

  await prisma.product.delete({ where: { id: Number(id) } })
  res.json({ message: 'Produto deletado com sucesso.' })
}