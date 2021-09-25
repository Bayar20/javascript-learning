function draw(products) {
  let $products = document.querySelector('#products-container');
  $products.innerHTML = '';

  products.forEach(products => {
      $newProduct = $createProduct(products);

      if(products){
          $products.append($newProduct)
      }
  });
}

function $createProduct(item) {
  let $product =  document.createElement('div');
  let $productContent = `<div class="card flex">
        <img class="flex-2" src="${item.image}" alt="${item.name}">
        <div class="Text flex-1">
          <h3>${item.name}</h3>
          <p id='num'>1kg, Price</p>
        </div>
        <div class="flex Price flex-1">
          <h1>${item.price}</h1>
          <span class="flex plus">+</span>
        </div>
      </div>`;
  $product.innerHTML = $productContent;
  return $product;
}


