const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = 'Loading...'
    messageOne.textContent = ''


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {

            JSON.stringify(data)
            let { forecast } = { ...data }

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageTwo.textContent = `City: ${forecast.location.name}, 
                Country: ${forecast.location.country}.
                The temperature is currently: ${forecast.current.temperature}°C.
                It is ${forecast.current.weather_descriptions[0]} with a Wind speed of ${forecast.current.wind_speed} Km/h and a humidity of ${forecast.current.humidity}%`
            }

        })
    })
})

