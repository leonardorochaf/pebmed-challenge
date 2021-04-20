export const loginRequest = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['email', 'password']
}

export const loginResponse = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    }
  },
  required: ['token']
}
