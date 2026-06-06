import express from 'express'
import categoryRoutes from './routes/categoryRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Almoxarifado funcionando!' })
})

app.use('/categories', categoryRoutes)
app.use('/suppliers', supplierRoutes)

export default app