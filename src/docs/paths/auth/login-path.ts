export const loginPath = {
  post: {
    tags: ['Auth'],
    summary: 'Endpoint para logar no sistema',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso. Retorna o token de acesso gerado pela sessão e que deverá ser usado em todas as outras requisições feitas no sistema.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loginResponse'
            }
          }
        }
      },
      400: {
        description: 'Credenciais inválidas ou erro de validação',
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
              Credenciais: {
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
