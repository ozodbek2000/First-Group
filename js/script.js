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
    function toggleEarthActive() {
        setTimeout(() => {
            if (!$('.header__list_item-earth:hover').length && !$('.header__lang_list:hover').length) {
                $('.header__list_item-earth').removeClass('active');
            }
        }, 200);
    }

    $('.header__list_item-earth, .header__lang_list').hover(
        function() {
            $('.header__list_item-earth').addClass('active');
        },
        toggleEarthActive
    );
    
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
var gallerySwiper = new Swiper('.gallery-container', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: '.gallery__arrow-right',
        prevEl: '.gallery__arrow-left',
    },
    loop: true,
});

// INPUT TEL LIBRARY
document.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector(".form_number");
    window.intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => callback(data.country))
                .catch(() => callback('us'));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
});
///////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".rep__app_card").forEach((card, index) => {
    const fileInput = card.querySelector("input[type=file]");
    const fileList = card.querySelector(".file-list");

    if (!fileInput || !fileList) return;

    // Добавляем уникальный класс file-list-N
    const uniqueClass = `file-list-${index}`;
    fileList.classList.add(uniqueClass);

    let uploadedFiles = [];

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileList.classList.remove("hidden");

            Array.from(fileInput.files).forEach((file) => {
                if (!uploadedFiles.some(f => f.name === file.name)) {
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
                <span class="file-name">${file.name}</span>
                <button class="remove-file" data-index="${idx}">✖</button>
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
        uploadedFiles.forEach(file => newFileList.items.add(file));
        fileInput.files = newFileList.files;
    }
});
