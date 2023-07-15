import {Person} from "./person";

export class Clazz {
  constructor(
    public name: string,
    public persons: Person[],
    public classId?: number,
  ) {
  }
}
