import { Router } from 'express';
import { handleWebhook, getSecret } from '../controllers/webhookController';

const router = Router();

router.post("/webhook", handleWebhook);
router.get("/secret", getSecret);

export default router;
