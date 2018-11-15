import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import expressValidator from "express-validator";
import lusca from "lusca";
import { healthRouter } from "./routes/health";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use("/healthcheck", healthRouter);

export default app;
