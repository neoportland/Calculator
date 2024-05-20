const display = document.querySelector(".calculator-input"); // input değeri
const keys2 = document.querySelectorAll(".calculator-keys button"); // bütün butonlar
const keys3 = document.querySelector(".calculator-keys"); // ana div
const hesapla = document.getElementsByClassName("equal-sign ")[0];
const temizle = document.getElementsByClassName("clear")[0];

let firstValue = null; // ilk gelen elemanları direk aktardığım değişken
let operator = null; // gelen opreatörü geçici olarak tutacağı değişken
let waitingForSecondValue = false; // ikinci değeri girip girmediğime göre kullancağım anahtar
let displayValue = "0"; // aşağıda bu değeri herdefasında set edip updatefonksiyonunda tekrar çağırıp basacağım

updateValue();
function updateValue() {
  display.value = displayValue;
}

keys3.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches("button")) return; //buton dışında bir şey bastıysan aşağıya gitme direk return ile geri çık

  if (element.classList.contains("operator")) {
    // operatörleri getirdim

    handleOperator(element.value);
    updateValue();

    // console.log("operator basıldı ", e.target.value);
    return; // ben bir değere bastım geri kalan kodları çalıştırmana gerek yok
  }

  if (element.classList.contains("decimal")) {
    inputDecimal(element.value); //
    updateValue(); // her defasında ekranı düzenlemek için tekrar tekrar çağırdığım kod
    return;
  }
  if (element.classList.contains("clear")) {
    console.log("clear basıldı ", element.value);
    inputClear();
    updateValue();
    return;
  }

  inputNumber(element.value);
  updateValue();
});

function handleOperator(operatorgelen) {
  const value = parseFloat(displayValue);
  //  ben ik değerden sonra yani eşittirden sora da tekrar  devam etmek istersem
  if (operator && waitingForSecondValue) {
    operator = operatorgelen;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operatorgelen) {
    const result = calculator(firstValue, value, operator);
    displayValue = String(result);
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = operatorgelen;

  console.log(
    "handleoperator çıkışı :",
    displayValue,
    firstValue,
    operator,
    waitingForSecondValue
  );
}

function inputNumber(event) {
  if (waitingForSecondValue) {
    displayValue = event;
    waitingForSecondValue = false; //tekrar anahtarı kapattık ki girilen değerler artık ekrana yazılmaya devam etsin
  } else {
    displayValue = displayValue === "0" ? event : displayValue + event;
  }
}
console.log(waitingForSecondValue);

function inputDecimal(event) {
  // operatöre basılmış yani ikinci değer giriliyorsa o zaman bir if bloğu ile gelen değeri geçici bir yerde tutman lazım

  if (!displayValue.includes(".")) {
    displayValue = displayValue + event;
  } else {
    console.log("  zaten basmıştınız");
  }
}

function inputClear() {
  displayValue = "0";
}

function calculator(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "/") {
    return first / second;
  } else if (operator === "*") {
    return first * second;
  }

  return second; // bu da eşittir butonuna bastığında geriye seconda yani displayValue yi geri gönderiyorsun
}
