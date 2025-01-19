const featureButton = document.getElementById("feature-button");
const featureMenu = document.getElementById("feature-menu");

featureButton.addEventListener("click", () => {
    if (featureMenu.classList.contains("hidden")) {
        featureMenu.classList.remove("hidden");
        featureMenu.classList.add("visible");
    } else {
        featureMenu.classList.remove("visible");
        featureMenu.classList.add("hidden");
    }
});

const languagesButton = document.getElementById("languages-button");
const languagesMenu = document.getElementById("languages-menu");

languagesButton.addEventListener("click", () => {
    if (languagesMenu.classList.contains("hidden")) {
        languagesMenu.classList.remove("hidden");
        languagesMenu.classList.add("visible");
    } else {
        languagesMenu.classList.remove("visible");
        languagesMenu.classList.add("hidden");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll('[data-accordion="collapse"]');

    accordions.forEach((accordion) => {
        const buttons = accordion.querySelectorAll("button[data-accordion-target]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-accordion-target");
                const content = document.querySelector(targetId);

                const isExpanded = button.getAttribute("aria-expanded") === "true";

                if (isExpanded) {
                    button.setAttribute("aria-expanded", "false");
                    content.classList.add("hidden");
                } else {
                    buttons.forEach((btn) => {
                        const otherTargetId = btn.getAttribute("data-accordion-target");
                        const otherContent = document.querySelector(otherTargetId);

                        btn.setAttribute("aria-expanded", "false");
                        otherContent.classList.add("hidden");
                    });
                    button.setAttribute("aria-expanded", "true");
                    content.classList.remove("hidden");
                }
            });
        });
    });
});
