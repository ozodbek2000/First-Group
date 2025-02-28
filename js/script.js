$(document).ready(function() {
    $('.main__play').click(function(event) {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            swiper.autoplay.stop(); // Stop autoplay if active
        } else {
            swiper.autoplay.start(); // Start autoplay if not active
        }
    })
    $('.qa__dropdown_question').click(function(event) {
        $(this).parent('.qa__dropdown').toggleClass('active');
    })
})

// SWIPER
var swiper = new Swiper('.main__swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
var keySwiper = new Swiper('.key__swiper', {
    slidesPerView: 7,
    spaceBetween: 16,
    navigation: {
        nextEl: '.key__arrow-right',
        prevEl: '.key__arrow-left',
    },
});
var newsSwiper = new Swiper('.news__swiper', {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
        nextEl: '.swiper__arrow-right',
        prevEl: '.swiper__arrow-left',
    },
    loop: true,
});