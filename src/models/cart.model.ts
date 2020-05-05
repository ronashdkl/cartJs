import { Product } from "./product.model";
import { BehaviorSubject } from "rxjs";
import * as ls from "local-storage";
export interface CartItem {
  list: Product[];
  totalItem: number;
  totalAmount: number;
}
export class Cart {
  private list: Product[] = ls.get<Product[]>("cart-items");
  private totalItem: number = ls.get<number>("cart-count");
  private cartItem: BehaviorSubject<CartItem>;
  private totalAmount: number = ls.get<number>("cart-amount");
  constructor() {
    this.initListItems();
    this.initTotalItem();
    this.cartItem = new BehaviorSubject<CartItem>(this._prepareAndBroadcast());
  }
  private _prepareAndBroadcast() {
    return {
      list: this.list,
      totalItem: this.totalItem,
      totalAmount: this.totalAmount,
    };
  }
  initListItems() {
    if (this.list === null) {
      ls.set<Product[]>("cart-items", []);
      this.list = [];
    }
  }

  initTotalItem() {
    if (this.totalItem === null) {
      ls.set<number>("cart-count", 0);
      this.totalItem = 0;
    }
  }
  initTotalAmount() {
    if (this.totalAmount === null) {
      ls.set<number>("cart-amount", 0);
      this.totalAmount = 0;
    }
  }
  get observable() {
    return this.cartItem.asObservable();
  }

  total() {
    let ttl = 0;
    let count = 0;

    this.list.forEach((x) => {
      ttl = ttl + x.quantity * x.price;
      count = count + x.quantity;
    });

    this.totalItem = count;
    this.totalAmount = ttl;
  }

  addItem(item: Product) {
    const index = this.list.findIndex((x) => x.id === item.id);
    index === -1 ? this.list.push(item) : this.increaseQuantity(index);

    this.save();
  }

  increaseQuantity(index: number, save: boolean = false) {
    this.list[index].quantity++;

    if (save) this.save();
  }
  decreaseQuantity(index: number) {
    if (this.list[index].quantity > 0) this.list[index].quantity--;
    this.save();
  }

  removeItem(id: number) {
    this.list = this.list.filter((x: Product) => {
      return x.id !== id;
    });
    this.save();
  }

  private save() {
    this.total();
    ls.set<Product[]>("cart-items", this.list);
    ls.set<number>("cart-count", this.totalItem);
    ls.set<number>("cart-amount", this.totalAmount);
    this.cartItem.next(this._prepareAndBroadcast());
  }
}
