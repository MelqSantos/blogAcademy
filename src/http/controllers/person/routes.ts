import { FastifyInstance } from 'fastify'
import { create } from './create'
import { personSchemas } from '@/http/schemas/swagger/person-swagger';
import { findPerson } from './find-person';
import { findByRole } from './find-by-role';

export async function personRoutes(app: FastifyInstance) {
  app.post('/person', {
    schema: {
      tags: ['People'],
      summary: 'Criar pessoa',
      body: personSchemas.personCreate,
    },
    handler: create
  });

  app.get('/person/:id_user', {
    schema: {
      tags: ['Person'],
      summary: 'Buscar person por Id_user',
      params: personSchemas.personByIdUser,
    },
    handler: findPerson,
  });

  app.get('/person/role/:role', {
    schema: {
      tags: ['Person'],
      summary: 'Buscar person por role',
      params: personSchemas.personByRole,
    },
    handler: findByRole,
  });

}
