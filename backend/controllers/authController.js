import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById } from "../models/user.js";

export async function register(req, res) {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userID = await createUser(email, hashedPassword, username);

        const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(201).json({ message: "User created", token: token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Email already exists" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ error: "User does not exist" });
    } else if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token: token });
}

export async function verifyToken(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ email: user.email, username: user.username });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}