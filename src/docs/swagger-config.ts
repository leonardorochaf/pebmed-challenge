import { loginPath } from './paths/auth/login-path'
import { logoutPath } from './paths/auth/logout-path'
import { signUpPath } from './paths/auth/sign-up-path'
import { basePatientPath } from './paths/patient/base-patient-path'
import { idPatientPath } from './paths/patient/id-patient-path'
import { apiKeyAuthHeader } from './schemas/api-key-auth-schema'
import { createPatientRequest } from './schemas/create-patient-schema'
import { defaultPatientResponse } from './schemas/default-patient-schema'
import { errorResponse } from './schemas/error-schema'
import { loginRequest, loginResponse } from './schemas/login-schema'
import { signUpRequest } from './schemas/sign-up-schemas'
import { updatePatientRequest } from './schemas/update-patient-schema'
import { validationErrorResponse } from './schemas/validation-error-schema'

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
    }
  ],
  paths: {
    '/auth/signup': signUpPath,
    '/auth/login': loginPath,
    '/auth/logout': logoutPath,
    '/patients': basePatientPath,
    '/patients/{id}': idPatientPath
  },
  schemas: {
    signUpRequest: signUpRequest,
    loginRequest: loginRequest,
    loginResponse: loginResponse,
    errorResponse: errorResponse,
    validationErrorResponse: validationErrorResponse,
    createPatientRequest: createPatientRequest,
    updatePatientRequest: updatePatientRequest,
    defaultPatientResponse: defaultPatientResponse
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthHeader
    }
  }
}
