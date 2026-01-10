let Base_Url = "https://open.er-api.com/v6/latest/";
let Dropdown = document.querySelectorAll("#Dropdown");
let fromInput = document.querySelector(".from-input");
let toInput = document.querySelector(".to-input");
let exchangeIconBtn = document.querySelector(".exchangeIconBtn");
let exchangeImg = document.querySelector(".exchange");
let currencyTxt = document.querySelector(".currencyTxt");
let fromValue;
let toValue;
let Isrotated = false;

for (let select of Dropdown) {
    for (let code in countryList) {
        code = countryList[code];
        let option = document.createElement("option");
        option.value = code;
        option.innerText = code;
        if (select.name === "from" && code === "IN") {
            option.selected = true;
        } else if (select.name === "to" && code === "US") {
            option.selected = true;
        }
        select.append(option);
    }
}

for (let select of Dropdown) {
    select.addEventListener("change", (evt) => {
        let code = evt.target.value;
        let img = evt.target.parentElement.querySelector("img");
        img.src = `https://flagsapi.com/${code}/flat/64.png`;
        fetchValues();
    });
}

fromInput.addEventListener("input", async () => {
    convert();
})

toInput.addEventListener("input", async () => {
    convertReverse();
})

exchangeIconBtn.addEventListener("click", async () => {

    if (Isrotated) {
        exchangeImg.style.transition = "transform 0.5s ease-in-out";
        exchangeImg.style.transform = "rotate(0deg)";
        Isrotated = false;
    } else {
        exchangeImg.style.transition = "transform 0.5s ease-in-out";
        exchangeImg.style.transform = "rotate(180deg)";
        Isrotated = true;
    }

    let Temp = Dropdown[0].value;
    Dropdown[0].value = Dropdown[1].value;
    Dropdown[1].value = Temp;

    let img = Dropdown[0].parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${Dropdown[0].value}/flat/64.png`;

    let img2 = Dropdown[1].parentElement.querySelector("img");
    img2.src = `https://flagsapi.com/${Dropdown[1].value}/flat/64.png`;

    convert();
    fetchValues();
})

async function convert() {
    fetchValues();
    let response = await fetch(`${Base_Url}${fromValue}`);
    let data = await response.json();
    let rate = data.rates[toValue];
    if (fromInput.value <= 0 || fromInput.value == "") {
        fromInput.value = 1;
    }
    toInput.value = (fromInput.value * rate).toFixed(2);
}

async function convertReverse() {
    fetchValues();
    console.log(`${Base_Url}${fromValue}`);
    let response = await fetch(`${Base_Url}${fromValue}`);
    let data = await response.json();
    let rate = data.rates[toValue];
    if (toInput.value <= 0 || toInput.value == "") {
        toInput.value = 1;
    }
    fromInput.value = (toInput.value * rate).toFixed(2);
}

let fetchValues = () => {
    fromValue = Object.entries(countryList).find(([k, v]) => v.toLowerCase() === Dropdown[0].value.toLowerCase())[0];
    toValue = Object.entries(countryList).find(([k, v]) => v.toLowerCase() === Dropdown[1].value.toLowerCase())[0];
    currencyTxt.innerText = `Converting Curreny From ${fromValue} To ${toValue}`;
}