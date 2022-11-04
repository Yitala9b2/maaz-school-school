// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


[].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        /*if (pos < 3) event.preventDefault();*/
        if (pos < 3) this.setSelectionRange(3, 3);
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if ( (i == 4 && keyCode == 56) || (i == 4 && keyCode == 104) ) {
          event.preventDefault();
        }
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });



  //================================ДОБАВЛЕНИЕ СКРИПТА НА ВИДЕО===============================

window.addEventListener("DOMContentLoaded", (function() {
    let boxVideos = document.querySelectorAll(".videos__slide");
    if (boxVideos) boxVideos.forEach((boxVideo => {
        if (boxVideo.querySelector('.video').dataset.src.length <= 1) boxVideo.remove();
    }));
    let videos = document.querySelectorAll(".video");
    if (videos) videos.forEach((video => {
        video.addEventListener("click", (function() {
            if (video.classList.contains("ready")) return; else {
                let src = video.dataset.src;
                video.classList.add("ready");
                video.innerHTML = "";
                video.insertAdjacentHTML("afterbegin", `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/`+src+`?autoplay=1;&playlist=`+src+`" title="YouTube video player" frameborder="0"\n\t\t\t\t\tallow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n\t\t\t\t\tallowfullscreen>\n\t\t\t\t</iframe>`);
            }
        }));
    }));
    let gallery = document.querySelector('.gallery');
    if (gallery) {
        let galleryImage = gallery.querySelectorAll('.gallery__image');
        galleryImage.forEach((image =>{
            if (image.dataset.video) {
                let objImageSrc = JSON.parse(image.dataset.video)
                let imageSrc = objImageSrc.source[0].src
                if (imageSrc.length <=1) {
                    image.removeAttribute('data-video')
                }
                if (imageSrc.length > 1) {
                    image.removeAttribute('href')
                }
            } 
        }))
    }
}));

//==========ДОБАВЛЕНИЕ В ПОПАП ИНФОРМАЦИИ ИЗ КАРТОЧЕК=============================

const purchases = document.querySelectorAll(".card__purchase");
const coursePeriod =document.querySelector("#course-period");
const courseTitle =document.querySelector("#cours-title");
const courseShedule =document.querySelector("#course-schedule");
const coursePrice =document.querySelector("#price");

for (const purchase of purchases) purchase.addEventListener("click", (function() {
let popupTitleParent = purchase.parentNode.querySelector('.card__title').innerText
formValues(courseTitle, popupTitleParent)
let popupPeriodParent = purchase.parentNode.querySelector('.card__title').getAttribute('period')
formValues(coursePeriod, popupPeriodParent)
let popupSheduleParent = purchase.parentNode.querySelector('.card__title').getAttribute('schedule')
formValues(courseShedule, popupSheduleParent)
let popupPriceParent = purchase.parentNode.querySelector('.card__sale-price').innerText
formValues(coursePrice, popupPriceParent)
}))
function formValues(popupItem, itemParent) {
    popupItem.innerText = itemParent;
    popupItem.value = itemParent;
}

//===========================ПАГИНАЦИЯ===============================================

//function main() {
//const posts = document.querySelectorAll('.gallery__image');
//let currentPage = 1;
//let rows = 12;

//    function displayList(arrPosts, rowPerPage, page) {
//        const gallery = document.querySelector('.gallery');

//        const start = rowPerPage*currentPage;
//        const end = start + rowPerPage;
//        const paginatedArr = arrPosts.slice(start, end);
//    }
//    function displayPagination(params) {
        
//    }
//    function displayPaginationBtn(params) {
        
//    }
//    displayList(posts,rows,currentPage)
//}
//main()

//=============ВИДЕО В ГАЛЕРЕИ=======================

