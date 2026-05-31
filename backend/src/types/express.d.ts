import "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            user_id: number;
            email: string;
            roleId: number;
        };
    }
}
