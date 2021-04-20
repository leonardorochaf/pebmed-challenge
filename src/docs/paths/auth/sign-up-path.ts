export const signUpPath = {
  post: {
    tags: ['Auth'],
    summary: 'Endpoint para cadastrar um médico',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#schemas/signUpRequest'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso'
      },
      400: {
        description: 'Email já cadastrado ou erro de validação',
        content: {
          'application/json': {
            schema: {
              anyOf: [
                {
                  $ref: '#/schemas/errorResponse'
                },
                {
                  $ref: '#/schemas/validationErrorResponse'
                }
              ]
            },
            examples: {
              Email: {
                value: {
                  error: 'string'
                }
              },
              Validação: {
                value: {
                  error: [
                    {
                      message: 'string'
                    },
                    {
                      message: 'string'
                    }
                  ]
                }
              }
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
