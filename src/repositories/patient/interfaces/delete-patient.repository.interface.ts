export interface IDeletePatientRepository {
  logicalDelete: (patientId: string) => Promise<void>
}
