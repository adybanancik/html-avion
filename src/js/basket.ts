import "../scss/basket.scss";

// Meniul mobil

const header = document.querySelector<HTMLElement>(
    "[data-basket-header]"
);

const menu = document.querySelector<HTMLButtonElement>(
    "[data-basket-menu]"
);

menu?.addEventListener("click", () => {
    const expanded =
        menu.getAttribute("aria-expanded") === "true";

    menu.setAttribute("aria-expanded", String(!expanded));

    header?.classList.toggle("is-menu-open", !expanded);
});

document.addEventListener("keydown", (event) => {
    if (
        event.key !== "Escape" ||
        menu?.getAttribute("aria-expanded") !== "true"
    ) {
        return;
    }

    menu.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-menu-open");

    menu.focus();
});

// Produsele și subtotalul

const rows = Array.from(
    document.querySelectorAll<HTMLElement>("[data-basket-item]")
);

const subtotal = document.querySelector<HTMLOutputElement>(
    "[data-basket-subtotal]"
);

// Formatarea prețurilor în lire sterline

const money = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

// Recalcularea tuturor totalurilor

const updateTotals = () => {
    let totalPence = 0;

    rows.forEach((row) => {
        const quantity = row.querySelector<HTMLOutputElement>(
            "[data-basket-quantity]"
        );

        const lineTotal = row.querySelector<HTMLElement>(
            "[data-basket-line-total]"
        );

        if (!quantity || !lineTotal) {
            return;
        }

        const unitPrice = Number(row.dataset.unitPrice);
        const amount = Number(quantity.value);

        const linePence = unitPrice * amount;

        lineTotal.textContent = money.format(linePence / 100);

        totalPence += linePence;
    });

    if (subtotal) {
        subtotal.value = money.format(totalPence / 100);
    }
};

// Conectarea butoanelor fiecărui produs

rows.forEach((row) => {
    const decrease = row.querySelector<HTMLButtonElement>(
        "[data-basket-decrease]"
    );

    const increase = row.querySelector<HTMLButtonElement>(
        "[data-basket-increase]"
    );

    const output = row.querySelector<HTMLOutputElement>(
        "[data-basket-quantity]"
    );

    if (!decrease || !increase || !output) {
        return;
    }

    let quantity = 1;

    output.value = String(quantity);
    decrease.disabled = true;

    const updateQuantity = (next: number) => {
        quantity = Math.max(1, next);

        output.value = String(quantity);

        decrease.disabled = quantity === 1;

        updateTotals();
    };

    decrease.addEventListener("click", () => {
        updateQuantity(quantity - 1);
    });

    increase.addEventListener("click", () => {
        updateQuantity(quantity + 1);
    });
});

// Totalurile inițiale

updateTotals();