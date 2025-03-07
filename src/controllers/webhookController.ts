import { Request, Response } from "express";
import { processWebhook, retrieveSecret } from '../services/webhookService';

export async function handleWebhook(req: Request, res: Response): Promise<void> {
    const result = await processWebhook(req.body);
    if (result.success) {
        res.status(200).send({ message: "Payload received successfully.", secret: result.secret });
    } else {
        res.status(500).send({ error: 'Failed to process request' });
    }
}

export function getSecret(req: Request, res: Response): void {
    const secret = retrieveSecret();
    if (secret) {
        res.send({ secret });
    } else {
        res.status(404).send({ error: "Secret not found" });
    }
}
