export const basePatientPath = {
  post: {
    tags: ['Paciente'],
    summary: 'Endpoint para criar um paciente',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createPatientRequest'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso. Retorna as informações do paciente criado no banco.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/defaultPatientResponse'
            }
          }
        }
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
  },
  get: {
    tags: ['Paciente'],
    summary: 'Endpoint para listar todos os pacientes',
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      200: {
        description: 'Sucesso. Retorna as informações de todos os pacientes salvos no banco.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/defaultPatientResponse'
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
