export interface IGenerateToken {
  generate: (text: string) => Promise<string>
}
