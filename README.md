# Cart Js

jQuery based cart management. 

```
npm start
```

```
npm run build
```

or

```
yarn build
```

to bundle this application

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
