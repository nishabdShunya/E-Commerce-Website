const storeMain = document.getElementById('store-main');
const cartContainer = document.getElementById('cart-container');
const cart = document.getElementById('cart');
const notificationContainer = document.getElementById('notification-container');
const totalSpan = document.getElementById('total-span');
const quantityInputs = document.getElementsByClassName('cart-item-quantity');

for (let i = 0; i < quantityInputs.length; i++) {
    qtyInput = quantityInputs[i];
    qtyInput.addEventListener('change', quantityChanged);
}

function quantityChanged(e) {
    const input = e.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }
    updateTotal();
}

storeMain.addEventListener('click', actions);

function actions(event) {
    if (event.target.innerText === 'Add To Cart') {
        addToCart(event.target);
    }
    if (event.target.innerText === 'See The Cart') {
        cartContainer.style.display = 'flex';
    }
    if (event.target.innerText === 'x') {
        cartContainer.style.display = 'none';
    }
    if (event.target.innerText === 'REMOVE') {
        event.target.parentElement.parentElement.parentElement.remove();
        updateTotal();
    }
    // if (event.target.name === 'item-quantity') {
    //     event.target.addEventListener('change', (e) => {
    //         if (isNaN(e.target.value) || e.target.value < 1) {
    //             e.target.value = 1;
    //         }
    //         updateTotal();
    //     });
    // }
};

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
                <li><button id="remove-btn">REMOVE</button></li>
            </ul>
        </li>`;
    cart.innerHTML += cartItem;
    showNotification();
    updateTotal();
};

function showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = 'Item successfully added to the cart.';
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

function updateTotal() {
    let total = 0;
    const cartItems = cart.getElementsByClassName('cart-item');
    for (let item of cartItems) {
        const price = parseFloat(item.getElementsByClassName('cart-item-price')[0].innerText.replace('$', ''));
        const quantity = parseFloat(item.getElementsByClassName('cart-item-quantity')[0].value);
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    totalSpan.innerText = '$' + total;
};