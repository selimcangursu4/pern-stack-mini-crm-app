import express from 'express';
import { CustomerController } from '../controllers/customer.controller';

const router = express.Router();
const customerController = new CustomerController();


router.post('/', (req, res) => {
    customerController.create(req, res);
});
router.get('/', (req, res) => {
    customerController.getAll(req, res);
});
router.get('/search', (req, res) => {
    customerController.search(req, res);
});
router.get('/:id', (req, res) => {
    customerController.getById(req, res);
});
router.put('/:id', (req, res) => {
    customerController.update(req, res);
});
router.delete('/:id', (req, res) => {
    customerController.delete(req, res);
});
router.patch('/:id/agent', (req, res) => {
    customerController.changeAgent(req, res);
});

export default router;