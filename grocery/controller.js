let db = firebase.firestore();
let storage = firebase.storage();
let products = [];
let cart = [
  {
    id: "9cxk19XDE1IVcdBS7Iqk",
    count: 5
  },
  {
    id: "VjYHGAHQZGmHAX3BqDf5",
    count: 2
  },
  {
    id: "n2kR4sieMuZdBlV6VJoW",
    count: 2
  },
];

const COLLECTION_PRODUCT = 'products';

function addToCart(id) {
  // card ...
}

function removeFromCart(id) {
  // card ...
}

function createOrder() {
    if(cart.length == 0) alert("Сагс тань хоосон байна")
}

function init() {
  db.collection(COLLECTION_PRODUCT).onSnapshot(drawFromSnapshot);
}

function drawFromSnapshot(snapshots) {
  snapshots.forEach(async(doc) => {
      var imageName = doc.data().image;
      var item = doc.data();
      var downloadUrl = await storage.ref(`productImages/${imageName}`).getDownloadURL();
      var product = {
        ...item,
        image: downloadUrl,
        id: doc.id
      }
      products.push(product);
      draw(products);
  });
}

window.onload = init;