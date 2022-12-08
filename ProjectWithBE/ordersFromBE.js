const ordersList = document.getElementById('orders-list');

window.addEventListener('DOMContentLoaded', showOrders);

function showOrders(event) {
    axios.get('http://localhost:3000/orders')
        .then(response => {
            const orders = response.data;
            for (let order of orders) {
                const orderItem = `
                <li class="order-items">
                    <h3>Order Id: ${order.id}</h3>
                    <hr>
                    <ul id="${order.id}" class="order-products-list"></ul>
                </li>`;
                ordersList.innerHTML += orderItem;
            }
            for (let order of orders) {
                const orderProducts = document.getElementById(order.id);
                const products = order.products;
                for (let product of products) {
                    const productDetails = `<li>${product.title}(${product.orderItem.quantity})</li>`;
                    orderProducts.innerHTML += productDetails;
                }
            }
        })
        .catch(err => console.log(err));
}