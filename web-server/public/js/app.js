const weather = document.querySelector("form")
const inputLocation = document.querySelector("input")
const m1 = document.getElementById("m1")
const m2 = document.getElementById("m2")
const m3 = document.getElementById("m3")

fetch("https://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}).catch((error) => {
    console.log(error)
})

// const getData = async () => {
//     const response = await fetch("http://localhost:3000/weather?address=nablus");
//     const data = await response.json();
//     console.log(data)
// }

// getData();


weather.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("/weather?address=" + inputLocation.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = data.error
                m2.textContent = ""
                m3.textContent = ""
            }
            else {
                m1.textContent = inputLocation.value
                m2.textContent = data.temperature
                m3.textContent = "The weather descriptions is: " + data.weather_descriptions
            }
        })
    })
})