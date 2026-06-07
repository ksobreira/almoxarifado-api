import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllMovements = async (req, res) => {
  const movements = await prisma.stockMovement.findMany({
    include: { product: true }
  })
  res.json(movements)
}

export const getMovementById = async (req, res) => {
  const { id } = req.params
  const movement = await prisma.stockMovement.findUnique({
    where: { id: Number(id) },
    include: { product: true }
  })

  if (!movement) {
    return res.status(404).json({ error: 'Movimentação não encontrada.' })
  }

  res.json(movement)
}

export const getMovementsByProduct = async (req, res) => {
  const { productId } = req.params
  const movements = await prisma.stockMovement.findMany({
    where: { productId: Number(productId) },
    include: { product: true }
  })
  res.json(movements)
}

export const createMovement = async (req, res) => {
  const { type, quantity, notes, productId } = req.body

  if (type !== 'IN' && type !== 'OUT') {
    return res.status(400).json({ error: 'O tipo deve ser IN ou OUT.' })
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantidade deve ser maior que zero.' })
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) }
  })

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' })
  }

  if (type === 'OUT' && quantity > product.currentStock) {
    return res.status(400).json({ error: 'Estoque insuficiente.' })
  }

  const newStock = type === 'IN'
    ? product.currentStock + quantity
    : product.currentStock - quantity

  const movement = await prisma.stockMovement.create({
    data: { type, quantity, notes, productId: Number(productId) }
  })

  await prisma.product.update({
    where: { id: Number(productId) },
    data: { currentStock: newStock }
  })

  res.status(201).json(movement)
}