export const idSchedulePath = {
  put: {
    tags: ['Agendamento'],
    summary: 'Endpoint para alterar o horário de um agendamento',
    security: [{
      apiKeyAuth: []
    }],
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateScheduleRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso. Retorna as informações atualizadas do agendamento.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/defaultScheduleResponse'
            }
          }
        }
      },
      400: {
        description: 'Horário de agendamento já cadastrado ou erro de validação.',
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
              Horário: {
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
      404: {
        description: 'Agendamento não encontrado no sistema.',
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
  delete: {
    tags: ['Agendamento'],
    summary: 'Endpoint para deletar um agendamento',
    security: [{
      apiKeyAuth: []
    }],
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso.'
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
      404: {
        description: 'Agendamento não encontrado no sistema.',
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
