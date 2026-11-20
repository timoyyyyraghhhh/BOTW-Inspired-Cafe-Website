
// =================================
// MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Show hamburger only on smartphones
function updateMobileMenu() {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = "block";
    } else {
        menuToggle.style.display = "none";
        navLinks.classList.remove("show");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
}

// Check screen size
updateMobileMenu();
window.addEventListener("resize", updateMobileMenu);

// Open and close hamburger menu
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// =================================
// MENU CATEGORY FILTER
// =================================

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const category = this.dataset.category;

        menuCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// =================================
// KOROK TALKING + SOUND
// =================================

const koroks = document.querySelectorAll(".korok-character");
const korokAudio = new Audio();

korokAudio.preload = "auto";

koroks.forEach(korok => {
    korok.addEventListener("click", function () {

        const wasActive = this.classList.contains("active");

        koroks.forEach(other => {
            other.classList.remove("active");
        });

        korokAudio.pause();
        korokAudio.currentTime = 0;

        if (wasActive) return;

        this.classList.add("active");

        if (this.classList.contains("korok-left")) {
            korokAudio.src = "sounds/botw-korok-found.mp3";
        } else {
            korokAudio.src = "sounds/hestu-dance.mp3";
        }

        korokAudio.play().catch(error => {
            console.log("Audio error:", error);
        });

    });
});


// =================================
// KOROKS AND HESTU DISAPPEARING
// =================================

const characters = document.querySelectorAll(
    ".korok-character, .hestu-character"
);

characters.forEach(character => {

    character.addEventListener("click", () => {

        setTimeout(() => {
            character.classList.add("disappear");
        }, 8000);

    });

});
