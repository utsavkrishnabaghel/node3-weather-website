//console.log('client side javascript file is loaded ')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

//
//
//goal: fetch weather
//
// 1. setup a call to fetch to fetch weather for new delhi
// 2. setup the parse json response
//     - if error property print error
//     - if no error property ,print location and forecast
// 3. refresh the browser and test your work

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = 'from javascript'

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";

    fetch("/weather?address=" + location).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            });
        }
    );
});