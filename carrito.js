document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    // Geolocalización para determinar el país del usuario
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(`https://geolocation-db.com/json/${lat}+${lon}`);
        const data = await res.json();

        document.getElementById('country').innerText = data.country_name || 'Desconocido';
    });

    // Inicializar el carrito desde localStorage si está disponible
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');        

    // Drag and Drop
    const products = document.querySelectorAll('.product');
    const dropZone = document.getElementById('dropZone');

    products.forEach(product => {
        product.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.dataset.name);
            event.dataTransfer.setData('price', event.target.dataset.price);
        });
    });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
    
        const name = event.dataTransfer.getData('text');
        const price = parseInt(event.dataTransfer.getData('price'));
    
        const cartItems = document.getElementById('cartItems');
        const item = document.createElement('div');
        item.innerHTML = `<p>${name} - Q. ${price} (1)</p>`;
        cartItems.appendChild(item);
    
        // Añadir el nuevo elemento al carrito y actualizar localStorage
        const newItem = { name, price, quantity: 1 };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    
        totalPrice += price;
        document.getElementById('totalPrice').innerText = totalPrice;
    });

    // Añadir un listener para el botón de confirmación
    const goToConfirmationButton = document.getElementById('goToConfirmation');
    goToConfirmationButton.addEventListener('click', () => {
        window.location.href = 'confirmar.html';
    });
    
});