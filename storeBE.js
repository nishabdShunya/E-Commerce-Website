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

// Adding to the Cart (Used Event Bubbling)
const music = document.getElementById('music');
music.addEventListener('click', (event) => {
    if (event.target.innerText === 'Add To Cart') {
        addToCart(event.target);
    }
});

const merch = document.getElementById('merch');
merch.addEventListener('click', (event) => {
    if (event.target.innerText === 'Add To Cart') {
        addToCart(event.target);
    }
});

const cart = document.getElementById('cart');

function addToCart(addToCartBtn) {
    const item = addToCartBtn.parentElement.parentElement;
    const itemTitle = item.querySelector('.item-title').innerText;
    const itemImgSrc = item.querySelector('.item-img').src;
    const itemPrice = item.querySelector('.item-price').innerText;
    const cartItemsTitles = cart.getElementsByClassName('cart-item-title');
    for (let title of cartItemsTitles) {
        if (title.innerText === itemTitle) {
            alert('Item already added to the cart.');
            return;
        }
    }
    const cartItem = `
        <li class="cart-item">
            <ul>
                <li><img src="${itemImgSrc}" alt="${itemTitle}"></li>
                <li class = "cart-item-title">${itemTitle}</li>
                <li class = "cart-item-price">${itemPrice}</li>
                <li><input type="number" name="item-quantity" class="cart-item-quantity" value="1"></li>
                <li><button class="remove-btn">REMOVE</button></li>
            </ul>
        </li>`;
    cart.innerHTML += cartItem;
    updateTotal();
    showNotification();
    // Removing Items from the Cart
    const removeBtns = cart.getElementsByClassName('remove-btn');
    for (let btn of removeBtns) {
        btn.addEventListener('click', removeItem);
    }
    // Effect of changing quantity of the Items
    const quantityInputs = cart.getElementsByClassName('cart-item-quantity');
    for (let quantity of quantityInputs) {
        quantity.addEventListener('change', quantityChanged);
    }
};

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

// 
window.addEventListener('DOMContentLoaded', (event) => {
    axios.get('http://localhost:3000/products')
        .then(response => {
            const products = response.data;
            for (let product of products) {
                const musicList = document.getElementById('music-list');
                const musicListItem = `
                <li>
                    <h3 class="item-title">${product.title}</h3>
                    <div class="img-container">
                        <img class="item-img" src="${product.imageUrl}" alt="">
                    </div>
                    <div class="add-to-cart-container">
                        <p class="item-price"><span>$</span>${product.price}</p>
                        <button class="section-btns">Add To Cart</button>
                    </div>
                </li>`;
                musicList.innerHTML += musicListItem;
            }
        })
        .catch(err => console.log(err));
});