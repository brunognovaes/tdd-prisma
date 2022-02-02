import express from 'express'
import routes from './routes'
const app = express()

app.use(express.json())
app.use('/user', routes.userRouter)


export default app