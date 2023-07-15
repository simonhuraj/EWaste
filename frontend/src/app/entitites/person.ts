import {Position} from "./position";

export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public quantity: number,
    public position: Position,
    public personId?: number,
  ) {
  }
}
