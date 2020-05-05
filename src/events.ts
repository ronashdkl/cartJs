import { Cart, CartItem } from './models/cart.model';
import { Product } from "./models/product.model";
import { animateAddToCart } from "./functions/animateCart";
import { Selector } from "./models/app.model";
import { Observable } from "rxjs";

declare let cartJsConfig: Selector;
declare var $: any;
export class CartEvents {
  constructor(
    private cart: Cart = new Cart(),
    private selector: Selector = cartJsConfig
  ) {
    this.triggerAddToCartButton();
  }
  get cartItem():Observable<CartItem> {
    return this.cart.observable;
  }
  detachEvents(){
    $("body").off("click");
  }
  listenAddToCartButton(event: any) {
    const target = $(event.target);
    const parent = target.parents(".item");
    const name = parent.find(".item-title").text();
    const price = parent.find(".item-price").data("price");
    const img = parent
      .find("img")
      .eq(0)
      .attr("src");
    animateAddToCart(target, this.selector.totalCartItemSelector);
    const item = new Product();
    item.id = Number.parseInt(target.data("id"));
    item.name = name;
    item.price = price;
    item.quantity = 1;
    item.image = img;
    this.cart.addItem(item);
  }

  listenQuantityButton(event: any) {
    const index = $(event.target).data("index");
    const type = $(event.target).data("type");
    type === "inc"
      ? this.cart.increaseQuantity(index, true)
      : this.cart.decreaseQuantity(index);
  }

  listenRemoveButton(event: any) {
    const index = $(event.target).data("index");
    this.cart.removeItem(index);
  }

  triggerAddToCartButton(){
    $("." + this.selector.addToCartButtonSelector).click((event:any) =>
    this.listenAddToCartButton(event)
  );
  }
   triggerDynamicButton() {
    const incDecButton = $(".inc-dec-button");
    incDecButton.on("click", (event:any) =>
      this.listenQuantityButton(event)
    );
    $(".cart-remove-item-button").on("click", (event:any) =>
      this.listenRemoveButton(event)
    );
  }
}
