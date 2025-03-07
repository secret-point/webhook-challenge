import fs from 'fs';
import { parsePayload } from '../utils/parser';

let secretMessage: string = "";

export async function processWebhook(data: string): Promise<{ success: boolean, secret?: string }> {
    try {
        const parsedData = parsePayload(data);
        secretMessage = parsedData.secret;
        fs.writeFileSync("secret.txt", secretMessage);
        console.log("secret", secretMessage)
        return { success: true, secret: secretMessage };
    } catch (error) {
        console.error("Failed to process the webhook data:", error);
        return { success: false };
    }
}

export function retrieveSecret(): string {
    return secretMessage;
}
