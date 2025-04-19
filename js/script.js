// Получаем элемент слайдера и все слайды
const bigslider = document.querySelector(".big-slider");
const bigslides = document.querySelectorAll(".big-slide");

// Получаем кнопки "назад" и "вперед" для управления слайдером
const bigprevButton = document.querySelector(".big-prev");
const bignextButton = document.querySelector(".big-next");

// Переменная для хранения текущего индекса слайда
let bigcurrentIndex = 0;

// Функция для обновления позиции слайдера
function bigupdateSlider() {
  // Сдвигаем слайдер на ширину текущего слайда
  bigslider.style.transform = `translateX(${-bigcurrentIndex * 100}%)`;
}

// Проверяем, есть ли кнопки и достаточно ли слайдов для работы слайдера
if (bigslides.length > 1) {
  if (bigprevButton && bignextButton) {
    // Добавляем обработчик события для кнопки "назад"
    bigprevButton.addEventListener("click", () => {
      // Если текущий слайд первый, переходим к последнему, иначе к предыдущему
      bigcurrentIndex =
        bigcurrentIndex === 0 ? bigslides.length - 1 : bigcurrentIndex - 1;
      bigupdateSlider(); // Обновляем слайдер
    });

    // Добавляем обработчик события для кнопки "вперед"
    bignextButton.addEventListener("click", () => {
      // Переходим к следующему слайду, если дошли до конца, возвращаемся к первому
      bigcurrentIndex = (bigcurrentIndex + 1) % bigslides.length;
      bigupdateSlider(); // Обновляем слайдер
    });
  }
}

// Аналогичный код для мини-слайдера
const minislider = document.querySelector(".mini-slider");
const minislides = document.querySelectorAll(".mini-slide");
const miniprevButton = document.querySelector(".mini-prev");
const mininextButton = document.querySelector(".mini-next");
let minicurrentIndex = 0;

// Функция для обновления позиции мини-слайдера
function miniupdateSlider() {
  minislider.style.transform = `translateX(${-minicurrentIndex * 100}%)`;
}

// Проверяем, есть ли кнопки и достаточно ли слайдов для мини-слайдера
if (minislides.length > 1) {
  if (miniprevButton && mininextButton) {
    // Обработчик для кнопки "назад" в мини-слайдере
    miniprevButton.addEventListener("click", () => {
      minicurrentIndex =
        minicurrentIndex === 0 ? minislides.length - 1 : minicurrentIndex - 1;
      miniupdateSlider();
    });

    // Обработчик для кнопки "вперед" в мини-слайдере
    mininextButton.addEventListener("click", () => {
      minicurrentIndex = (minicurrentIndex + 1) % minislides.length;
      miniupdateSlider();
    });
  }
}

// Добавляем обработчики событий для вопросов и ответов (аккордеон)
document.querySelectorAll(".question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling; // Получаем следующий элемент (ответ)
    if (answer.style.display === "block") {
      answer.style.display = "none"; // Скрываем ответ, если он открыт
      question.classList.remove("active"); // Убираем класс активности
    } else {
      answer.style.display = "block"; // Показываем ответ
      question.classList.add("active"); // Добавляем класс активности
    }
  });
});

// Проверяем поддержку Picture-in-Picture (PiP)
if ("pictureInPictureEnabled" in document) {
  const video = document.getElementById("my-video");

  // Создаем кнопку для активации PiP
  const pipButton = document.createElement("button");
  pipButton.textContent = "Total_stream";
  pipButton.addEventListener("click", () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture(); // Выходим из PiP, если он активен
    } else {
      video.requestPictureInPicture(); // Включаем PiP
    }
  });

  // Добавляем кнопку в панель управления видео
  const controlBar = video.querySelector(".vjs-control-bar");
  controlBar.appendChild(pipButton);
}

// Обработчик события загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  var player = videojs("my-video"); // Инициализация видеоплеера

  // Функция для проверки поддержки полноэкранного режима
  function isFullscreenSupported() {
    return (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  // Проверяем поддержку полноэкранного режима
  if (!isFullscreenSupported()) {
    console.log("Полноэкранный режим не поддерживается вашим браузером.");
  }

  // Обработчик события для переключения в полноэкранный режим
  player.on("requestFullscreen", function () {
    if (player.isFullscreen()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (player.el().requestFullscreen) {
        player.el().requestFullscreen();
      } else if (player.el().webkitRequestFullscreen) {
        player.el().webkitRequestFullscreen();
      } else if (player.el().mozRequestFullScreen) {
        player.el().mozRequestFullScreen();
      } else if (player.el().msRequestFullscreen) {
        player.el().msRequestFullscreen();
      }
    }
  });
});

// Обработчик события загрузки DOM для автоматического включения полноэкранного режима
document.addEventListener("DOMContentLoaded", function () {
  var videoPlayer = document.getElementById("my-video");

  // Функция для проверки ширины экрана и включения полноэкранного режима
  function toggleFullScreen() {
    if (window.innerWidth > 768 && !document.fullscreenElement) {
      videoPlayer.requestFullscreen();
    }
  }

  // Включаем полноэкранный режим при воспроизведении видео
  videoPlayer.addEventListener("play", toggleFullScreen);
});

  // Функция для открытия/закрытия меню
  function openMenu(id) {
    const elem = document.querySelectorAll(`#${id}`);

    if (elem.length === 0) {
      return; // Если элемент не найден, выходим из функции
    }
    const firstelem = elem[0];
    const state = firstelem.style.display; // Получаем текущее состояние элемента

    if (state === "none" || state === "") {
      firstelem.style.display = "block"; // Показываем элемент, если он скрыт
    } else {
      firstelem.style.display = "none"; // Скрываем элемент, если он видим
    }
  }

// Фильтрация по категориям (первый блок)
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const slides = document.querySelectorAll(".news-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category; // Получаем категорию из data-атрибута

      filterButtons.forEach((btn) => btn.classList.remove("active")); // Убираем активный класс у всех кнопок
      this.classList.add("active"); // Добавляем активный класс текущей кнопке

      let visibleSlides = 0; // Счетчик видимых слайдов

      slides.forEach((slide) => {
        const slideCategory = slide.dataset.category; // Получаем категорию слайда

        if (category === "all" || slideCategory === category) {
          slide.style.display = "block"; // Показываем слайд, если он соответствует категории
          visibleSlides++;
        } else {
          slide.style.display = "none"; // Скрываем слайд
        }
      });
    });
  });
});

// Фильтрация по категориям (второй блок)
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons2 = document.querySelectorAll(".filter-button2");
  const slides2 = document.querySelectorAll(".tts-item");

  filterButtons2.forEach((button) => {
    button.addEventListener("click", function () {
      const category2 = this.dataset.category;

      filterButtons2.forEach((btn) => btn.classList.remove("active2"));
      this.classList.add("active2");

      let visibleSlides2 = 0;

      slides2.forEach((slide2) => {
        const slideCategory2 = slide2.dataset.category;

        if (category2 === "all2" || slideCategory2 === category2) {
          slide2.style.display = "block";
          visibleSlides2++;
        } else {
          slide2.style.display = "none";
        }
      });
    });
  });
});

// Функция для скрытия/показа кнопок навигации в Swiper
function toggleNavigation(swiperInstance) {
  const nextButton = swiperInstance.navigation.nextEl;
  const prevButton = swiperInstance.navigation.prevEl;

  if (swiperInstance.slides.length <= 4) {
    nextButton.style.display = "none"; // Скрываем кнопки, если слайдов меньше или равно 4
    prevButton.style.display = "none";
  } else {
    nextButton.style.display = "block"; // Показываем кнопки
    prevButton.style.display = "block";
  }
}

// Инициализация Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2, // Количество видимых слайдов
  spaceBetween: 30, // Расстояние между слайдами
  loop: true, // Бесконечная прокрутка
  pagination: {
    el: ".swiper-pagination", // Элемент пагинации
    clickable: true, // Возможность кликать на пагинацию
  },
  navigation: {
    nextEl: ".swiper-button-next", // Кнопка "вперед"
    prevEl: ".swiper-button-prev", // Кнопка "назад"
  },
  watchOverflow:true,
  observer:true,
  observeParents:true,
  observeSlideChildren:true,
  breakpoints: {
    1024: { slidesPerView: 4 }, // Настройки для разных размеров экрана
    750: { slidesPerView: 3 },
    650: { slidesPerView: 2.5 },
    550: { slidesPerView: 2 },
    500: { slidesPerView: 2 },
  },
  on: {
    init: function () {
      toggleNavigation(this); // Вызов функции при инициализации
    },
    update: function () {
      toggleNavigation(this); // Вызов функции при обновлении
    },
  },
});

// Вторая инициализация Swiper (аналогичная первой)
var swiper1 = new Swiper(".mySwiper1", {
  slidesPerView: 1.2,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  watchOverflow:true,
  observer:true,
  observeParents:true,
  observeSlideChildren:true,
  breakpoints: {
    1024: { slidesPerView: 4 },
    750: { slidesPerView: 3 },
    650: { slidesPerView: 2.5 },
    550: { slidesPerView: 2 },
    500: { slidesPerView: 2 },
  },
  on: {
    init: function () {
      toggleNavigation(this);
    },
    update: function () {
      toggleNavigation(this);
    },
  },
});

// Открытие и закрытие попапов
document.addEventListener('DOMContentLoaded', function () {
  const readMoreButtons = document.querySelectorAll('.read-more');
  const closePopupButtons = document.querySelectorAll('.close-popup');

  readMoreButtons.forEach(button => {
      button.addEventListener('click', function () {
          const popupId = this.dataset.popup; // Получаем ID попапа
          const popup = document.getElementById(popupId);
          popup.classList.add('active'); // Показываем попап
      });
  });

  closePopupButtons.forEach(button => {
      button.addEventListener('click', function () {
          const popup = this.closest('.popup-overlay');
          popup.classList.remove('active'); // Скрываем попап
      });
  });

  document.querySelectorAll('.popup-overlay').forEach(popup => {
      popup.addEventListener('click', function (e) {
          if (e.target === popup) {
              popup.classList.remove('active'); // Скрываем попап при клике вне его области
          }
      });
  });
});