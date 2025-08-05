import { FastifyInstance } from 'fastify'
import { create } from './create'
import { personSchemas } from '@/http/schemas/swagger/person-swagger';

export async function personRoutes(app: FastifyInstance) {
  app.post('/person', {
    schema: {
      tags: ['People'],
      summary: 'Buscar pessoa completa',
      body: personSchemas.personCreate,
    },
    handler: create
  });
}
