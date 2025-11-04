import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private authServiceUrl = process.env.AUTH_SERVICE_URL;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const token = authHeader.split(' ')[1];

    try {
      // Aqui o gateway chama o AUTH-SERVICE para validar
      const response = await axios.get(`${this.authServiceUrl}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      req.user = response.data; // adiciona dados do user à request
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
