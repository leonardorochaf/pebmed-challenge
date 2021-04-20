export const idPatientPath = {
  get: {
    tags: ['Paciente'],
    summary: 'Endpoint para listar um paciente',
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
      200: {
        description: 'Sucesso. Retorna as informações do paciente buscado.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/defaultPatientResponse'
            }
          }
        }
      },
      404: {
        description: 'Paciente não encontrado no sistema',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
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
  put: {
    tags: ['Paciente'],
    summary: 'Endpoint atualizar os dados de um paciente',
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
            $ref: '#/schemas/updatePatientRequest'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso. Retorna as informações atualizadas do paciente.',
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
      404: {
        description: 'Paciente não encontrado no sistema',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
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
  delete: {
    tags: ['Paciente'],
    summary: 'Endpoint para deletar um paciente',
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
      404: {
        description: 'Paciente não encontrado no sistema',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorResponse'
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
