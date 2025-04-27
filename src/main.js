document.addEventListener("DOMContentLoaded", () => {
  // global variables
  let currentSelectedDate = {
    month: null,
    time: null,
    day: null,
  };
  let price = 77;
  let carNumber;
  const daysContainer = document.getElementById("daysContainer2");

  function initSecondCalendar() {
    const daysContainer = document.getElementById("daysContainer2");
    const monthYearElement = document.getElementById("monthYear2");
    const prevMonthButton = document.getElementById("prevMonth2");
    const nextMonthButton = document.getElementById("nextMonth2");

    const dayMonth = document.getElementById("dayMonth")
    const prevDayButton = document.getElementById('prevDay2')
    const nextDayButton = document.getElementById('nextDay2')
    let currentDate = new Date();
    let monthCounter = 1;

    let selectedDay = new Date();
    selectedDay.setDate(selectedDay.getDate() + 1);

    function setActiveDay(date) {
      selectedDay = date;
      renderCalendar(selectedDay);
      updateDayMonthDisplay(selectedDay);
    }
    updateDayMonthDisplay(selectedDay);

    function updateDayMonthDisplay(date) {
      const day = date.getDate();
      const month = getMonthName(date.getMonth());
      dayMonth.textContent = `${day} ${month}`;
    }
    function navigateDay(offset) {
      const newDate = new Date(
        selectedDay.getFullYear(),
        selectedDay.getMonth(),
        selectedDay.getDate() + offset
      );

      if (newDate.getMonth() !== selectedDay.getMonth()) {
        if (offset > 0) {
          nextMonthButton.click();
        } else {
          prevMonthButton.click();
        }
      }
      setActiveDay(newDate);
    }

    prevDayButton.addEventListener("click", () => navigateDay(-1));
    nextDayButton.addEventListener("click", () => navigateDay(1));

    function renderCalendar(date) {
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
      const today = currentDate.getDate();
      let activeDay = null;
      // Kichik raqamlar uchun ma'lumotlar
      const smallNumbers = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 1,
        6: 2,
        7: 3,
        8: 4,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 1,
        14: 2,
        15: 3,
        16: 4,
        17: 1,
        18: 2,
        19: 3,
        20: 4,
        21: 1,
        22: 2,
        23: 3,
        24: 4,
        25: 1,
        26: 2,
        27: 3,
        28: 4,
        29: 1,
        30: 2,
        31: 3,
        32: 4,
      };
      monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const startDay = firstDayOfMonth.getDay();

      daysContainer.innerHTML = "";

      const daysShort = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
      const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

      // Haftaning kunlarini qo'shish
      for (let i = 0; i < 7; i++) {
        const dayName = document.createElement("div");
        dayName.textContent = daysShort[i];

        if (i < 5) {
          dayName.classList.add("day-text");
        } else {
          dayName.classList.add("day-text", "weekend");
        }

        daysContainer.appendChild(dayName);
      }

      // Bo'sh bloklarni qo'shish
      for (let i = 0; i < adjustedStartDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day", "empty-block");
        daysContainer.appendChild(emptyCell);
      }

      // Oy kunlarini qo'shish
      for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = i;

        let dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        const currentDate = new Date();

        // Dam olish kunlari (shanba va yakshanba) va o'tgan kunlarda kichik raqamlar bo'lmasin
        if (dayOfWeek === 0 || dayOfWeek === 6 || new Date(currentYear, currentMonth, i) < currentDate) {
          dayCell.classList.add("weekend");
        } else {
          // Kichik raqamlarni faqat hozirgi va kelajakdagi kunlarga qo'shamiz
          const smallNumber = smallNumbers[i];
          const smallNumberElement = document.createElement("div");
          smallNumberElement.classList.add("small-number");
          // smallNumberElement.textContent = smallNumber;
          smallNumberElement.textContent = smallNumber;
          if (smallNumber === 1) {
            dayCell.classList.add('light-green');
          } else if (smallNumber === 2) {
            dayCell.classList.add('green')
          } else if (smallNumber === 3) {
            dayCell.classList.add("light-red")
          } else if (smallNumber === 4) {
            dayCell.classList.add("red")
          }
          // Kichik raqamni kun blokiga qo'shish
          dayCell.appendChild(smallNumberElement);
        }

        if (i <= currentDate.getDate() && currentMonth === currentDate.getMonth()) {
          dayCell.classList.add("late");
        }

        if (
          selectedDay &&
          selectedDay.getDate() === i &&
          selectedDay.getMonth() === currentMonth &&
          selectedDay.getFullYear() === currentYear
        ) {
          dayCell.classList.add("active");
          activeDay = dayCell;
        }

        dayCell.addEventListener("click", () => {
          if (activeDay !== null) {
            activeDay.classList.remove("active");
          }

          dayCell.classList.add("active");

          selectedDay = new Date(currentYear, currentMonth, i);
          activeDay = dayCell;

          currentSelectedDate.month = currentMonth;
          currentSelectedDate.day = i;
        });

        daysContainer.appendChild(dayCell);
      }
    }

    function getMonthName(monthIndex) {
      const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];
      return monthNames[monthIndex];
    }

    function updateButtons() {
      if (monthCounter >= 3) {
        nextMonthButton.classList.add("disable");
      } else {
        nextMonthButton.classList.remove("disable");
      }

      if (monthCounter <= 1) {
        prevMonthButton.classList.add("disable");
      } else {
        prevMonthButton.classList.remove("disable");
      }
    }

    prevMonthButton.addEventListener("click", () => {
      if (monthCounter > 1) {
        monthCounter--;
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        updateButtons();
      }
    });

    nextMonthButton.addEventListener("click", () => {
      if (monthCounter < 3) {
        monthCounter++;
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
        updateButtons();
      }
    });

    renderCalendar(currentDate);
    updateButtons();
  }

  if (daysContainer) {
    initSecondCalendar();
  }

  if (window.innerWidth < 540) {
    const notWash = document.querySelector('.response')
    if (notWash) {
      document.querySelector('.response-block').classList.add('swiper')
      document.querySelector('.response-row').classList.add('swiper-wrapper')
      const responseItems = document.querySelectorAll('.response-item')
      responseItems.forEach(responseItem => {
        responseItem.classList.add('swiper-slide')
      });

      const responseSwiper = new Swiper(".response-block", {
        effect: "cards",
        grabCursor: true,
        keyboard: true,
        navigation: {
          nextEl: ".next-response",
          prevEl: ".prev-response",
        },
        pagination: {
          el: ".response-pagination",
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function () {
            if (this.activeIndex === this.slides.length - 1) {
              this.slideTo(0, 0, false); // Instantly go back to the first slide
            } else if (this.activeIndex === 0) {
              this.slideTo(this.slides.length - 1, 0, false); // Instantly go to the last slide when swiping left
            }
          }
        }
      });
    }
  }

  const menuBurger = document.querySelector('.intro-wrapper .header-actions button.menu');
  const headerMenu = document.querySelector('.header-menu');
  const menuLink = document.querySelectorAll('.header-menu-nav a');
  const headerBg = document.querySelector('.header-menu-bg');
  menuLink.forEach(linkItem => {
    linkItem.addEventListener('click', () => {
      headerMenu.classList.remove('active')
      headerBg.classList.remove('active')
    })
  });

  if (menuBurger) {
    menuBurger.addEventListener('click', function () {
      headerMenu.classList.toggle('active')
      headerBg.classList.toggle('active')
      const span = menuBurger.querySelector('span');

      if (span.textContent.trim() === "Меню") {
        span.textContent = "Выход";
      } else {
        span.textContent = "Меню";
      }
    })

    document.addEventListener('click', (event) => {
      if (!headerMenu.contains(event.target) && !menuBurger.contains(event.target)) {
        headerMenu.classList.remove('active');
        headerBg.classList.remove('active')
        menuBurger.querySelector('span').textContent = "Меню"; // Reset text
      }
    });
  }

  const orderModal = document.querySelector('.order-modal')
  if (orderModal) {
    // functions
    // initializations
    AOS.init();
    setInterval(triggerShimmer, 5000);
    animateLine();
    listItems();
    initCalendar();
    setupModalHandlers();
    form();
    carSelect();
    toggleAOSOnResize();

    // global events
    document.addEventListener("scroll", headerScroll);
    function carSelect() {
      const selectedModelArray = []; // data

      const carBrands = [
        { id: "Toyota", text: "Toyota" },
        { id: "Ford", text: "Ford" },
        { id: "BMW", text: "BMW" },
        { id: "Mercedes-Benz", text: "Mercedes-Benz" },
        { id: "Audi", text: "Audi" },
        { id: "Honda", text: "Honda" },
        { id: "Chevrolet", text: "Chevrolet" },
        { id: "Nissan", text: "Nissan" },
        { id: "Hyundai", text: "Hyundai" },
        { id: "Volkswagen", text: "Volkswagen" },
      ];

      const carModels = {
        Toyota: ["Corolla", "Camry", "RAV4"],
        Ford: ["Focus", "Mustang", "Explorer"],
        BMW: ["X3", "X5", "M3"],
        "Mercedes-Benz": ["C-Class", "E-Class", "GLE"],
        Audi: ["A3", "A4", "Q5"],
        Honda: ["Civic", "Accord", "CR-V"],
        Chevrolet: ["Malibu", "Equinox", "Tahoe"],
        Nissan: ["Altima", "Rogue", "Sentra"],
        Hyundai: ["Elantra", "Santa Fe", "Tucson"],
        Volkswagen: ["Golf", "Passat", "Tiguan"],
      };

      $(".car-brand").select2({
        placeholder: "Бренд авто",
        dropdownCssClass: "custom-dropdown",
        data: carBrands,
      });

      $(".car-brand").on("select2:select", function (e) {
        const selectedBrand = e.params.data.id;
        selectedModelArray.push(selectedBrand);

        if (carModels[selectedBrand]) {
          const models = carModels[selectedBrand];
          const newOptions = models.map((model) => `<option value="${model}">${model}</option>`);

          $(".car-brand")
            .html(`<option></option>` + newOptions.join(""))
            .select2({
              placeholder: "Модель авто",
              dropdownCssClass: "custom-dropdown",
            })
            .select2("open")
            .on("select2:select", () => {
              const newBrandOptions = carBrands
                .map((brand) => `<option value="${brand.id}">${brand.text}</option>`)
                .join("");

              $(".car-brand")
                .html(`<option></option>` + newBrandOptions)
                .trigger("change");

              $(".car-brand").val(selectedBrand);
            });
        }
      });
    }

    function headerScroll() {
      const header = document.querySelector(".intro-wrapper .header");

      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    function animateLine() {
      const line = document.querySelector(".line-animation .img-wrap");

      if (!line) {
        console.error(`Element not found: ${elementSelector}`);
        return;
      }

      function showLine() {
        line.classList.add("active");
        line.classList.remove("hidden");
      }

      function hideLine() {
        line.classList.remove("active");
        line.classList.add("hidden");
      }

      setInterval(() => {
        showLine();
        setTimeout(hideLine, 6000);
      }, 6000 + 1000);
    }

    function triggerShimmer() {
      const card = document.querySelector(".vip-card .card-content .right-card");

      card.style.background =
        "linear-gradient(259deg, rgba(255, 255, 255, 0.30) 17.59%, rgba(255, 255, 255, 0.00) 55.23%), #021523";
      card.style.backgroundSize = "200% 100%";

      card.style.transition = "background-position 0.7s ease";
      card.style.backgroundPosition = "100% 0";

      setTimeout(() => {
        card.style.transition = "none";
        card.style.backgroundPosition = "-100% 0";
      }, 1000);
    }

    function listItems() {
      const buttons = document.querySelectorAll(".car-item button");

      buttons.forEach((button) => {
        button.addEventListener("click", function () {
          const carItem = button.closest(".car-item");

          const listItems = carItem.querySelector(".list-items");

          if (listItems.classList.contains("active")) {
            listItems.classList.remove("active");

            button.querySelectorAll(".arrows svg").forEach((svg) => svg.classList.remove("rotate"));
          } else {
            listItems.classList.add("active");

            button.querySelectorAll(".arrows svg").forEach((svg) => svg.classList.add("rotate"));
          }
        });
      });
    }

    function initCalendar() {
      const daysContainer = document.getElementById("daysContainer");
      const monthYearElement = document.getElementById("monthYear");
      const prevMonthButton = document.getElementById("prevMonth");
      const nextMonthButton = document.getElementById("nextMonth");
      const step1 = document.querySelector(".step-1");
      const busyDays = [1, 5, 11, 15, 18];

      let currentDate = new Date();
      let monthCounter = 1;
      let selectedDay = null;

      function renderCalendar(date) {
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const today = currentDate.getDate();
        let activeDay = null;

        monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

        if (window.innerWidth <= 540) {
          monthYearElement.textContent = `${getMonthName(currentMonth)}`;
        }

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        const startDay = firstDayOfMonth.getDay();

        daysContainer.innerHTML = "";

        const daysShort = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
        const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

        for (let i = 0; i < 7; i++) {
          const dayName = document.createElement("div");
          dayName.textContent = daysShort[i];

          if (i < 5) {
            dayName.classList.add("day-text");
          } else {
            dayName.classList.add("day-text", "weekend");
          }

          daysContainer.appendChild(dayName);
        }

        for (let i = 0; i < adjustedStartDay; i++) {
          const emptyCell = document.createElement("div");
          emptyCell.classList.add("day", "empty-block");
          daysContainer.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
          const dayCell = document.createElement("div");
          dayCell.classList.add("day");
          dayCell.textContent = i;

          let dayOfWeek = new Date(currentYear, currentMonth, i).getDay();

          if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayCell.classList.add("weekend");
          }

          if (i < today && currentMonth === new Date().getMonth()) {
            dayCell.classList.add("late");
          }

          if (
            selectedDay &&
            selectedDay.getDate() === i &&
            selectedDay.getMonth() === currentMonth &&
            selectedDay.getFullYear() === currentYear
          ) {
            dayCell.classList.add("active");
            activeDay = dayCell;
          }

          dayCell.addEventListener("click", () => {
            if (activeDay !== null) {
              activeDay.classList.remove("active");
            }

            dayCell.classList.add("active");
            step1.classList.add("active");

            selectedDay = new Date(currentYear, currentMonth, i);
            activeDay = dayCell;

            currentSelectedDate.month = currentMonth;
            currentSelectedDate.day = i;

            document.querySelector(".wash-start-time").scrollIntoView({ block: "start", behavior: "smooth" });
          });

          daysContainer.appendChild(dayCell);
        }
      }

      function markBusyDays(busyDays) {
        const allDays = Array.from(daysContainer.getElementsByClassName("day"));

        busyDays.forEach((day) => {
          const dayElement = allDays.find((element) => parseInt(element.textContent) === day);
          if (dayElement) {
            dayElement.classList.add("busy");
          }
        });
      }

      function getMonthName(monthIndex) {
        const monthNames = [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ];
        return monthNames[monthIndex];
      }

      function updateButtons() {
        if (monthCounter >= 3) {
          nextMonthButton.classList.add("disable");
        } else {
          nextMonthButton.classList.remove("disable");
        }

        if (monthCounter <= 1) {
          prevMonthButton.classList.add("disable");
        } else {
          prevMonthButton.classList.remove("disable");
        }
      }

      prevMonthButton.addEventListener("click", () => {
        if (monthCounter > 1) {
          monthCounter--;
          currentDate.setMonth(currentDate.getMonth() - 1);
          renderCalendar(currentDate);
          updateButtons();

          markBusyDays(busyDays);
        }
      });

      nextMonthButton.addEventListener("click", () => {
        if (monthCounter < 3) {
          monthCounter++;
          currentDate.setMonth(currentDate.getMonth() + 1);
          renderCalendar(currentDate);
          updateButtons();

          markBusyDays(busyDays);
        }
      });

      renderCalendar(currentDate);
      updateButtons();

      markBusyDays(busyDays);
    }

    function setupModalHandlers() {
      document.querySelectorAll(".order-modal-trigger").forEach((button) => {
        button.addEventListener("click", () => {
          const orderModal = document.querySelector(".order-modal");
          if (orderModal) {
            orderModal.classList.add("show");
            document.body.style.overflow = "hidden";
          }
        });
      });

      document.querySelector(".order-modal .close-btn").addEventListener("click", () => {
        const orderModal = document.querySelector(".order-modal");
        if (orderModal) {
          orderModal.classList.remove("show");
          document.body.style.overflow = "unset";
        }
      });
    }

    function form() {
      let isCarBrandSelected = false;
      let isCarNumberComplete = false;
      let isRadioSelected = false;

      function checkStepOneFields() {
        $(".car-brand").on("change", function () {
          if ($(this).val()) {
            isCarBrandSelected = true;
          }
          updateStepTwoStatus();
        });

        $(".car-number").on("input", function () {
          let inputVal = $(this).val();

          if (inputVal.length > 10) {
            inputVal = inputVal.slice(0, 10);
          }

          inputVal = inputVal.toUpperCase();

          $(this).val(inputVal);

          isCarNumberComplete = inputVal.length >= 3;
          carNumber = inputVal;
          updateStepTwoStatus();
        });

        $(".hours input[type='radio']").on("change", function () {
          const selectedRadio = $(".hours input[type='radio']:checked");
          isRadioSelected = selectedRadio.length > 0;
          currentSelectedDate.time = $(this).val();
          updateStepTwoStatus();
        });
      }

      let isRadioSelectedAtLast = false;

      function updateStepTwoStatus() {
        if (isCarBrandSelected && isCarNumberComplete && isRadioSelected) {
          if (!isRadioSelectedAtLast) {
            $(".step-2").addClass("active");
            $(".text-info-label").hide();

            document.querySelector(".step-2").scrollIntoView({ block: "start", behavior: "smooth" });

            isRadioSelectedAtLast = true;
          }
        } else {
          $(".step-2").removeClass("active");
          isRadioSelectedAtLast = false;
        }
      }

      function updatePrice() {
        const checkboxes = document.querySelectorAll(".car-cleaning");
        const priceElement = document.querySelector(".new-price .price");

        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
              priceElement.innerHTML = "99<span>.</span>";
              price = 99;
            } else {
              priceElement.innerHTML = "77<span>.</span>";
              price = 77;
            }
          });
        });
      }

      function handleRadioSelection() {
        const radioButtons = document.querySelectorAll('input[name="where-wash-car"]');
        const step3 = document.querySelectorAll(".step-3");

        radioButtons.forEach((radio) => {
          radio.addEventListener("change", () => {
            if (radio.checked) {
              step3.forEach((e) => e.classList.add("active"));

              const label = radio.closest(".variant-item");
              const textSpan = label.querySelector(".img-wrap span");
              const place = textSpan ? textSpan.textContent.trim() : "";

              getAndRenderCarWashDetails(place);
              updateStepFour();
              document.querySelector(".step-3").scrollIntoView({ block: "start", behavior: "smooth" });
            }
          });
        });
      }

      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 49.611621, lng: 6.122964 },
          zoom: 13,
          mapTypeId: "roadmap",
          fullscreenControl: true,
          zoomControl: true,
          mapTypeControl: true,
        });

        let marker;

        map.addListener("click", (e) => {
          const coords = e.latLng;
          if (marker) {
            marker.setPosition(coords);
          } else {
            marker = new google.maps.Marker({
              position: coords,
              map: map,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              },
            });
          }
          console.log("Координаты: ", coords.toJSON());
        });
      }

      function getAndRenderCarWashDetails(place) {
        const monthNames = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ];

        const monthName = monthNames[currentSelectedDate.month];
        const formattedDate = `${currentSelectedDate.day} ${monthName}, в ${currentSelectedDate.time}`;

        const dateElement = document.querySelector(".date span");

        if (dateElement) {
          dateElement.textContent = `Вы выбрали мойку автомобиля ${formattedDate}.`;
        }

        const updateServiceList = () => {
          const checkboxes = document.querySelectorAll(
            '.left-section label input[type="checkbox"], .center label input[type="checkbox"]'
          );
          const selectedServices = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => {
              const textElement = checkbox.parentElement.querySelector(".text");
              return textElement ? textElement.textContent.trim() : "";
            });

          const servicesText = selectedServices.length ? `${selectedServices.join(", ")}` : "не выбрано ни одной услуги";

          const servicesElement = document.querySelector(".services");
          if (servicesElement) {
            servicesElement.innerHTML = `<span>Перечень услуг:</span> ${servicesText}`;
          }
        };

        const checkboxes = document.querySelectorAll(
          '.left-section label input[type="checkbox"], .center label input[type="checkbox"]'
        );

        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", updateServiceList);
        });

        if (place == "в гараже") {
          document.querySelector(".text-info .place span").textContent = `Мойка будет проведена ${place} за ${price}.7€`;
        } else {
          document.querySelector(
            ".text-info .place span"
          ).textContent = `Мойка будет проведена ${place} в нашей палатке за ${price}.7€`;
        }
        updateServiceList();
      }

      function updateStepFour() {
        const mapBtn = document.querySelector("#map-save");
        const step4 = document.querySelectorAll(".step-4");

        mapBtn.addEventListener("click", () => {
          step4.forEach((e) => e.classList.add("active"));
          validateAndHandleInput();
          document.querySelector(".step-4").scrollIntoView({ block: "start", behavior: "smooth" });
        });
      }

      function getMonthNameUpdated(monthIndex) {
        const monthNames = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ];
        return monthNames[monthIndex];
      }

      function validateAndHandleInput() {
        const addressInput = document.querySelector("#inputAddress");
        const nameInput = document.querySelector(".your-data #nameInput");
        const phoneInput = document.querySelector(".your-data #phoneInput");
        const emailInput = document.querySelector(".your-data #emailInput");
        const step5 = document.querySelector(".step-5");

        phoneInput.addEventListener("input", enforcePhoneFormat);
        emailInput.addEventListener("input", blockCyrillicInput);

        function validateName(name) {
          if (name.trim() === "") return "Имя не может быть пустым";
          if (name.trim().length > 10) return "Имя должно быть не длиннее 10 символов";
          return null;
        }

        function validatePhone(phone) {
          phone = phone.trim();

          if (phone === "" || phone === "+") return "Телефон не может быть пустым";

          const digitsCount = phone.replace(/\D/g, "").length;
          if (digitsCount < 11) return "Неправильный номер: слишком короткий";

          return null;
        }

        function enforcePhoneFormat(event) {
          const input = event.target;

          if (!input.value.startsWith("+")) {
            input.value = "+" + input.value.replace(/[^0-9]/g, "");
          }

          input.value = input.value.replace(/[^+\d]/g, "");

          const digitsCount = input.value.replace(/\D/g, "").length;

          if (digitsCount > 12) {
            input.value = input.value.slice(0, -1);
          }
        }

        function validateEmail(email) {
          if (email.trim() === "") return "E-mail не может быть пустым";
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(email)) return "Введите корректный e-mail";
          return null;
        }

        function blockCyrillicInput(event) {
          const value = event.target.value;
          event.target.value = value.replace(/[а-яА-ЯёЁ]/g, "");
        }

        function validateAddress(address) {
          if (address.trim() === "") return "Адрес не может быть пустым";
          return null;
        }

        function showError(input, message) {
          removeError(input);
          const error = document.createElement("div");
          error.className = "error-message";
          error.textContent = message;
          input.parentElement.insertBefore(error, input.nextSibling);
        }

        function removeError(input) {
          const error = input.parentElement.querySelector(".error-message");
          if (error) error.remove();
        }

        function validateAllFields() {
          let isValid = true;

          const addressError = validateAddress(addressInput.value);
          if (addressError) {
            showError(addressInput, addressError);
            isValid = false;
          }

          const nameError = validateName(nameInput.value);
          if (nameError) {
            showError(nameInput, nameError);
            isValid = false;
          }

          const phoneError = validatePhone(phoneInput.value);
          if (phoneError) {
            showError(phoneInput, phoneError);
            isValid = false;
          }

          const emailError = validateEmail(emailInput.value);
          if (emailError) {
            showError(emailInput, emailError);
            isValid = false;
          }

          if (isValid) {
            step5.classList.add("active");
            setTimeout(() => {
              document.querySelector(".step-5").scrollIntoView({ block: "start", behavior: "smooth" });
            }, 100);
          } else {
            step5.classList.remove("active");
          }
        }

        function handleInputWithDelay(input, validator) {
          let timeoutId;

          input.addEventListener("focus", () => {
            timeoutId = setTimeout(() => {
              const errorMessage = validator(input.value);
              if (errorMessage) {
                showError(input, errorMessage);
              }
            }, 3000);
          });

          input.addEventListener("input", () => {
            clearTimeout(timeoutId);
            const errorMessage = validator(input.value);
            if (!errorMessage) {
              removeError(input);
            } else {
              showError(input, errorMessage);
            }
          });

          input.addEventListener("blur", () => clearTimeout(timeoutId));
        }

        handleInputWithDelay(addressInput, validateAddress);
        handleInputWithDelay(nameInput, validateName);
        handleInputWithDelay(phoneInput, validatePhone);
        handleInputWithDelay(emailInput, validateEmail);

        [addressInput, nameInput, phoneInput, emailInput].forEach((input) => {
          input.addEventListener("input", validateAllFields);
        });

        const checkbox = document.getElementById("rulesCheckbox");
        const step6 = document.querySelector(".step-6");

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            step6.classList.add("active");
            setTimeout(() => {
              document.querySelector(".step-6").scrollIntoView({ block: "start", behavior: "smooth" });
            }, 10);
          } else {
            step6.classList.remove("active");
          }
        });

        const submitButton = document.querySelector(".submit-button");
        const orderModal = document.querySelector(".order-modal");
        const successModal = document.querySelector(".success-modal");
        const successModalCloseBtn = document.querySelector(".success-modal .close-btn");
        const successModalOkBtn = document.querySelector(".success-modal button");
        const successInfo = document.querySelector(".success-info");

        submitButton.addEventListener("click", () => {
          orderModal.classList.remove("show");
          successModal.classList.add("show");

          successInfo.innerHTML = `
          Вы забронировали мойку <br />
          автомобиля с номерами ${carNumber} <br />
          на ${currentSelectedDate.day} ${getMonthNameUpdated(currentSelectedDate.month)}, в ${currentSelectedDate.time}
        `;
        });

        successModalCloseBtn.addEventListener("click", () => {
          successModal.classList.remove("show");
          document.body.style.overflow = "unset";
        });

        successModalOkBtn.addEventListener("click", () => {
          successModal.classList.remove("show");
          document.body.style.overflow = "unset";
        });
      }

      checkStepOneFields();
      updatePrice();
      handleRadioSelection();
      // initMap();
    }

    function toggleAOSOnResize() {
      const element = document.querySelector(".mini-info");

      if (!element) return;

      const updateAOS = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
          element.removeAttribute("data-aos");
          element.removeAttribute("data-aos-delay");
          element.removeAttribute("data-aos-easing");
          element.removeAttribute("data-aos-duration");
        } else {
          element.setAttribute("data-aos", "fade-left");
          element.setAttribute("data-aos-delay", "500");
          element.setAttribute("data-aos-easing", "ease-in-out");
          element.setAttribute("data-aos-duration", "500");
        }
      };

      updateAOS();
      window.addEventListener("resize", updateAOS);
    }
  }

  const swiperServices = new Swiper(".services-swiper", {
    loop: true,
    navigation: {
      nextEl: ".first-next-services, .second-next-services, third-next-services",
      prevEl: ".first-prev-services, .second-prev-services, third-prev-services",
    },
    spaceBetween: 20,
    pagination: {
      el: ".services-pagination",
      clickable: true
    },

    on: {
      slideChange: function () {
        if (window.innerWidth < 540) {
          document.querySelectorAll('.services-item ul').forEach(item => {
            if (!this.slides[this.activeIndex].contains(item)) {
              item.classList.remove('active');
            }
          });
        }
      }
    }
  });

  function servicesListItems() {
    const buttons = document.querySelectorAll('.services-item button')
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const serviceItem = button.closest(".services-item");
        const listItems = serviceItem.querySelector(".services-item ul");
        const otherListItems = document.querySelectorAll(".services-item ul");

        if (listItems.classList.contains("active")) {
          listItems.classList.remove("active");

          button.querySelectorAll(".arrows svg").forEach((svg) => svg.classList.remove("rotate"));
        } else {
          if (window.innerWidth < 540) {
            otherListItems.forEach(element => {
              element.classList.remove('active');
            });
          }
          listItems.classList.add("active");

          button.querySelectorAll(".arrows svg").forEach((svg) => svg.classList.add("rotate"));
        }
      });
    });
  }
  servicesListItems();
  const cardsNav = document.querySelectorAll('.cards-nav .card-hour');
  const cardTabItem = document.querySelectorAll('.card-tab-item');

  cardsNav.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      cardsNav.forEach(t => t.classList.remove('active'));
      // Hide all content
      cardTabItem.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');
      // Show corresponding content
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`content-${tabId}`).classList.add('active');
    });
  });

  const sectionRight = document.querySelector('.select-what-we-need-todo .right-section')
  const sectionRightButton = document.querySelector('.select-what-we-need-todo .right-section .mobile-size-btn')

  if (sectionRight) {
    sectionRightButton.addEventListener('click', function (e) {
      e.preventDefault();
      sectionRight.classList.toggle('show')
      this.classList.toggle('show')
    })
  }

  const territoryMap = document.querySelector('#territory-map');
  const territoryMapButton = document.querySelector('#zoom-button');
  if (territoryMap) {
    territoryMap.addEventListener('click', function () {
      document.getElementById("mapModal").style.display = "flex";
    })
    territoryMapButton.addEventListener('click', function () {
      document.getElementById("mapModal").style.display = "flex";
    })
    document.querySelector(".close-map-modal").addEventListener("click", function () {
      document.getElementById("mapModal").style.display = "none";
    });

  }
});

function welcomeScreen() {
  const wrapper = document.querySelector(".wrapper");
  const welcomeScreen = document.querySelector(".welcome-screen");
  const logo = document.querySelector(".welcome-screen .logo");
  const languageSelects = document.querySelectorAll(".language-select");
  const languageState = localStorage.getItem("language");

  if (welcomeScreen) {
    if (!languageState) {
      welcomeScreen.classList.remove("hidden");
    } else {
      wrapper.classList.remove("hidden");
    }

    setTimeout(() => {
      logo.classList.add("active");
    }, 500);

    setTimeout(() => {
      languageSelects.forEach((select) => select.classList.add("active"));
    }, 3000);

    languageSelects.forEach((select) => {
      const buttons = select.querySelectorAll("button");

      buttons.forEach((button) => {
        if (button.getAttribute("data-lang") === languageState) {
          button.classList.add("active");
        }

        button.addEventListener("click", () => {
          localStorage.setItem("language", button.getAttribute("data-lang"));
          welcomeScreen.classList.add("hidden");
          wrapper.classList.remove("hidden");

          languageSelects.forEach((s) => {
            s.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
          });

          languageSelects.forEach((s) => {
            const correspondingButton = Array.from(s.querySelectorAll("button")).find(
              (b) => b.getAttribute("data-lang") === button.getAttribute("data-lang")
            );
            if (correspondingButton) {
              correspondingButton.classList.add("active");
            }
          });
        });
      });
    });
  }
}

welcomeScreen();