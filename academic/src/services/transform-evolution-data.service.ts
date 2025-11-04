/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformEvolutionData {
  async transformEvolutionView(students: any): Promise<string[]> {
    const periodosMap = new Map();

    for (const student of students) {
      const studentId = student.id || 'Sem id';
      const nome = student.basicInformation?.fullName || 'Sem nome';
      const evolutions = student.evolutions || [];
      const disciplinas =
        student.enrollments?.classe?.curriculum?.curriculumDiscipline || [];

      for (const d of disciplinas) {
        const periodoId = d.periodId;
        const periodoNome = d.period?.name || `Período ${d.year || ''}`;

        if (!periodosMap.has(periodoId)) {
          periodosMap.set(periodoId, {
            periodName: periodoNome,
            students: [],
          });
        }

        const periodo = periodosMap.get(periodoId);

        // Verifica se o estudante já existe nesse período
        let estudante = periodo.students.find((s) => s.studentId === studentId);

        if (!estudante) {
          estudante = { nome, studentId, disciplinas: [] };
          periodo.students.push(estudante);
        }

        // Mapeia os tipos de evolução e notas associadas
        const evolutionTypes = (d.evolutionTypes || []).map((ev) => {
          const notaEncontrada = evolutions.find(
            (evo) =>
              evo.disciplineId === d.id &&
              evo.evolutionTypeId === ev.evolutionTypeId,
          );

          return {
            evolutionTypeId: ev.evolutionTypeId,
            percentage: ev.percentage,

            noteId: notaEncontrada ? notaEncontrada.id : null,
            nota: notaEncontrada ? notaEncontrada.note : null,
            observations: notaEncontrada ? notaEncontrada.observations : null,
            evolutionType: {
              id: ev.evolutionType.id,
              name: ev.evolutionType.name,
              type: ev.evolutionType.type,
            },
          };
        });

        estudante.disciplinas.push({
          id: d.id || 'Sem id',
          disciplina: d.discipline?.name || 'Sem nome',
          exame: d?.exame || false,
          participation: d?.participation || false,
          critical: d?.critical || false,
          year: d?.year || 1,
          evolutionTypes,
        });
      }
    }

    return Array.from(periodosMap.values());
  }
}
