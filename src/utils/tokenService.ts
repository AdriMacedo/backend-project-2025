import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET!;

export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, jwtSecret, {expiresIn: "1h"});
};

interface JwtPayload {
    userId: string;
    role: string;
};

export const validateAccessToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, jwtSecret) as JwtPayload;
    } catch {
        return null;
    }
};