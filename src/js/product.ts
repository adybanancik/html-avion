import "../scss/product.scss";

// Bannerul cu oferta de livrare

const banner = document.querySelector<HTMLElement>(
    "[data-delivery-banner]"
);

const closeBanner = document.querySelector<HTMLButtonElement>(
    "[data-banner-close]"
);

closeBanner?.addEventListener("click", () => {
    if (banner) {
        banner.hidden = true;
    }

    document
        .querySelector<HTMLAnchorElement>(".product-header__logo")
        ?.focus();
});

// Meniul pentru ecranele mici

const header = document.querySelector<HTMLElement>(
    "[data-product-header]"
);

const menuToggle = document.querySelector<HTMLButtonElement>(
    "[data-menu-toggle]"
);

menuToggle?.addEventListener("click", () => {
    const expanded =
        menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
        "aria-expanded",
        String(!expanded)
    );

    header?.classList.toggle(
        "is-menu-open",
        !expanded
    );
});

document.addEventListener("keydown", (event) => {
    if (
        event.key !== "Escape" ||
        menuToggle?.getAttribute("aria-expanded") !== "true"
    ) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-menu-open");

    menuToggle.focus();
});

// Cantitatea produsului

const details = document.querySelector<HTMLElement>(
    "[data-product-details]"
);

const decrease = details?.querySelector<HTMLButtonElement>(
    "[data-quantity-decrease]"
);

const increase = details?.querySelector<HTMLButtonElement>(
    "[data-quantity-increase]"
);

const value = details?.querySelector<HTMLOutputElement>(
    "[data-quantity-value]"
);

if (decrease && increase && value) {
    let quantity = 1;

    const updateQuantity = (next: number) => {
        quantity = Math.max(1, next);

        value.value = String(quantity);

        decrease.disabled = quantity === 1;
    };

    decrease.addEventListener("click", () => {
        updateQuantity(quantity - 1);
    });

    increase.addEventListener("click", () => {
        updateQuantity(quantity + 1);
    });
}