export const updateScheduleRequest = {
  type: 'object',
  properties: {
    time: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['time']
}
