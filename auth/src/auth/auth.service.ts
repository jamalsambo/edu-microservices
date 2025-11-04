/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import axios from 'axios';

@Injectable()
export class AuthService {
  private usersServiceUrl = process.env.USERS_SERVICE_URL;
  private institutionServiceUrl = process.env.INSTITUTION_SERVICE_URL;
  constructor(private jwtService: JwtService) {}

  async login(user: {
    id: any;
    displayName: any;
    userType: any;
    institutionId: any;
    institution: any;
    employee: any;
    student: any;
    permissionsItems: any;
  }) {
    const payload = {
      sub: user.id,
      displayName: user.displayName,
      userType: user?.userType?.name,
      institutionId: user?.employee
        ? user?.employee.institutionId
        : user?.student.institutionId,
      institutionParent: !!user.employee.institution.parentId,
      teacher: user?.employee?.teacher || null,
      employeeId: user?.employee?.id || null,
      studentId: user?.student?.id || null,
      institution: user.employee.institution,
      permissions: user.permissionsItems?.map((p: any) => p.key),
    };

    return {
      user: { ...payload },
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: any = null;

    try {
      // 🔹 Busca o usuário pelo username
      const response = await axios.get(
        `${this.usersServiceUrl}/users/${username}`,
      );
      user = response.data;

      if (!user) throw new NotFoundException('Usuário não encontrado');
    } catch (error: any) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // 🔹 Valida senha
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    // 🔹 Buscar dados adicionais conforme tipo
    const userProfile = await this.getUserProfile(user);

    return userProfile;
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return decoded;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async getUserProfile(user: any) {
    try {
      // Caso o usuário seja funcionário
      if (user.userType.name === 'Funcionario') {
        const { data: employee } = await axios.get(
          `${this.institutionServiceUrl}/employee/userId/${user.id}`,
        );
        return { ...user, employee };
      }

      if (user.userType.name === 'Estudante') {
        const { data: student } = await axios.get(
          `${this.institutionServiceUrl}/student/userId/${user.id}`,
        );
        return { ...user, student };
      }

      // Caso não haja tipo específico
      return user;
    } catch (error) {
      // Caso não encontre (ex: user não é funcionário)
      return user;
    }
  }
}
