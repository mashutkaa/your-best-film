import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 години
  max: 10,
  message: "Request limit exceeded."
});

export function conditionalRateLimiter(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return limiter(req, res, next);
  }

  next();
}