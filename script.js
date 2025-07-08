// Sample product data
const products = [
  {
    id: "classic-cheeseburger",
    name: "Classic Cheeseburger",
    image: "images/burger1.jpg",
    description: "A juicy beef patty topped with melted cheese, fresh lettuce, tomato, and our special sauce.",
    price: 199
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    image: "images/burger2.jpg",
    description: "Delicious veggie patty with avocado, sprouts, and tangy mayo. Served with sweet potato fries.",
    price: 179
  },
  {
    id: "spicy-bbq-burger",
    name: "Spicy BBQ Burger",
    image: "images/burger3.jpg",
    description: "Grilled chicken breast with spicy BBQ sauce, jalapenos, crispy onions, and chipotle mayo.",
    price: 229
  }
];

// Add to Cart (from index.html or product.html)
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === productId);
  if (!product) return;

  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Product Detail Page Handler
function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) return;

  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-price").textContent = `₹${product.price}`;
  document.getElementById("product-image").src = product.image;

  // Save productId to be used on button click
  window.selectedProductId = productId;
}

function addToCartFromDetail() {
  if (window.selectedProductId) {
    addToCart(window.selectedProductId);
  }
}

// Display Cart Items (in cart.html)
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("total-price");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.textContent = "₹0";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalContainer.textContent = `₹${total}`;
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

// Submit payment (dummy)
function placeOrder(event) {
  event.preventDefault();
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// Auto-load product detail if needed
if (window.location.pathname.includes("product.html")) {
  window.addEventListener("DOMContentLoaded", loadProductDetail);
}

// Auto-load cart items if on cart page
if (window.location.pathname.includes("cart.html")) {
  window.addEventListener("DOMContentLoaded", displayCartItems);
}
