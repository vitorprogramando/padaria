document.addEventListener("DOMContentLoaded", function() {
    const addToCartButton = document.getElementById("add-to-cart");
    const sendWhatsAppButton = document.getElementById("send-whatsapp");
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    let total = 0;

    addToCartButton.addEventListener("click", function() {
        const size = document.querySelector('input[name="size"]:checked');
        const accompaniments = document.querySelectorAll(".accompaniments input[type='checkbox']:checked");
        const drink = document.getElementById("drink").value;
        
        if (size && accompaniments.length > 0) {
            const sizePrice = size.value === "M" ? 15 : 20;
            addToCart(`Quentinha ${size.value}`, sizePrice);

            accompaniments.forEach(function(item) {
                addToCart(item.value, 0); // Acompanhamentos têm preço zero
            });

            addToCart(drink, parseFloat(document.getElementById("drink").options[document.getElementById("drink").selectedIndex].text.split("R$")[1]));
        } else {
            alert("Por favor, escolha o tamanho da quentinha e pelo menos um acompanhamento.");
        }
    });

    sendWhatsAppButton.addEventListener("click", function() {
        const items = Array.from(cartItems.children).map(item => item.textContent.trim()).join("%0A");
        const whatsappLink = `https://api.whatsapp.com/send?phone=SEUNUMERO&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20o%20pedido%3A%0A${items}%0ATotal%3A%20R%24%20${total.toFixed(2)}`;
        window.open(whatsappLink, '_blank');
    });

    function addToCart(itemName, itemPrice) {
        const newItem = document.createElement("li");
        newItem.textContent = `${itemName} - R$ ${itemPrice.toFixed(2)}`;
        cartItems.appendChild(newItem);
        total += itemPrice;
        totalElement.textContent = total.toFixed(2);
    }
});
