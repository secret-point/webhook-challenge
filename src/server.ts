import express from "express";
import bodyParser from "body-parser";
import webhookRoutes from "./routes/webhookRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.text({ type: 'text/plain' }));

app.use(webhookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
