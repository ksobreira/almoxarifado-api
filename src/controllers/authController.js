import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const saltRounds = 10

export const register = async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return res.status(400).json({ error: 'Email já cadastrado.' })
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })

  const { password: _, ...userWithoutPassword } = user

  res.status(201).json(userWithoutPassword)
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(401).json({ error: 'Email ou senha inválidos.' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Email ou senha inválidos.' })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )

  res.json({ token })
}