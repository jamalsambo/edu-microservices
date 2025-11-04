const MENU_CONFIG = [
  {
    label: 'Instituição',
    icon: 'group',
    permission: 'create_employees',
    path: (id: number) => `/institution/${id}/employees`,
    children: [
      { label: 'Regimes', permission: 'create_employees', path: (id: number) => `/institution/${id}/regimes` },
      { label: 'Turnos', permission: 'create_employees', path: (id: number) => `/institution/${id}/shifts` },
      { label: 'Disciplinas', permission: 'create_employees', path: (id: number) => `/institution/${id}/disciplines` },
      { label: 'Salas', permission: 'create_employees', path: (id: number) => `/institution/${id}/rooms` },
      { label: 'Curriculums', permission: 'create_employees', path: (id: number) => `/institution/${id}/curriculums` },
      { label: 'Tipos de avaliação', permission: 'create_employees', path: (id: number) => `/institution/${id}/evolution-types` },
    ],
  },
  { label: 'Funcionários', icon: 'group', permission: 'create_employees', path: (id: number) => `/institution/${id}/employees` },
  { label: 'Estudantes', icon: 'group', permission: 'create_employees', path: (id: number) => `/institution/${id}/students` },
  { label: 'Classes', icon: 'group', permission: 'create_employees', path: (id: number) => `/institution/${id}/grades` },
  { label: 'Matriculas', icon: 'group', permission: 'create_employees', path: (id: number) => `/institution/${id}/enrollments` },
];

export default MENU_CONFIG