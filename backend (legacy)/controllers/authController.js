import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById, updateUserField } from "../models/user.js";
import { sendEmail } from "../services/emailService.js";

export async function register(req, res) {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        if (await getUserByEmail(email)) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const confirmEmailToken = jwt.sign({ isToConfirmEmail: true, password: hashedPassword, email: email, username: username }, process.env.JWT_SECRET, { expiresIn: "30d" });

        await sendEmail(
            email,
            "Підтвердження електронної пошти",
            `<div style="background-color: #1a1a1a; padding: 20px; color: white; font-family: Arial, sans-serif;">
                <h1 style="color: #ffffff;">Підтвердження електронної пошти</h1>
                <p style="color: #ffffff;">Дякуємо вам за реєстрацію!</p>
                <p style="color: #ffffff;">Для підтвердження електронної пошти натисніть кнопку нижче:</p>
                <a href="${process.env.SITE_DOMAIN}/?confirmEmail=${confirmEmailToken}" style="display: inline-block; padding: 10px 20px; color: white; background-color: black; border: 2px solid white; text-decoration: none; border-radius: 24px;">Підтвердити електронну пошту</a>
                <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
                    <p style="color: #ffffff;">Якщо кнопка не працює, перейдіть за цим посиланням:</p>
                    <a href="${process.env.SITE_DOMAIN}/?confirmEmail=${confirmEmailToken}" style="color: #4da6ff;">${process.env.SITE_DOMAIN}/?confirmEmail=${confirmEmailToken}</a>
                </div>
            </div>`,
            true
        );

        res.status(201).json({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to send email" });
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

        if (decoded.isToConfirmEmail) {
            if (await getUserByEmail(decoded.email)) {
                return res.status(400).json({ error: "Email already confirmed" });
            }

            const userId = await createUser(decoded.email, decoded.password, decoded.username);

            const authToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

            return res.status(201).json({ message: "User created", token: authToken, tokenData: { email: decoded.email, username: decoded.username } });
        }

        const user = await getUserById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ email: user.email, username: user.username });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export async function forgotPassword(req, res) {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ error: "User does not exist" });
    }

    const resetPasswordToken = jwt.sign({ isToResetPassword: true, userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await sendEmail(
        email,
        "Відновлення паролю",
        `<div style="background-color: #1a1a1a; padding: 20px; color: white; font-family: Arial, sans-serif;">
            <h1 style="color: #ffffff;">Відновлення паролю</h1>
            <p style="color: #ffffff;">Для відновлення паролю натисніть кнопку нижче:</p>
            <a href="${process.env.SITE_DOMAIN}/?resetPassword=${resetPasswordToken}" style="display: inline-block; padding: 10px 20px; color: white; background-color: black; border: 2px solid white; text-decoration: none; border-radius: 24px;">Скинути пароль</a>
            <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
                <p style="color: #ffffff;">Якщо кнопка не працює, перейдіть за цим посиланням:</p>
                <a href="${process.env.SITE_DOMAIN}/?resetPassword=${resetPasswordToken}" style="color: #4da6ff;">${process.env.SITE_DOMAIN}/?resetPassword=${resetPasswordToken}</a>
            </div>
        </div>`,
        true
    );

    res.json({ message: "Email sent" });
}

export async function resetPassword(req, res) {
    const { token, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isToResetPassword) {
            return res.status(400).json({ error: "Invalid token" });
        }

        await updateUserField(decoded.userId, "password", hashedPassword);

        res.json({ message: "Password updated" });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}