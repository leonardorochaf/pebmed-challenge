export const logoutPath = {
  post: {
    tags: ['Autenticação'],
    summary: 'Endpoint para deslogar do sistema',
    parameters: [
      {
        in: 'header',
        name: 'x-auth-token',
        schema: {
          type: 'string'
        },
        description: 'Token é opcional mas altamente recomendado de ser usado para ser feito o controle de logout da sessão.'
      }
    ],
    responses: {
      204: {
        description: 'Sucesso'
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
