import express from 'express'
const router = express.Router()
import  handleImageUpload, { editProduct, deleteProduct, addProducts, fetchAllProducts} from '../../controller/admin/productsController.js'

import { upload } from '../../Helpers/cloudinary.js'

router.post('/upload-image', upload.single('my_file'), handleImageUpload)

router.post('/add', addProducts)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)
router.delete('/get', fetchAllProducts)



export default router