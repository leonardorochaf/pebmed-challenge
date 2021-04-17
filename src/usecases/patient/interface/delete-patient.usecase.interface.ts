export interface IDeletePatientUsecase {
  execute: (patientId: string) => Promise<void>
}
