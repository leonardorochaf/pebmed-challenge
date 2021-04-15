export interface IDeleteSessionRepository {
  logicalDelete: (sessionId: string) => Promise<void>
}
