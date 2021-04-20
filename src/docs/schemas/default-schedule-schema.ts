export const defaultScheduleResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    time: {
      type: 'string',
      format: 'date-time'
    },
    patient: {
      type: 'object',
      $ref: '#/schemas/defaultPatientResponse'
    }
  },
  required: ['id', 'time', 'patient']
}
