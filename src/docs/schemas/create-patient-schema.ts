export const createPatientRequest = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    birthday: {
      type: 'string',
      format: 'date'
    },
    gender: {
      type: 'string',
      enum: ['Masculino', 'Feminino', 'Prefiro não informar']
    },
    height: {
      type: 'number'
    },
    weight: {
      type: 'number'
    }
  },
  required: ['name', 'phone', 'email', 'birthday', 'gender', 'height', 'weight']
}
