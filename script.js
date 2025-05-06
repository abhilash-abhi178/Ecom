// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    const item = { name, price, quantity: 1 };
    const existing = cart.find(p => p.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart`);
}

// Display cart items
if (document.getElementById('cart-items')) {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total-price');
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsDiv.appendChild(div);
        total += item.price * item.quantity;
    });

    totalDiv.innerText = `Total: $${total.toFixed(2)}`;
}

// Checkout
if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}
