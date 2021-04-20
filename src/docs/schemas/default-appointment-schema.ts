export const defaultAppointmentResponse = {
  type: 'object',
  properties: {
    observation: {
      type: 'string'
    },
    schedule: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        time: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  },
  required: ['observation', 'schedule']
}
