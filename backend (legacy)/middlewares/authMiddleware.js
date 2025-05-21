import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET,
        );
        console.log("Token verified:", verified);
        req.user = verified;
        next();
    } catch (err) {
        console.log("❌ Invalid token:", err.message);
        res.status(400).json({ message: "Invalid token" });
    }
}
