import "../scss/about.scss";

// Închiderea bannerului

const banner = document.querySelector<HTMLElement>(
    "[data-delivery-banner]"
);

document
    .querySelector<HTMLButtonElement>("[data-banner-close]")
    ?.addEventListener("click", () => {
        if (banner) {
            banner.hidden = true;
        }

        document
            .querySelector<HTMLAnchorElement>(".about-header__logo")
            ?.focus();
    });

// Meniul mobil

const header = document.querySelector<HTMLElement>(
    "[data-about-header]"
);

const menu = document.querySelector<HTMLButtonElement>(
    "[data-about-menu]"
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