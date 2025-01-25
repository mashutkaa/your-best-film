import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById, updateEmailStatus } from "../models/user.js";
import { sendEmail } from "../services/emailService.js";

export async function register(req, res) {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userID = await createUser(email, hashedPassword, username);

        const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
        const confirmEmailToken = jwt.sign({ userIDToConfirm: userID }, process.env.JWT_SECRET);

        await sendEmail(
            email,
            "Підтвердження електронної пошти",
            `<div style="background-color: #1a1a1a; padding: 20px; color: white; font-family: Arial, sans-serif;">
                <h1 style="color: #ffffff;">Підтвердження електронної пошти</h1>
                <p style="color: #ffffff;">Дякуємо вам за реєстрацію!</p>
                <p style="color: #ffffff;">Для підтвердження електронної пошти натисніть кнопку нижче:</p>
                <a href="http://localhost:3000/auth/confirmEmail?id=${confirmEmailToken}" style="display: inline-block; padding: 10px 20px; color: white; background-color: black; border: 2px solid white; text-decoration: none; border-radius: 24px;">Підтвердити електронну пошту</a>
                <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
                    <p style="color: #ffffff;">Якщо кнопка не працює, перейдіть за цим посиланням:</p>
                    <a href="http://localhost:3000/auth/confirmEmail?id=${confirmEmailToken}" style="color: #4da6ff;">http://localhost:3000/auth/confirmEmail?token=${confirmEmailToken}</a>
                </div>
            </div>`,
            true
        );

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

export async function confirmEmail(req, res) {
    const { id } = req.query;

    try {
        const decoded = jwt.verify(id, process.env.JWT_SECRET);
        const user = await getUserById(decoded.userIDToConfirm);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.email_verified === 1) {
            return res.status(400).json({ error: "Email already confirmed" });
        }

        await updateEmailStatus(decoded.userIDToConfirm, 1);

        res.status(200).json({ message: "Email confirmed" });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}