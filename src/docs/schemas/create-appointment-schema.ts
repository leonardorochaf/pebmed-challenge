export const createAppointmentRequest = {
  type: 'object',
  properties: {
    observation: {
      type: 'string'
    },
    scheduleId: {
      type: 'string'
    }
  },
  required: ['observation', 'scheduleId']
}
