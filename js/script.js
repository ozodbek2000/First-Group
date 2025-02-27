$(document).ready(function() {
    $('.main__play').click(function(event) {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            swiper.autoplay.stop(); // Stop autoplay if active
        } else {
            swiper.autoplay.start(); // Start autoplay if not active
        }
    })
})


// SWIPER
var swiper = new Swiper('.main__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});