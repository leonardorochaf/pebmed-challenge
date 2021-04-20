import { loginPath } from './paths/auth/login-path'
import { logoutPath } from './paths/auth/logout-path'
import { signUpPath } from './paths/auth/sign-up-path'
import { basePatientPath } from './paths/patient/base-patient-path'
import { idPatientPath } from './paths/patient/id-patient-path'
import { apiKeyAuthHeader } from './schemas/api-key-auth-schema'
import { createPatientRequest } from './schemas/create-patient-schema'
import { createScheduleRequest } from './schemas/create-schedule-schema'
import { defaultPatientResponse } from './schemas/default-patient-schema'
import { errorResponse } from './schemas/error-schema'
import { loginRequest, loginResponse } from './schemas/login-schema'
import { signUpRequest } from './schemas/sign-up-schemas'
import { updatePatientRequest } from './schemas/update-patient-schema'
import { validationErrorResponse } from './schemas/validation-error-schema'
import { defaultScheduleResponse } from './schemas/default-schedule-schema'
import { baseSchedulePath } from './paths/schedule/base-schedule-path'
import { updateScheduleRequest } from './schemas/update-schedule-schema'
import { idSchedulePath } from './paths/schedule/id-schedule-path'
import { createAppointmentRequest } from './schemas/create-appointment-schema'
import { baseAppointmentPath } from './paths/appointment/base-appointment.path'
import { defaultAppointmentResponse } from './schemas/default-appointment-schema'
import { appointmentsByPatientPath } from './paths/appointment/appointments-by-patient.path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Pebmed Challenge API',
    description: 'API para o desafio backend da Pebmed',
    version: '1.0.0'
  },
  servers: [{
    url: '/api/v1'
  }],
  tags: [
    {
      name: 'Autenticação'
    },
    {
      name: 'Paciente'
    },
    {
      name: 'Agendamento'
    },
    {
      name: 'Consulta'
    }
  ],
  paths: {
    '/auth/signup': signUpPath,
    '/auth/login': loginPath,
    '/auth/logout': logoutPath,
    '/patients': basePatientPath,
    '/patients/{id}': idPatientPath,
    '/schedules': baseSchedulePath,
    '/schedules/{id}': idSchedulePath,
    '/appointments': baseAppointmentPath,
    '/appointments/patient/{patientId}': appointmentsByPatientPath
  },
  schemas: {
    signUpRequest: signUpRequest,
    loginRequest: loginRequest,
    loginResponse: loginResponse,
    errorResponse: errorResponse,
    validationErrorResponse: validationErrorResponse,
    createPatientRequest: createPatientRequest,
    updatePatientRequest: updatePatientRequest,
    defaultPatientResponse: defaultPatientResponse,
    createScheduleRequest: createScheduleRequest,
    updateScheduleRequest: updateScheduleRequest,
    defaultScheduleResponse: defaultScheduleResponse,
    createAppointmentRequest: createAppointmentRequest,
    defaultAppointmentResponse: defaultAppointmentResponse
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthHeader
    }
  }
}
