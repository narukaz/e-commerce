import express from 'express'
const routes = express.Router()
import { addFeatureImage,getFeatureImages } from '../../controllers/admin/featureController.js'


routes.post('/add', addFeatureImage)
routes.get('/get', getFeatureImages)



export default routes