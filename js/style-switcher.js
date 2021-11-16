// toggle style switcher -------------

const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');

styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector('.style-switcher').classList.toggle('open');
    // console.log("hi")
});

// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    }
});

// change skin colors
const alternateStyles = document.querySelectorAll('.alternate-style');
// console.log(alternateStyles);
function setActiveStyle(color) {
    localStorage.setItem('color', color)
    // console.log(localStorage.getItem('color'));
    changeColor();
}
function changeColor() {
    alternateStyles.forEach(style => {
        // console.log(style.getAttribute('title'))
        if (localStorage.getItem("color") === style.getAttribute('title')){
            style.removeAttribute('disabled');
        }else {
            style.setAttribute('disabled', 'true');
        }
    })
}
if (localStorage.getItem("color") !== null) {
    changeColor();
}
// dark mode----------------------------
const dayNight = document.querySelector('.day-night');

dayNight.addEventListener("click", () => {
    // dayNight.querySelector('i').classList.toggle('fa-sun');
    // dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
    updateIcon();
});

function themeMode() {
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "dark"){
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
    updateIcon();
}
themeMode();
function updateIcon() {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector('i').classList.remove('fa-moon');
        dayNight.querySelector('i').classList.add('fa-sun');
    }else {
        dayNight.querySelector('i').classList.remove('fa-sun');
        dayNight.querySelector('i').classList.add('fa-moon');
    }
}
