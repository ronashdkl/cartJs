import { CartItem } from "./models/cart.model";
import { Selector } from "./models/app.model";
import { Product } from "./models/product.model";
import { CartEvents } from "./events";
import { generateName } from "./functions/randomNames";
declare var $: any;
declare let cartJsConfig: Selector;
export class Render {
  private listElement: HTMLElement;
  constructor(
    public cartEvents: CartEvents = new CartEvents(),
    private selector: Selector = cartJsConfig
  ) {
    this.listElement = document.getElementById(selector.listSelector);
    
    this.renderSampleProducts(3);
  }

  render(cart: CartItem) {
  this.cartEvents.detachEvents();
      this.renderCountItems(cart.totalItem);
    this.renderSummaryList(cart);
    this._drawTable(cart.list);
   
    this.cartEvents.triggerDynamicButton();
  }

  private renderSummaryList(cart: CartItem) {
    let html = ``;

    for (let index = 0; index < cart.list.length; index++) {
      html += `
         <li>
         <span class="item">
           <span class="item-left">
               <img style="width:30px; hright:20px" src="${
                 cart.list[index].image
               }" alt="cart_item" />
               <span class="item-info">
                   <span>${cart.list[index].name} </span>
                   <span>
                   <button data-type="inc" data-index="${index}" class="btn btn-xs btn-success inc-dec-button">+</button>
                   ${cart.list[index].quantity}
                   <button data-type="dec" data-index="${index}" class="btn btn-xs btn-danger inc-dec-button">-</button>
                   </span>
                   <span>$${cart.list[index].price *
                     cart.list[index].quantity}</span>
               </span>
           </span>
           <span class="item-right">
               <button  data-index="${
                 cart.list[index].id
               }" class="btn btn-xs btn-danger pull-right cart-remove-item-button">x</button>
           </span>
       </span>
     </li>
         `;
    }

    html += `
      <li class="divider"></li>
  <li>
  Total: $${cart.totalAmount}
  </li>
  <li><a class="text-center" href="/cart.html">View Cart</a></li>
      `;
    $("." + this.selector.summarySelector).html(html);
  }

  private _drawTable(items: Product[]) {
    if (this.listElement) {
      this.clearList();
      $("#" + this.selector.listSelector).html(`
      <table class="table">
        <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
    </tr>
    <tbody id='cart-table-body'>
    </tbody>
      </table>
      `);

      items.forEach((x: Product, index: number) => {
        $("#cart-table-body").append(`
      <tr>
      <td>${x.name}</td>
      <td>
      <button data-type="inc" data-index="${index}" class="btn btn-success inc-dec-button">+</button>
      ${x.quantity}
      <button data-type="dec" data-index="${index}" class="btn btn-danger inc-dec-button">-</button>
      </td>
      <td>${x.price * x.quantity}</td>
      <td id='${x.id}-action'>
      <button data-index="${
        x.id
      }" class="btn btn-danger btn-sm cart-remove-item-button">Remove</button></td>
      </tr>
      `);
      });
    }
  }

  

  private clearList() {
    this.listElement.innerHTML = null;
  }

  private renderCountItems(total: number) {
    $("." + this.selector.totalCartItemSelector).html(total.toString());
  }

  private renderSampleProducts(numberOfProducts: number) {
    if (!this.selector.sampleProductSelector) return;

    $("#" + this.selector.sampleProductSelector).html(
      `<div class="row" id="items"></div>`
    );
    let html: string = "<div class='col-sm-12'><h2>Products sample</h2></div>";
    for (let index = 0; index < numberOfProducts; index++) {
      const price = Math.floor((Math.random() + 1) * (index + 560));
      html += `
      <div class="col-sm-4 item">
      <div class="card">
      <img src="https://picsum.photos/id/${index +
        1}/250/150" class="card-img-top" alt="https://picsum.photos/200/300">
      <div class="card-body">
        <h5 class="card-title item-title">${generateName()}</h5>
        <p>Price <span class="item-price" data-price="${price}">$ ${price}</span></p>
        <p  class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button data-id="${index}" class="btn btn-primary ${
        this.selector.addToCartButtonSelector
      }">Add to Cart</button>
      </div>
    </div>
    </div>
      `;
    }
    $("#items").html(html);
    $("#items").append(`
   
 
    <textarea style="border: none;background-color:white;" disabled class="form-control" rows="10"> 
   <div class="item"> // class item is required. 
        <img src="..."> // img tag is required
        <h5 class="item-title">PRODUCT_NAME</h5> // class item-title is required
        <span class="item-price" data-price="PRODUCT_PRICE">PRODUCT_PRICE</span>// class item-price and attribute data-price is required
        <button data-id="PRODUCT_ID" class="btn btn-primary addToCartBtn">Add to Cart</button> //attribute data-id is required, addToCartBtn is button  selector
    </div></textarea>
    
    <pre><code>
    Following config must decleare before cart.js 
   
    cartJsConfig = {
      listSelector:'item-list', // Attribute type ID - will render cart items inside this node
      addToCartButtonSelector:'addToCartBtn', //will trigger Add to Cart button
      totalCartItemSelector:'cart-total-items', // will render number of items in cart
      sampleProductSelector:'sample-products' //development purpose only
  };
    </code></pre>
    <textarea style="border: none;background-color:white;" disabled class="form-control" rows="5">
    Dependency 
    "jquery": "^3.5.0",
    "jquery-ui": "^1.12.1",
    </textarea>
<hr>
    <textarea style="border: none;" disabled class="form-control" rows="10">
   <body>
   <span class="cart-total-items"></span>
   <div id="item-list"></div>
   </body>
    <script src="jquery.min.js"></script>
    <script src="jquery-ui.js"></script>
    <script>
        cartJsConfig = {
            listSelector:'item-list',
            addToCartButtonSelector:'add-to-cart-button',
            totalCartItemSelector:'cart-total-items',
            sampleProductSelector:'sample-products'
        };
    </script>
    <script src="cart.js"></script>
    </textarea>
    `);
    this.cartEvents.triggerAddToCartButton();
  }
}
