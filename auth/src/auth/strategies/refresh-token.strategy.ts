/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenStrategy {
    constructor(private jwtService: JwtService) { }
    // Gerar refresh token
    async generateRefreshToken(userId: string) {
        const payload = { sub: userId };
        return this.jwtService.sign(payload); // Refresh token expira em 7 dias
    }

    // Verificar se o refresh token é válido
    async validateRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return null;
        }
    }
}