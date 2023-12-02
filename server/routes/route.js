import { Router } from "express";
import * as controllers from '../controllers/appControllers.js'
const router = Router()

router.route('/sectors').get(controllers.getSectors)
router.route('/formData').post(controllers.postFormData)

export default router