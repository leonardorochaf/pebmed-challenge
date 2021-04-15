export interface IHasherComparer {
  compare: (text: string, hashedText: string) => Promise<boolean>
}
