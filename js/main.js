// nav menu btn ---------------------
( () => {

    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = navMenu.querySelector('.close-nav-menu');

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add('open');
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove('open');
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');
        },300)
    }

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')){
            if (event.target.hash !== ""){
                event.preventDefault();
                let hash = event.target.hash;
                // console.log(hash);
                // add hide and remove active from already active section
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // add active and remove hide to clicked link-item
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // remove active and innershadow from already active navMenu and add outer shadow and hover in shadow
                navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');
                // if link item twe ka navmenu htal hmar shi nay ml so yin
                if (navMenu.classList.contains('open')){
                    // navmenu open htar tae achain link items twe ko click ml so yin
                    // active new classes to new active nave link item
                    event.target.classList.add('active','inner-shadow');
                    event.target.classList.remove('outer-shadow','hover-in-shadow');
                    hideNavMenu();
                }else {
                    // navMenu close htar tae achin link item twe ko hnate ml so yin
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if (hash === item.hash){
                            item.classList.add('active','inner-shadow');
                            item.classList.remove('outer-shadow','hover-in-shadow');
                        }
                    });
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }


    })

})();

// about section tabs------------------
( () => {
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");
    tabsContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
            // console.log("contain 'tab-item' class and not contain 'active' class");
            // console.log(event.target);
            const target = event.target.getAttribute('data-target');
            // console.log(target);
            // remove active from tab-item
            tabsContainer.querySelector('.active').classList.remove('active','outer-shadow');
            // add class to target tab-item
            event.target.classList.add('active','outer-shadow');
            // remove active from tab-content
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    })
} )();

function bodyScrollingToggle(){
    const body = document.querySelector("body");
    body.classList.toggle('stop-scrolling');
}

// portfolio filter and popup -----------------------

( () => {
    const filterContainer = document.querySelector(".portfolio-filter");
    const portfolioItemsContainer = document.querySelector(".portfolio-items");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const  popUp = document.querySelector(".portfolio-popup");
    const prevBtn = popUp.querySelector(".pp-prev");
    const nextBtn = popUp.querySelector(".pp-next");
    const closeBtn = popUp.querySelector(".pp-close");
    const projectDetailsContainer = popUp.querySelector(".pp-details");
    const projectDetailsBtn = document.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // filter portfolio items ------------------
    filterContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
            filterContainer.querySelector(".active").classList.remove('active', 'outer-shadow');
            event.target.classList.add('active','outer-shadow');
            const target = event.target.getAttribute('data-target');
            portfolioItems.forEach((item) => {
                const category = item.getAttribute('data-category')
                // console.log(category);
                if (target === category || target === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                }else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            })
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest('.portfolio-item-inner')) {
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
            // console.log(portfolioItem);
            // console.log(typeof (portfolioItem.parentElement.children));
            // getting the portfolioItem's index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex)
            // console.log(portfolioItems[0])
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots')
            screenshots = screenshots.split(',')
            if (screenshots.length === 1){
                nextBtn.style.display = 'none';
                prevBtn.style.display = 'none';
            }else {
                nextBtn.style.display = 'block';
                prevBtn.style.display = 'block';
            }
            slideIndex = 0;
            // console.log(screenshots);
            popUpToggle();
            popUpSlideShow();
            popUpDetails();
        }
    });

    closeBtn.addEventListener("click", () => {
        popUpToggle();
    })

    function popUpToggle() {
        popUp.classList.toggle('open');
        bodyScrollingToggle();
    }

    function popUpSlideShow(){
        const imgSrc = screenshots[slideIndex];
        // console.log(imgSrc);
        const popUpImg = popUp.querySelector('.pp-img');
        // activate loader before popup img loaded
        popUp.querySelector('.pp-loader').classList.add('active');
        popUpImg.src = imgSrc;
        popUpImg.onload = () => {
            // deactivate the loader
            popUp.querySelector('.pp-loader').classList.remove('active');
        }
        popUp.querySelector('.pp-counter').innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1){
            slideIndex = 0;
        }else {
            slideIndex++;
        }
        popUpSlideShow();
    });

    // prev slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0){
            slideIndex = screenshots.length - 1;
        }else {
            slideIndex--;
        }
        popUpSlideShow();
    });

    projectDetailsBtn.addEventListener("click", () => {
        popUpDetailsToggle();
    });

    function popUpDetailsToggle() {
        if (projectDetailsContainer.classList.contains('active')){
            projectDetailsBtn.querySelector("i").classList.remove('fa-minus');
            projectDetailsBtn.querySelector("i").classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }else {
            projectDetailsBtn.querySelector("i").classList.remove('fa-plus');
            projectDetailsBtn.querySelector("i").classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            // console.log(projectDetailsContainer.scrollHeight);
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popUp.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

    function popUpDetails() {
        // get project details
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        // replace project details
        popUp.querySelector('.pp-project-details').innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        popUp.querySelector('.pp-title h2').innerHTML = title
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        popUp.querySelector('.pp-project-category').innerHTML = category.split('-').join(" ");
    }
})();

// testimonial section ---------------------------
( () => {

    const slideContainer = document.querySelector('.testi-slider-container');
    const slides = document.querySelectorAll('.testi-item');
    const nextBtn = document.querySelector('.testi-slider-nav .next');
    const prevBtn = document.querySelector('.testi-slider-nav .prev')
    const slideWidth = slideContainer.offsetWidth;
    const activeSlide = slideContainer.querySelector('.testi-item.active');
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide)
    // console.log(slideIndex);
    // console.log(slideWidth);

    // setting width of all slides
    slides.forEach((slide) => {
        // let sw = slide.style.width;
        // sw = slideWidth
        // console.log(sw)
        slide.style.width = slideWidth + 'px';
    })

    // setting width of slide container
    // let scw = slideContainer.style.width
    // scw = slideWidth * slides.length;
    // console.log(scw)
    slideContainer.style.width = slideWidth * slides.length + 'px';

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length -1 ){
            slideIndex = 0;
        }else {
            slideIndex++
        }
        // console.log(slideIndex);
        // slideContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px'
        slider();
    });

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0 ){
            slideIndex = slides.length - 1;
        }else {
            slideIndex--;
        }
        // console.log(slideIndex);
        // slideContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px';
        slider();
    })

    function slider() {
        // deactivate existing active slide
        slideContainer.querySelector('.testi-item.active').classList.remove('active');
        // activate new slide
        slides[slideIndex].classList.add('active');
        slideContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px';
    }
    slider();

})();

// hide all sections except active----------------
( () => {

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if (!section.classList.contains('active')){
            section.classList.add('hide');
        }
    })

})();

// preloader
window.addEventListener("load", () => {
    document.querySelector('.pre-loader').classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".pre-loader").style.display="none";
    },1000)
})















