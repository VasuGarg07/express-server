import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectDb } from "./services/db.service";
import { verifyLoginCreds, verifyToken } from "./middlewares/auth.middleware";
import { loginRouter } from "./routes/login.routes";
import { SERVER_PORT } from "./configuration/config";
import { error404 } from "./middlewares/error.middleware";
import { authenticatedRouter } from "./routes/authenticated.routes";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sign-up router
app.use("/api/v1/auth", verifyLoginCreds, loginRouter);

// authenticated router
app.use("api/v1/", verifyToken, authenticatedRouter);

app.get("/", (req, res) => {
	res.send(`Server is live at http://localhost:${SERVER_PORT}/`);
});

app.use(error404)

connectDb().then(() => {
	console.log("DB Connected Successfully");
	app.listen(SERVER_PORT, () => {
		console.log(`App is listening on port: ${SERVER_PORT}`);
	});
})
	.catch(err => {
		console.log("Error occured while connecting to DB: ", err);
	});
