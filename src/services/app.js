import express from 'express'
import categoryRoutes from '../routes/categoryRoutes.js'
import supplierRoutes from '../routes/supplierRoutes.js'
import productRoutes from '../routes/productRoutes.js'
import stockMovementRoutes from '../routes/stockMovementRoutes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Almoxarifado funcionando!' })
})

app.use('/categories', categoryRoutes)
app.use('/suppliers', supplierRoutes)
app.use('/products', productRoutes)
app.use('/stock-movements', stockMovementRoutes)

export default app