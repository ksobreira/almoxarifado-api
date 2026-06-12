import express from 'express'
import authRoutes from '../routes/authRoutes.js'
import categoryRoutes from '../routes/categoryRoutes.js'
import supplierRoutes from '../routes/supplierRoutes.js'
import productRoutes from '../routes/productRoutes.js'
import stockMovementRoutes from '../routes/stockMovementRoutes.js'
import authenticate from '../middlewares/authenticate.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Almoxarifado funcionando!' })
})

app.use('/auth', authRoutes)

app.use(authenticate)

app.use('/categories', categoryRoutes)
app.use('/suppliers', supplierRoutes)
app.use('/products', productRoutes)
app.use('/stock-movements', stockMovementRoutes)

export default app