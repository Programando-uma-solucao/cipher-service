export class Encrypted {
  private data: string;
  private hash: string;

  constructor(data: string, hash: string) {
    this.data = data;
    this.hash = hash;
  }

  getData(): string {
    return this.data;
  }

  getHash(): string {
    return this.hash;
  }
}
