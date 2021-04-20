export const createScheduleRequest = {
  type: 'object',
  properties: {
    time: {
      type: 'string',
      format: 'date-time'
    },
    patientId: {
      type: 'string'
    }
  },
  required: ['time', 'patientId']
}
