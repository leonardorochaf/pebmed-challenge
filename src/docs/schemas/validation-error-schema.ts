export const validationErrorResponse = {
  type: 'object',
  properties: {
    error: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    }
  },
  required: ['error']
}
