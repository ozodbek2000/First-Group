$(document).ready(function () {
    $(".main__play").click(function (event) {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            swiper.autoplay.stop(); // Stop autoplay if active
            $(".main__slide").css("animation-play-state", "paused"); // Pause animation
        } else {
            swiper.autoplay.start(); // Start autoplay if not active
            $(".main__slide").css("animation-play-state", "running"); // Resume animation
        }
    });
    $(".header__burger").click(function (event) {
        $(this).toggleClass("active");
        $(".header__nav").toggleClass("active");
        $(".header__list_item").removeClass("active");
        $("body").toggleClass("lock");
    });

    $(".qa__dropdown_question").click(function() {
        $(".qa__dropdown").not($(this).parent()).removeClass("active");
    
        $(this).parent(".qa__dropdown").toggleClass("active");
    });
    
    $(document).click(function (event) {
        if (!$(event.target).closest(".header__burger, .header__nav").length) {
            $(".header__burger").removeClass("active");
            $(".header__nav").removeClass("active");
        }
    });
    function toggleEarthActive() {
        setTimeout(() => {
            if (
                !$(".header__list_item-earth:hover").length &&
                !$(".header__lang_list:hover").length
            ) {
                $(".header__list_item-earth").removeClass("active");
            }
        }, 200);
    }

    $(".header__list_item-earth, .header__lang_list").hover(function () {
        $(".header__list_item-earth").addClass("active");
    }, toggleEarthActive);

    function toggleServiceActive() {
        setTimeout(() => {
            if (
                !$(".header__list_item:hover").length &&
                !$(".header__list_services:hover").length
            ) {
                $(".header__list_services").removeClass("active");
            }
        }, 200);
    }

    $(".header__list_item").hover(function () {
        $(this).children(".header__list_services").addClass("active");
    }, toggleServiceActive);
    if ($(window).width() <= 767) {
        $(".header__list_item").click(function (event) {
            $(this).toggleClass("active");
        });
    }
});

// SWIPERS
var swiper = new Swiper(".main__swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 400,
});
var keySwiper = new Swiper(".key__swiper", {
    slidesPerView: 3.5,
    loop: true,
    spaceBetween: 16,
    navigation: {
        nextEl: ".key__arrow-right",
        prevEl: ".key__arrow-left",
    },
    breakpoints: {
        767: {
            slidesPerView: 7,
        },
    },
});
var newsSwiper = new Swiper(".news__swiper", {
    slidesPerView: 1.2,
    spaceBetween: 16,
    navigation: {
        nextEl: ".swiper__arrow-right",
        prevEl: ".swiper__arrow-left",
    },
    loop: true,
    breakpoints: {
        767: {
            slidesPerView: 4,
        },
    },
});
var gallerySwiper = new Swiper(".gallery-container", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    navigation: {
        nextEl: ".gallery__arrow-right",
        prevEl: ".gallery__arrow-left",
    },
    loop: true,
    breakpoints: {
        767: {
            slidesPerView: 4,
        },
    },
});
var compSwiper = new Swiper(".comp__swiper", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    navigation: {
        nextEl: ".comp__arrow-right",
        prevEl: ".comp__arrow-left",
    },
    loop: true,
    breakpoints: {
        767: {
            slidesPerView: 7,
            spaceBetween: 26.5,

        },
    },
});
var keyCardsSwiper = new Swiper(".key__cards", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    pagination: {
        el: ".key__pagination",
        clickable: true,
    },
    breakpoints: {
        767: {
            slidesPerView: 3,
        },
    },
});
var logosSwiper = new Swiper(".logos__cards", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    loop: true,
    grid: {
        rows: 1,
        fill: 'row',
    },
    navigation: {
        nextEl: ".logos__arrows svg:last-child",
        prevEl: ".logos__arrows svg:first-child",
    },
    breakpoints: {
        767: {
            slidesPerView: 7,
            grid: {
                rows: 2,
                fill: 'row',
            },
        },
    },
});
if ($(window).width() <= 767) {
    var postSwiper = new Swiper(".post__swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        navigation: {
            nextEl: ".post__navigation svg:last-child",
            prevEl: ".post__navigation svg:first-child",
        },
        loop: true,
        breakpoints: {
            767: {
                slidesPerView: 4,
            },
        },
    });
}

// INPUT TEL LIBRARY
document.addEventListener("DOMContentLoaded", function () {
    var inputs = document.querySelectorAll(".form_number, .partners_phone");
    inputs.forEach(function (input) {
        window.intlTelInput(input, {
            initialCountry: "auto",
            geoIpLookup: function (callback) {
                fetch("https://ipinfo.io/json")
                    .then((response) => response.json())
                    .then((data) => callback(data.country))
                    .catch(() => callback("us"));
            },
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    });
});

// INPUT FILES FUNCTION
document.querySelectorAll(".rep__card").forEach((card) => {
    const fileInput = card.querySelector(".rep__card_file");
    const fileList = card.querySelector(".rep__cards_files");

    if (!fileInput || !fileList) return;

    let uploadedFiles = [];

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            Array.from(fileInput.files).forEach((file) => {
                if (!uploadedFiles.some((f) => f.name === file.name)) {
                    uploadedFiles.push(file);
                }
            });

            renderFileList();
        }
    });

    function renderFileList() {
        fileList.innerHTML = "";
        uploadedFiles.forEach((file, idx) => {
            const listItem = document.createElement("li");
            listItem.classList.add("file-item");

            listItem.innerHTML = `
                <img src="../img/svg/file.svg"></img>
                <span class="file-name">${file.name}</span>
                <button class="remove-file" data-index="${idx}"></button>
            `;

            fileList.appendChild(listItem);
        });

        updateFileInput();
    }

    fileList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-file")) {
            const index = event.target.getAttribute("data-index");
            uploadedFiles.splice(index, 1);
            renderFileList();
        }
    });

    function updateFileInput() {
        const newFileList = new DataTransfer();
        uploadedFiles.forEach((file) => newFileList.items.add(file));
        fileInput.files = newFileList.files;
    }
});

// NUMBER ANIMATION 
$(document).ready(function () {
    const counters = $('.key__column_title, .about__number_title, .distr__card_title');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = $(entry.target);
                const updateCount = () => {
                    const target = +counter.data('count');
                    const count = +counter.text().replace('+', '');
                    const speed = 500; // change animation speed here
                    const increment = target / speed;

                    if (count < target) {
                        counter.text(Math.ceil(count + increment) + '+');
                        setTimeout(updateCount, 1);
                    } else {
                        counter.text(target + '+');
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    counters.each(function () {
        observer.observe(this);
    });
});