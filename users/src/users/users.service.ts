import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UserPermissionItemsEntity } from './entities/user-permission-items.entity';
import MENU_CONFIG from 'src/util/menu';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,

    @InjectRepository(UserPermissionItemsEntity)
    private readonly userPermissionItemsRepo: Repository<UserPermissionItemsEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async update(id: string, data: Partial<CreateUserDto>) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    this.userRepo.merge(user, data);
    return await this.userRepo.save(user);
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: conditions,
        ...options,
        relations: ['userType', 'permissionsItems'],
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Usuario nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async addPermissions(
    userId: string,
    permissionItemId: string,
  ): Promise<UserPermissionItemsEntity> {
    return await this.userPermissionItemsRepo.save({
      userId,
      permissionItemId,
    });
  }

  async removePermissions(
    userId: string,
    permissionItemId: string,
  ): Promise<void> {
    await this.userPermissionItemsRepo.delete({
      userId,
      permissionItemId,
    });
  }

  async getMenu(user: any) {
    if (!user || !user.institution) {
      return [];
    }

    const mainInstitution = user.institution;

    console.log(mainInstitution)

    const institutions = !mainInstitution.institutionParent
      ? [mainInstitution, ...(mainInstitution.children || [])]
      : [mainInstitution];

    const fullMenu = institutions.map((inst) => ({
      label: inst.name,
      children: this.buildInstitutionMenu(inst.id, user.permissions, mainInstitution.educationLevel?.name),
    }));

    return fullMenu;
  }

 private buildInstitutionMenu(
  institutionId: number,
  permissions: string[],
  institutionType: string // ← adicionamos o tipo da instituição aqui
) {
  return MENU_CONFIG.filter((menu) =>
    permissions.includes(menu.permission)
  ).map((menu) => {
    const menuItem: any = {
      label: menu.label,
      icon: menu.icon,
    };

    // Se houver submenus
    if (menu?.children) {
      const children = menu.children
        .filter((sub) => permissions.includes(sub.permission))
        .map((sub) => ({
          label: sub.label,
          path: sub.path(institutionId),
        }));

      if (children.length > 0) {
        menuItem.children = children;
      } else if (menu.path) {
        menuItem.path = this.resolvePath(
          menu.path,
          institutionId,
          institutionType
        );
      }
    } else if (menu.path) {
      menuItem.path = this.resolvePath(
        menu.path,
        institutionId,
        institutionType
      );
    }

    return menuItem;
  });
}

// Função auxiliar para decidir o path correto conforme o tipo de instituição
private resolvePath(
  pathFn: (id: number) => string,
  institutionId: number,
  institutionType: string
): string {
  const basePath = pathFn(institutionId);

  // Se o path já for customizado, retorna
  if (!basePath.includes('/grades')) return basePath;

  // Decide o destino com base no tipo
  switch (institutionType.toLowerCase()) {
    case 'ensino geral':
      return `/institution/${institutionId}/grades`;
    case 'jardim de infancia':
      return `/institution/${institutionId}/levels`;
    default:
      return `/institution/${institutionId}/courses`;
  }
}

}
