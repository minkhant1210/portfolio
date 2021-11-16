    // loader
    $(window).on("load", function(){
      $(".loader-container").fadeOut(500, function(){
        $(this).remove();
      })
    })
    
    let windowHeight = $(window).height();
    // console.log(windowHeight);

    // for scrolling navbar
    $(window).scroll(function(){
        var currentHeight = $(this).scrollTop();
        // console.log(currentHeight);

        if(currentHeight > windowHeight -100){
            $(".site-nav").addClass("site-nav-scroll");
        }else{
            $(".site-nav").removeClass("site-nav-scroll");
            setActive("home");
        }
    });

    // for changing menu-icon
    $(".navbar-toggler").click(function(){
        var result = $(".navbar-collapse").hasClass("show");
        console.log(result);

        if(result){
            $(".menu-icon").removeClass("fa-times-circle").addClass("fa-bars");
        }else{
            $(".menu-icon").removeClass("fa-bars").addClass("fa-times-circle");
        }
    });

    // changing nav-links while scrolling
    function setActive(current) {

        $(".nav-link").removeClass("current-section");

        $(`.nav-link[href='#${current}']`).addClass('current-section');

    }

    function navScroll() {

        let currentSection = $("section[id]");
        currentSection.waypoint(function (direction) {

            if(direction == "down"){
                let currentSectionId = $(this.element).attr('id');
                console.log(currentSectionId);
                setActive(currentSectionId);
            }

        },{ offset:'150px' });

        currentSection.waypoint(function (direction) {

            if(direction == "up"){
                let currentSectionId = $(this.element).attr('id');
                console.log(currentSectionId);
                setActive(currentSectionId);
            }

        },{ offset:'-1px' });

    }

    navScroll();






new WOW().init();

// waypointjs
  $('.pricing-slide').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });