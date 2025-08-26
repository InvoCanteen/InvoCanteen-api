import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export interface ValidationError extends Error {
    details?: Array<{ message: string }>;
}

export const errorHandler = (
    err: Error | AppError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err);

    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: string[] = [];

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if ('details' in err && Array.isArray(err.details)) {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.details.map(detail => detail.message);
    }
    else if (err.name === 'PrismaClientKnownRequestError') {
        statusCode = 400;
        message = 'Database Error';

        const prismaError = err as any;
        if (prismaError.code === 'P2002') {
            message = 'Duplicate entry found';
        } else if (prismaError.code === 'P2025') {
            message = 'Record not found';
        }
    }
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    const errorResponse = process.env.NODE_ENV === 'production'
        ? {
            success: false,
            message,
            ...(errors.length > 0 && { errors })
        }
        : {
            success: false,
            message,
            ...(errors.length > 0 && { errors }),
            stack: err.stack,
            type: err.name
        };

    res.status(statusCode).json(errorResponse);
};

export default errorHandler;
