// Opening & Closing the Cart
const cartContainer = document.getElementById('cart-container');

const seeCartBtn = document.getElementById('see-cart-btn');
seeCartBtn.addEventListener('click', (event) => {
    cartContainer.style.display = 'flex';
})

const navCartBtn = document.getElementById('cart-nav-link');
navCartBtn.addEventListener('click', (event) => {
    cartContainer.style.display = 'flex';
})

const cartXBtn = document.getElementById('cart-close-btn');
cartXBtn.addEventListener('click', (event) => {
    cartContainer.style.display = 'none';
})

// const cart = document.getElementById('cart');


function removeItem(event) {
    event.target.parentElement.parentElement.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let totalQty = 0;
    const cartItems = cart.getElementsByClassName('cart-item');
    for (let item of cartItems) {
        const price = parseFloat(item.getElementsByClassName('cart-item-price')[0].innerText.replace('$', ''));
        const quantity = parseFloat(item.getElementsByClassName('cart-item-quantity')[0].value);
        total = total + (price * quantity);
        totalQty = totalQty + quantity;
    }
    total = Math.round(total * 100) / 100;
    const totalSpan = document.getElementById('total-span');
    totalSpan.innerText = '$' + total;
    const navCartQty = document.getElementById('cart-qty');
    navCartQty.innerText = totalQty;
};

function showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = 'Item successfully added to the cart.';
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Purchase
document.getElementById('purchase-btn').addEventListener('click', (event) => {
    alert('Thank you for yout purchase.')
    while (cart.hasChildNodes()) {
        cart.removeChild(cart.firstChild)
    }
    updateTotal();
});

// BACKEND
const productList = document.getElementById('product-list');
const cart = document.getElementById('cart');

window.addEventListener('DOMContentLoaded', (event) => {
    axios.get('http://localhost:3000/products')
        .then(response => {
            const products = response.data;
            for (let product of products) {
                const productListItem = `
                <li>
                    <h3 class="item-title">${product.title}</h3>
                    <div class="img-container">
                        <img class="item-img" src="${product.imageUrl}" alt="">
                    </div>
                    <div class="add-to-cart-container">
                        <p class="item-price"><span>$</span>${product.price}</p>
                        <button class="section-btns" type="submit" onClick="addToCart('${product.id}', '${product.title}', '${product.imageUrl}', '${product.price}')">Add To Cart</button>
                    </div>
                </li>`;
                productList.innerHTML += productListItem;
            }
        })
        .catch(err => console.log(err));
});

function addToCart(id, title, image, price) {
    const productDetails = {
        id: id,
        title: title,
        image: image,
        price: price
    }
    axios.post('http://localhost:3000/cart', productDetails)
        .then(response => {
            const cartProduct = response.data;
            const cartItem = `
            <li class="cart-item">
                <ul>
                    <li><img src="${cartProduct.image}" alt="${cartProduct.title}"></li>
                    <li class = "cart-item-title">${cartProduct.title}</li>
                    <li class = "cart-item-price">${cartProduct.price}</li>
                    <li><input type="number" name="item-quantity" class="cart-item-quantity" value="1"></li>
                    <li><button class="remove-btn">REMOVE</button></li>
                </ul>
            </li>`;
            cart.innerHTML += cartItem;
        })
        .catch(err => console.log(err));
}