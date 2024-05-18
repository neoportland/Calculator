const display = document.querySelector(".calculator-input"); // input değeri
const keys2 = document.querySelectorAll(".calculator-keys button"); // bütün butonlar
const keys3 = document.querySelector(".calculator-keys"); // ana div
const operator = document.querySelectorAll(".operator");
const hesapla = document.getElementsByClassName("equal-sign ")[0];
const temizle = document.getElementsByClassName("clear")[0];

let displayValue = "0";
updateValue();
function updateValue() {
  display.value = displayValue;
}

keys3.addEventListener("click", function (e) {
  const element = e.target;

  if (element.classList.contains("operator")) {
    // operatörleri getirdim
    console.log("operator basıldı ", e.target.value);
    return; // ben bir değere bastım geri kalan kodları çalıştırmana gerek yok
  }
  if (element.classList.contains("decimal")) {
    console.log("decimal basıldı ", element.value);
    return;
  }
  if (element.classList.contains("clear")) {
    console.log("clear basıldı ", element.value);
    return;
  }

  inputNumber(element.value);
  updateValue();
});

function inputNumber(event) {
  displayValue = displayValue === "0" ? event : displayValue + event;
}
