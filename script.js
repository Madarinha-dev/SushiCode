const dishes = [
    {
        id: "sashimi-syntax",
        name: "Sashimi Syntax",
        desc: "Fatias de salmao fresco com finalizacao leve.",
        price: 52,
        type: "sashimi",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Fatias de sashimi de salmao servidas em prato escuro"
    },
    {
        id: "uramaki-loop",
        name: "Uramaki Loop",
        desc: "Salmao, cream cheese e cebolinha.",
        price: 38,
        type: "roll",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Uramakis de salmao com acabamento delicado"
    },
    {
        id: "temaki-script",
        name: "Temaki Script",
        desc: "Cone crocante com salmao e molho especial.",
        price: 29,
        type: "temaki",
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Temaki de salmao fresco servido com molho"
    },
    {
        id: "hot-roll-debug",
        name: "Hot Roll Debug",
        desc: "Empanado sequinho com toque de tare.",
        price: 34,
        type: "roll",
        image: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Hot roll crocante com molho tare"
    },
    {
        id: "nigiri-commit",
        name: "Nigiri Commit",
        desc: "Dupla de nigiri com salmao selado.",
        price: 22,
        type: "sashimi",
        image: "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Nigiris de salmao alinhados em prato japones"
    },
    {
        id: "hossomaki-bit",
        name: "Hossomaki Bit",
        desc: "Alga nori, arroz japones e recheio de salmao.",
        price: 24,
        type: "roll",
        image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Hossomakis com alga nori e recheio de peixe"
    },
    {
        id: "joy-function",
        name: "Joy Function",
        desc: "Bolinho de arroz com salmao e cream cheese.",
        price: 31,
        type: "roll",
        image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Joys de salmao com cream cheese finalizados"
    },
    {
        id: "combo-pull-request",
        name: "Combo Pull Request",
        desc: "12 pecas variadas para revisar com calma.",
        price: 66,
        type: "roll",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Combinado variado de sushi em prato premium"
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

const orderStatuses = [
    { id: "fila", label: "Fila" },
    { id: "preparo", label: "Preparo" },
    { id: "entrega", label: "Entrega" },
    { id: "finalizado", label: "Finalizado" }
];

const defaultTables = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    seats: index < 4 ? 2 : 4,
    status: index === 1 || index === 5 ? "ocupada" : "livre"
}));

const defaultInventory = [
    { id: "salmao", name: "Salmao fresco", stock: 14, min: 8, unit: "kg" },
    { id: "arroz", name: "Arroz japones", stock: 22, min: 10, unit: "kg" },
    { id: "nori", name: "Alga nori", stock: 48, min: 24, unit: "folhas" },
    { id: "cream-cheese", name: "Cream cheese", stock: 9, min: 6, unit: "kg" },
    { id: "wasabi", name: "Wasabi", stock: 5, min: 4, unit: "potes" },
    { id: "tare", name: "Molho tare", stock: 7, min: 5, unit: "litros" }
];

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
const navLinks = document.querySelector("#navLinks");
const menuToggle = document.querySelector("#menuToggle");
const metricRevenue = document.querySelector("#metricRevenue");
const metricActiveOrders = document.querySelector("#metricActiveOrders");
const metricBusyTables = document.querySelector("#metricBusyTables");
const metricLowStock = document.querySelector("#metricLowStock");
const orderBoard = document.querySelector("#orderBoard");
const seedOrderButton = document.querySelector("#seedOrderButton");
const tablesGrid = document.querySelector("#tablesGrid");
const reservationForm = document.querySelector("#reservationForm");
const reservationTable = document.querySelector("#reservationTable");
const reservationList = document.querySelector("#reservationList");
const inventoryTable = document.querySelector("#inventoryTable");
const restockButton = document.querySelector("#restockButton");
const newsletterForm = document.querySelector("#newsletterForm");
const hasStorefront = Boolean(menuGrid);
const hasCart = Boolean(cartButton && cartDrawer && checkoutForm);
const hasManagement = Boolean(orderBoard);
let cart = [];
let orders = [];
let tables = [];
let inventory = [];
let reservations = [];

const savedCart = localStorage.getItem("cart");
const savedOrders = localStorage.getItem("orders");
const savedTables = localStorage.getItem("tables");
const savedInventory = localStorage.getItem("inventory");
const savedReservations = localStorage.getItem("reservations");

if (savedCart) {
    cart = JSON.parse(savedCart);
}

orders = savedOrders ? JSON.parse(savedOrders) : [
    {
        id: "PED-1024",
        customer: "Marina",
        type: "delivery",
        total: 118,
        status: "preparo",
        time: "12:35",
        items: [{ name: "Combo Full Stack", quantity: 1 }],
        notes: "Sem wasabi"
    },
    {
        id: "PED-1025",
        customer: "Caio",
        type: "pickup",
        total: 76,
        status: "fila",
        time: "12:48",
        items: [
            { name: "Uramaki Loop", quantity: 1 },
            { name: "Hot Roll Debug", quantity: 1 }
        ],
        notes: "Retirada no balcao"
    }
];
tables = savedTables ? JSON.parse(savedTables) : defaultTables;
inventory = savedInventory ? JSON.parse(savedInventory) : defaultInventory;
reservations = savedReservations ? JSON.parse(savedReservations) : [
    { id: "RES-01", name: "Ana", people: 4, time: "20:00", table: "6" }
];

function formatBRL(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function getDeliveryTotal() {
    return !deliveryType || deliveryType.value === "pickup" || cart.length === 0 ? 0 : deliveryPrice;
}

function getSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getTotal() {
    return getSubtotal() + getDeliveryTotal();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveManagementData() {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("reservations", JSON.stringify(reservations));
}

function getCurrentTime() {
    return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date());
}

function renderMenu() {
    if (!menuGrid) {
        return;
    }

    menuGrid.innerHTML = dishes.map((dish, index) => `
        <article class="menu-card">
            <div class="dish-art ${dish.type}">
                <img src="${dish.image}" alt="${dish.imageAlt}" loading="lazy">
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
    if (!hasCart) {
        saveCart();
        return;
    }

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
    saveCart();
}

function showAlert(message, icon = "success", title = "SushiCode") {
    if (!window.Swal) {
        window.alert(message);
        return;
    }

    Swal.fire({
        title,
        text: message,
        icon,
        timer: icon === "success" ? 1900 : undefined,
        showConfirmButton: icon !== "success",
        confirmButtonText: "Entendi",
        customClass: {
            popup: "sushi-alert",
            title: "sushi-alert-title",
            htmlContainer: "sushi-alert-text",
            confirmButton: "sushi-alert-button"
        },
        buttonsStyling: false
    });
}

function getOrderStatusIndex(status) {
    return orderStatuses.findIndex((item) => item.id === status);
}

function getNextOrderStatus(status) {
    const currentIndex = getOrderStatusIndex(status);
    return orderStatuses[Math.min(currentIndex + 1, orderStatuses.length - 1)].id;
}

function getPreviousOrderStatus(status) {
    const currentIndex = getOrderStatusIndex(status);
    return orderStatuses[Math.max(currentIndex - 1, 0)].id;
}

function renderMetrics() {
    if (!hasManagement) {
        return;
    }

    const revenue = orders.reduce((total, order) => total + order.total, 0);
    const activeOrders = orders.filter((order) => order.status !== "finalizado").length;
    const busyTables = tables.filter((table) => table.status !== "livre").length;
    const lowStock = inventory.filter((item) => item.stock <= item.min).length;

    metricRevenue.textContent = formatBRL(revenue);
    metricActiveOrders.textContent = activeOrders;
    metricBusyTables.textContent = `${busyTables}/${tables.length}`;
    metricLowStock.textContent = lowStock;
}

function renderOrders() {
    if (!orderBoard) {
        return;
    }

    orderBoard.innerHTML = orderStatuses.map((status) => {
        const statusOrders = orders.filter((order) => order.status === status.id);

        return `
            <div class="order-column">
                <div class="order-column-head">
                    <strong>${status.label}</strong>
                    <span>${statusOrders.length}</span>
                </div>
                <div class="order-list">
                    ${statusOrders.length ? statusOrders.map((order) => `
                        <article class="order-card">
                            <div class="order-card-head">
                                <strong>${order.id}</strong>
                                <span>${order.time}</span>
                            </div>
                            <h4>${order.customer}</h4>
                            <p>${order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}</p>
                            <div class="order-meta">
                                <span>${order.type === "delivery" ? "Entrega" : "Retirada"}</span>
                                <strong>${formatBRL(order.total)}</strong>
                            </div>
                            ${order.notes ? `<small>${order.notes}</small>` : ""}
                            <div class="order-actions">
                                <button type="button" data-order-back="${order.id}" ${status.id === "fila" ? "disabled" : ""}>Voltar</button>
                                <button type="button" data-order-next="${order.id}" ${status.id === "finalizado" ? "disabled" : ""}>Avancar</button>
                            </div>
                        </article>
                    `).join("") : '<div class="empty-state">Sem pedidos aqui.</div>'}
                </div>
            </div>
        `;
    }).join("");
}

function renderTables() {
    if (!tablesGrid || !reservationTable) {
        return;
    }

    tablesGrid.innerHTML = tables.map((table) => `
        <button class="table-card ${table.status}" type="button" data-table="${table.id}">
            <strong>Mesa ${table.id}</strong>
            <span>${table.seats} lugares</span>
            <small>${table.status}</small>
        </button>
    `).join("");

    reservationTable.innerHTML = tables.map((table) => `
        <option value="${table.id}">Mesa ${table.id} - ${table.status}</option>
    `).join("");
}

function renderReservations() {
    if (!reservationList) {
        return;
    }

    reservationList.innerHTML = reservations.length ? reservations.map((reservation) => `
        <article class="reservation-item">
            <div>
                <strong>${reservation.name}</strong>
                <span>${reservation.people} pessoas - ${reservation.time} - Mesa ${reservation.table}</span>
            </div>
            <button type="button" data-remove-reservation="${reservation.id}" aria-label="Remover reserva de ${reservation.name}">Remover</button>
        </article>
    `).join("") : '<div class="empty-state">Nenhuma reserva registrada.</div>';
}

function renderInventory() {
    if (!inventoryTable) {
        return;
    }

    inventoryTable.innerHTML = inventory.map((item) => {
        const isLow = item.stock <= item.min;

        return `
            <article class="inventory-row ${isLow ? "low" : ""}">
                <div>
                    <strong>${item.name}</strong>
                    <span>Minimo: ${item.min} ${item.unit}</span>
                </div>
                <div class="stock-control">
                    <button type="button" data-stock-minus="${item.id}" aria-label="Reduzir ${item.name}">-</button>
                    <strong>${item.stock} ${item.unit}</strong>
                    <button type="button" data-stock-plus="${item.id}" aria-label="Aumentar ${item.name}">+</button>
                </div>
                <span class="stock-status">${isLow ? "Critico" : "Ok"}</span>
            </article>
        `;
    }).join("");
}

function renderManagement() {
    renderMetrics();
    renderOrders();
    renderTables();
    renderReservations();
    renderInventory();
    saveManagementData();
}

function createOrderFromCheckout(formData) {
    const orderId = `PED-${Date.now().toString().slice(-5)}`;
    const items = cart.map((item) => ({
        name: item.name,
        quantity: item.quantity
    }));

    orders.unshift({
        id: orderId,
        customer: formData.get("name"),
        type: formData.get("deliveryType"),
        total: getTotal(),
        status: "fila",
        time: getCurrentTime(),
        items,
        notes: formData.get("notes") || ""
    });
}

function createSampleOrder() {
    orders.unshift({
        id: `PED-${Date.now().toString().slice(-5)}`,
        customer: "Mesa rapida",
        type: "pickup",
        total: 66,
        status: "fila",
        time: getCurrentTime(),
        items: [{ name: "Combo Pull Request", quantity: 1 }],
        notes: "Pedido criado pela gestao"
    });

    renderManagement();
    showAlert("Pedido de teste adicionado a fila.", "success", "Gestao atualizada");
}

function updateOrderStatus(id, direction) {
    const order = orders.find((item) => item.id === id);

    if (!order) {
        return;
    }

    order.status = direction === "next" ? getNextOrderStatus(order.status) : getPreviousOrderStatus(order.status);
    renderManagement();
}

function updateStock(id, amount) {
    const item = inventory.find((stockItem) => stockItem.id === id);

    if (!item) {
        return;
    }

    item.stock = Math.max(0, item.stock + amount);
    renderManagement();
}

function restockCriticalItems() {
    inventory = inventory.map((item) => ({
        ...item,
        stock: item.stock <= item.min ? item.min + 8 : item.stock
    }));

    renderManagement();
    showAlert("Itens criticos foram repostos.", "success", "Estoque atualizado");
}

function openCart() {
    if (!hasCart) {
        return;
    }

    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartButton.setAttribute("aria-expanded", "true");
    drawerBackdrop.hidden = false;
    document.body.classList.add("no-scroll");
}

function closeCartDrawer() {
    if (!hasCart) {
        return;
    }

    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartButton.setAttribute("aria-expanded", "false");
    drawerBackdrop.hidden = true;
    if (!checkoutModal.classList.contains("open")) {
        document.body.classList.remove("no-scroll");
    }
}

function openCheckout() {
    if (!hasCart) {
        return;
    }

    if (cart.length === 0) {
        showAlert("Adicione um item antes de finalizar.", "warning", "Carrinho vazio");
        return;
    }

    checkoutModal.classList.add("open");
    checkoutModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

function closeCheckoutModal() {
    if (!hasCart) {
        return;
    }

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

    openCart();

    showAlert(`${product.name} adicionado ao carrinho.`, "success", "Item adicionado");
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
    if (!deliveryType || !addressField) {
        renderCart();
        return;
    }

    const isPickup = deliveryType.value === "pickup";
    addressField.style.display = isPickup ? "none" : "grid";
    addressField.querySelector("input").required = !isPickup;
    renderCart();
}

if (hasStorefront) {
    renderMenu();
    renderCart();
    updateDeliveryFields();
}

if (hasManagement) {
    renderManagement();
}

document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest(".favorite");
    const comboButton = event.target.closest("[data-add-combo]");
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");
    const orderNextButton = event.target.closest("[data-order-next]");
    const orderBackButton = event.target.closest("[data-order-back]");
    const tableButton = event.target.closest("[data-table]");
    const stockMinusButton = event.target.closest("[data-stock-minus]");
    const stockPlusButton = event.target.closest("[data-stock-plus]");
    const removeReservationButton = event.target.closest("[data-remove-reservation]");

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

    if (orderNextButton) {
        updateOrderStatus(orderNextButton.dataset.orderNext, "next");
    }

    if (orderBackButton) {
        updateOrderStatus(orderBackButton.dataset.orderBack, "back");
    }

    if (tableButton) {
        const table = tables.find((item) => String(item.id) === tableButton.dataset.table);

        if (table) {
            table.status = table.status === "livre" ? "ocupada" : "livre";
            renderManagement();
        }
    }

    if (stockMinusButton) {
        updateStock(stockMinusButton.dataset.stockMinus, -1);
    }

    if (stockPlusButton) {
        updateStock(stockPlusButton.dataset.stockPlus, 1);
    }

    if (removeReservationButton) {
        reservations = reservations.filter((reservation) => reservation.id !== removeReservationButton.dataset.removeReservation);
        renderManagement();
    }

    if (navLinks && menuToggle && event.target.closest(".nav-links a")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

if (hasCart) {
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
}

if (seedOrderButton) {
    seedOrderButton.addEventListener("click", createSampleOrder);
}

if (restockButton) {
    restockButton.addEventListener("click", restockCriticalItems);
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    closeCheckoutModal();
    closeCartDrawer();
});

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        event.currentTarget.reset();
        showAlert("Cadastro recebido. Ate o proximo deploy!", "success", "Novidades a caminho");
    });
}

if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(reservationForm);

        reservations.unshift({
            id: `RES-${Date.now().toString().slice(-5)}`,
            name: formData.get("name"),
            people: Number(formData.get("people")),
            time: formData.get("time"),
            table: formData.get("table")
        });

        const table = tables.find((item) => String(item.id) === formData.get("table"));

        if (table) {
            table.status = "reservada";
        }

        reservationForm.reset();
        renderManagement();
        showAlert("Reserva registrada no painel.", "success", "Agenda atualizada");
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(checkoutForm);
        const customerName = formData.get("name");

        createOrderFromCheckout(formData);
        cart = [];
        renderCart();
        checkoutForm.reset();
        updateDeliveryFields();
        if (hasManagement) {
            renderManagement();
        } else {
            saveManagementData();
        }
        closeCheckoutModal();
        closeCartDrawer();
        showAlert(`Pedido enviado, ${customerName}. Obrigado pelo deploy!`, "success", "Pedido confirmado");
    });
}
