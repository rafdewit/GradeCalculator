export function deepCopy<T>(item: T) {
    return JSON.parse(JSON.stringify(item)) as T;
}

export function generateGuid(): string {
    const crypto = require("crypto")
    return crypto.randomBytes(16).toString("hex");
}