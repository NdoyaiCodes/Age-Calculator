document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const resultYears = document.getElementById("result-years");
  const resultMonths = document.getElementById("result-months");
  const resultDays = document.getElementById("result-days");
  const ageForm = document.getElementById("age-form");
  const errorMessage = document.getElementById("error-message");

  // Add a submit event listener to the form
  ageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from input fields
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value) - 1; // Subtract 1 to match JavaScript months (0-11)
    const year = parseInt(yearInput.value);

    errorMessage.textContent = ""; // Clear previous error messages

    // Clear previous validation messages
    document.getElementById("day-error").textContent = "";
    document.getElementById("month-error").textContent = "";
    document.getElementById("year-error").textContent = "";

    let isValid = true;

    // Validate day input
    if (!day) {
      document.getElementById("day-error").textContent =
        "This field is required.";
      isValid = false;
    } else if (day < 1 || day > 31) {
      document.getElementById("day-error").textContent =
        "Enter a valid day (1-31).";
      isValid = false;
    }

    // Validate month input
    if (!month) {
      document.getElementById("month-error").textContent =
        "This field is required.";
      isValid = false;
    } else if (month < 0 || month > 11) {
      document.getElementById("month-error").textContent =
        "Enter a valid month (1-12).";
      isValid = false;
    }

    // Validate year input
    if (!year) {
      document.getElementById("year-error").textContent =
        "This field is required.";
      isValid = false;
    } else if (year < 1900 || year > new Date().getFullYear()) {
      document.getElementById("year-error").textContent =
        "Enter a valid year (1900 - current year).";
      isValid = false;
    }

    // If any validation failed, stop processing
    if (!isValid) {
      return;
    }

    // Calculate age and display result
    const today = new Date();
    const inputDate = new Date(year, month, day);
    const age = calculateAge(inputDate, today);
    displayAgeResultWithAnimation(age);
  });

  // Calculate the difference in years, months, and days between two dates
  function calculateAge(birthdate, today) {
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
      months--;
      days += daysInMonth(birthdate.getMonth(), birthdate.getFullYear());
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  // Calculate the number of days in a specific month of a year
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Display the calculated age with animation
  function displayAgeResultWithAnimation(age) {
    const startYears = parseInt(resultYears.textContent) || 0;
    const startMonths = parseInt(resultMonths.textContent) || 0;
    const startDays = parseInt(resultDays.textContent) || 0;

    const animationDuration = 1000; // Animation duration in milliseconds
    const fps = 60; // Frames per second
    const frames = (animationDuration / 1000) * fps; // Total frames

    const yearsStep = (age.years - startYears) / frames;
    const monthsStep = (age.months - startMonths) / frames;
    const daysStep = (age.days - startDays) / frames;

    let frameCount = 0;

    const animationInterval = setInterval(() => {
      if (frameCount === frames) {
        clearInterval(animationInterval);
      } else {
        resultYears.textContent = Math.round(
          startYears + yearsStep * frameCount
        );
        resultMonths.textContent = Math.round(
          startMonths + monthsStep * frameCount
        );
        resultDays.textContent = Math.round(startDays + daysStep * frameCount);
        frameCount++;
      }
    }, 1000 / fps);
  }
});
