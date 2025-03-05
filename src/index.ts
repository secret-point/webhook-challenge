import express, { Request, Response } from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let secretMessage: string = "";

app.post("/webhook", (req: Request, res: Response) => {
    if (req.body.secret) {
        secretMessage = req.body.secret;
        fs.writeFileSync("secret.txt", secretMessage);
    }

    res.status(200).send({ message: "Payload received successfully" });
});

app.get("/secret", (req: Request, res: Response) => {
    if (!!secretMessage) {
        res.send({ secret: secretMessage });
    } else {
        res.status(404).send({ error: "Secret not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
