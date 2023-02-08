import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import User from "../models/user";

const router = express.Router();

const middleWareArray = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 4 to 20 characters"),
];

router.post("/api/users/signUp", middleWareArray, async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}

	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		console.log("Email in Use");
		throw new BadRequestError('Email in Use');
	}

	const user = User.build({ email, password });
	await user.save();

	const userJWT = jwt.sign({
		id: user.id,
		email: user.email,
	}, process.env.JWT_KEY!);		// this gets assigned by kubectl and ! is just to tell typescript that its defined

	req.session = { jwt: userJWT };
	return res.status(201).send(user);
});

export { router as signUpRouter };