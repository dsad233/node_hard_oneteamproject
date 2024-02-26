import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/index.js";
export const adminMiddleware = async function (req, res, next) {
    try {
        const { authorization } = req.cookies;
        if (!authorization) throw new Error("토큰이 존재하지 않습니다.");
        const [tokenType, token] = authorization.split(" ");
        if (tokenType !== "Bearer") throw new Error("토큰 타입이 일치하지 않습니다.");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { aduserId } = jwt.verify(token, process.env.JWT_SECRET);
        const aduser = await prisma.aduser.findFirst({
            where: { aduserId: +aduserId },
        });
        if (!aduser) {
            res.clearCookie("authorization");
            throw new Error("토큰 사용자가 존재하지 않습니다.");
        }
        req.user = aduser;
        next();
    } catch (error) {
        res.clearCookie("authorization");
        // 토큰이 만료되었거나, 조작되었을 때, 에러 메시지를 다르게 출력합니다.
        switch (error.name) {
            case "TokenExpiredError":
                return res.status(401).json({ message: "토큰이 만료되었습니다." });
            case "JsonWebTokenError":
                return res.status(401).json({ message: "토큰이 조작되었습니다." });
            default:
                return res.status(401).json({ message: error.message ?? "비정상적인 요청입니다." });
        }
    }
};