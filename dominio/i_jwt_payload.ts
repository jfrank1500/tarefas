export interface JWTPayload {
    sub: string,
    iss: string,
    name: string,
    role: string,
    iat?: number
}