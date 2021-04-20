export const appointmentsByPatientPath = {
  get: {
    tags: ['Consulta'],
    summary: 'Endpoint para listar todas as consultas de um paciente',
    security: [{
      apiKeyAuth: []
    }],
    parameters: [{
      in: 'path',
      name: 'patientId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso. Retorna todas as consultas de um paciente salvas no banco',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/defaultAppointmentResponse'
              }
            }
          }
        }
      },
      401: {
        description: 'Erro de autenticação. Token inválido ou expirado.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
            }
          }
        }
      }
    }
  }
}
