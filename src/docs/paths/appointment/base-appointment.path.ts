export const baseAppointmentPath = {
  post: {
    tags: ['Consulta'],
    summary: 'Endpoint para criar uma consulta',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createAppointmentRequest'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso.'
      },
      400: {
        description: 'Erro de validação',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/validationErrorResponse'
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
