$(".show-sidebar-btn").click(function(){
    $(".sidebar").animate({marginLeft: 0})
})
$(".hide-sidebar-btn").click(function(){
    $(".sidebar").animate({marginLeft:"-100%"})
})

function go(url){
    setTimeout(function(){
        location.href = `${url}`;
    },200)
}

$(function () {
  $('[data-toggle="popover"]').popover()
})

// for full page card
$("#full-page-btn").click(function(){
    console.log("hello");
    let current = $(this).closest(".card");
    current.toggleClass("full-page-card");
    if (current.hasClass("full-page-card")) {
        $(this).html(`<i class="feather-minimize-2"></i>`);
    }else{
        $(this).html(`<i class="feather-maximize-2"></i>`);
    }
});

// for lower active list
let screenHeight = $(window).height();
let currentActiveHeight = $(".nav-menu .active-list").offset().top

if(currentActiveHeight > screenHeight*0.8){
    $(".sidebar").animate({
        scrollTop:currentActiveHeight-100 
    },500)
}

