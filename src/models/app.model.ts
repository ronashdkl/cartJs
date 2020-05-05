import { Render } from "../render";

export interface Selector {
  listSelector?: string;
  summarySelector:string;
  addToCartButtonSelector: string;
  totalCartItemSelector: string;
  sampleProductSelector?: string;
}
export class App {
  constructor() {
    const renderer = new Render();
    const observable = renderer.cartEvents.cartItem.subscribe((x) =>
      renderer.render(x)
    );
    window.onbeforeunload = () => observable.unsubscribe();
  }
}
