import express from 'express'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Almoxarifado funcionando!' })
})

app.use('/categories', categoryRoutes)

export default app