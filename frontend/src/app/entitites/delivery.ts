import {Category} from "./category";
import {Person} from "./person";
import {Manager} from "./manager";
import {State} from "./state";

export class Delivery {
  constructor(
    public deliveredProduct: string,
    public quantity: number,
    public brand: string,
    public deliveryDate: string,
    public specifications: string,
    public functional: boolean,
    public category: Category,
    public person: Person,
    public manager: Manager,
    public state: State,
    public deliveryId?: number,
  ) {
  }
}
