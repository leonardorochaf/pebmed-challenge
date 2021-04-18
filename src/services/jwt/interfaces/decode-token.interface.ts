export interface IDecodeToken {
  decode: (token: string) => Promise<string>
}
