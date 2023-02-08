import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/badRequestError";
import validateRequest from "../middleware/validateRequest";
import User from "../models/user";
import { PasswordHasher } from "../services/password";

const router = express.Router();

const middleWareArray = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password must is required"),
];

router.post("/api/users/signin", middleWareArray, validateRequest, async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw new BadRequestError("Invalid Credentials");
	}

	const passMatch = await PasswordHasher.compare(existingUser.password, password);
	if (!passMatch) {
		throw new BadRequestError("Invalid Credentials");
	}

	const userJWT = jwt.sign({
		id: existingUser.id,
		email: existingUser.email,
	}, process.env.JWT_KEY!);

	req.session = { jwt: userJWT };
	return res.status(200).send(existingUser);
});

export { router as signInRouter };