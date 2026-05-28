const dishes = [
    {
        id: "sashimi-syntax",
        name: "Sashimi Syntax",
        desc: "Fatias de salmao fresco com finalizacao leve.",
        price: 52,
        type: "sashimi"
    },
    {
        id: "uramaki-loop",
        name: "Uramaki Loop",
        desc: "Salmao, cream cheese e cebolinha.",
        price: 38,
        type: "roll"
    },
    {
        id: "temaki-script",
        name: "Temaki Script",
        desc: "Cone crocante com salmao e molho especial.",
        price: 29,
        type: "temaki"
    },
    {
        id: "hot-roll-debug",
        name: "Hot Roll Debug",
        desc: "Empanado sequinho com toque de tare.",
        price: 34,
        type: "roll"
    },
    {
        id: "nigiri-commit",
        name: "Nigiri Commit",
        desc: "Dupla de nigiri com salmao selado.",
        price: 22,
        type: "sashimi"
    },
    {
        id: "hossomaki-bit",
        name: "Hossomaki Bit",
        desc: "Alga nori, arroz japones e recheio de salmao.",
        price: 24,
        type: "roll"
    },
    {
        id: "joy-function",
        name: "Joy Function",
        desc: "Bolinho de arroz com salmao e cream cheese.",
        price: 31,
        type: "roll"
    },
    {
        id: "combo-pull-request",
        name: "Combo Pull Request",
        desc: "12 pecas variadas para revisar com calma.",
        price: 66,
        type: "roll"
    }
];

const combo = {
    id: "combo-full-stack",
    name: "Combo Full Stack",
    desc: "24 pecas com uramaki, hossomaki, nigiri e sashimi.",
    price: 118,
    type: "roll"
};

const icons = {
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>'
};

const deliveryPrice = 8;
const menuGrid = document.querySelector("#menuGrid");
const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCart = document.querySelector("#closeCart");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartSubtotal = document.querySelector("#cartSubtotal");
const cartTotal = document.querySelector("#cartTotal");
const deliveryFee = document.querySelector("#deliveryFee");
const checkoutButton = document.querySelector("#checkoutButton");
const checkoutModal = document.querySelector("#checkoutModal");
const closeCheckout = document.querySelector("#closeCheckout");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutTotal = document.querySelector("#checkoutTotal");
const deliveryType = document.querySelector("#deliveryType");
const addressField = document.querySelector("#addressField");
const toast = document.querySelector("#toast");
const navLinks = document.querySelector("#navLinks");
const menuToggle = document.querySelector("#menuToggle");
let cart = [];

const savedCart = localStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}
let toastTimer;

function formatBRL(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function getDeliveryTotal() {
    return deliveryType.value === "pickup" || cart.length === 0 ? 0 : deliveryPrice;
}

function getSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getTotal() {
    return getSubtotal() + getDeliveryTotal();
}

function renderMenu() {
    menuGrid.innerHTML = dishes.map((dish, index) => `
        <article class="menu-card">
            <div class="dish-art ${dish.type}">
                <button class="favorite" type="button" aria-label="Favoritar ${dish.name}">
                    ${icons.heart}
                </button>
                <div class="mini-rolls" aria-hidden="true">
                    <i></i><i></i><i></i><i></i>
                </div>
            </div>
            <div class="card-body">
                <h3>${dish.name}</h3>
                <p>${dish.desc}</p>
                <div class="price-row">
                    <span class="price">${formatBRL(dish.price)}</span>
                    <button class="add-button" type="button" data-add="${index}" aria-label="Adicionar ${dish.name}">
                        ${icons.plus}
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderCart() {
    const subtotal = getSubtotal();
    const delivery = getDeliveryTotal();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    cartCount.textContent = itemCount;
    cartSubtotal.textContent = formatBRL(subtotal);
    deliveryFee.textContent = delivery === 0 ? "Gratis" : formatBRL(delivery);
    cartTotal.textContent = formatBRL(subtotal + delivery);
    checkoutTotal.textContent = formatBRL(subtotal + delivery);
    checkoutButton.disabled = cart.length === 0;
    cartEmpty.classList.toggle("hidden", cart.length > 0);

    cartItems.innerHTML = cart.map((item) => `
        <article class="cart-item">
            <div class="cart-item-art" aria-hidden="true"></div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${formatBRL(item.price)} unidade</p>
                <div class="cart-item-actions">
                    <div class="quantity-control" aria-label="Quantidade de ${item.name}">
                        <button type="button" data-decrease="${item.id}" aria-label="Diminuir ${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-increase="${item.id}" aria-label="Aumentar ${item.name}">+</button>
                    </div>
                    <strong class="cart-line-total">${formatBRL(item.price * item.quantity)}</strong>
                </div>
                <button class="remove-item" type="button" data-remove="${item.id}">Remover</button>
            </div>
        </article>
    `).join("");
}
localStorage.setItem("cart", JSON.stringify(cart));

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartButton.setAttribute("aria-expanded", "true");
    drawerBackdrop.hidden = false;
    document.body.classList.add("no-scroll");
}

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartButton.setAttribute("aria-expanded", "false");
    drawerBackdrop.hidden = true;
    if (!checkoutModal.classList.contains("open")) {
        document.body.classList.remove("no-scroll");
    }
}

function openCheckout() {
    if (cart.length === 0) {
        showToast("Adicione um item antes de finalizar.");
        return;
    }

    checkoutModal.classList.add("open");
    checkoutModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

function closeCheckoutModal() {
    checkoutModal.classList.remove("open");
    checkoutModal.setAttribute("aria-hidden", "true");
    if (!cartDrawer.classList.contains("open")) {
        document.body.classList.remove("no-scroll");
    }
}

function addToCart(product) {

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();

    localStorage.setItem("cart", JSON.stringify(cart));

    openCart();

    showToast(`${product.name} adicionado ao carrinho.`);
}
function changeQuantity(id, direction) {
    const item = cart.find((cartItem) => cartItem.id === id);

    if (!item) {
        return;
    }

    item.quantity += direction;

    if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => cartItem.id !== id);
    }

    renderCart();
}

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    renderCart();
}

function updateDeliveryFields() {
    const isPickup = deliveryType.value === "pickup";
    addressField.style.display = isPickup ? "none" : "grid";
    addressField.querySelector("input").required = !isPickup;
    renderCart();
}

renderMenu();
renderCart();
updateDeliveryFields();

document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest(".favorite");
    const comboButton = event.target.closest("[data-add-combo]");
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");

    if (addButton) {
        addToCart(dishes[Number(addButton.dataset.add)]);
    }

    if (favoriteButton) {
        favoriteButton.classList.toggle("active");
    }

    if (comboButton) {
        addToCart(combo);
    }

    if (increaseButton) {
        changeQuantity(increaseButton.dataset.increase, 1);
    }

    if (decreaseButton) {
        changeQuantity(decreaseButton.dataset.decrease, -1);
    }

    if (removeButton) {
        removeItem(removeButton.dataset.remove);
    }

    if (event.target.closest(".nav-links a")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
drawerBackdrop.addEventListener("click", closeCartDrawer);
checkoutButton.addEventListener("click", openCheckout);
closeCheckout.addEventListener("click", closeCheckoutModal);
deliveryType.addEventListener("change", updateDeliveryFields);

checkoutModal.addEventListener("click", (event) => {
    if (event.target === checkoutModal) {
        closeCheckoutModal();
    }
});

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    closeCheckoutModal();
    closeCartDrawer();
});

document.querySelector("#newsletterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Cadastro recebido. Ate o proximo deploy!");
});

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const customerName = formData.get("name");

    cart = [];
    renderCart();
    checkoutForm.reset();
    updateDeliveryFields();
    closeCheckoutModal();
    closeCartDrawer();
    showToast(`Pedido enviado, ${customerName}. Obrigado pelo deploy!`);
});
