document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    storedCart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button class="centrado" onclick="removeItem('${item.name}')"><span>Eliminar</span></button>
        `;
        cartItems.appendChild(div);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice;

    document.getElementById('confirmButton').addEventListener('click', () => {
        
        alert('Compra confirmada');
        localStorage.removeItem('cart'); // Limpiar el carrito
        window.location.href = 'index.html'; // Redirigir a la página principal
    });
});

function removeItem(name) {
    let storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    storedCart = storedCart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    window.location.reload(); // Recarga la página para actualizar el carrito
}