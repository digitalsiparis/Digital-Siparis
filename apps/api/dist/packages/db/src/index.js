"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const g = globalThis;
exports.prisma = g.prisma ??
    new client_1.PrismaClient({
        log: ["warn", "error"],
    });
if (process.env.NODE_ENV !== "production")
    g.prisma = exports.prisma;
exports.default = exports.prisma;
