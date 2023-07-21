import {Category} from "./category";
import {Person} from "./person";
import {Manager} from "./manager";
import {State} from "./state";

export class Delivery {
  constructor(
    public deliveredProduct: string,
    public quantity: number,
    public brand: string,
    public deliveryDate: Date,
    public specifications: string,
    public functional: boolean,
    public category: Category,
    public person: Person,
    public user: Manager,
    public state: State,
    public deliveryId?: number,
  ) {
  }
}
