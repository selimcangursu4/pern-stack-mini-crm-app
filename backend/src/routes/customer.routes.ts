import express from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authMiddleware } from "../middlewares/auth.middleware";


const router = express.Router();
const customerController = new CustomerController();


router.post('/create', (req, res) => {
    customerController.create(req, res);
});
router.get('/fetch', (req, res) => {
    customerController.getAll(req, res);
});
router.get('/search', (req, res) => {
    customerController.search(req, res);
});
router.get('/detail/:id', (req, res) => {
    customerController.getById(req, res);
});
router.put('/update/:id', (req, res) => {
    customerController.update(req, res);
});
router.delete('/remove/:id', (req, res) => {
    customerController.delete(req, res);
});
router.patch('/:id/agent', (req, res) => {
    customerController.changeAgent(req, res);
});
router.post(
    "/:id/notes",
    authMiddleware,
    customerController.createNote
);

export default router;