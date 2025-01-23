import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/user.js";

export async function register(req, res) {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await createUser(email, hashedPassword);
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token });
}
