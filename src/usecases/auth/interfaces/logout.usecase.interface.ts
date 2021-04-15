export interface ILogoutUsecase {
  execute: (token: string) => Promise<void>
}
