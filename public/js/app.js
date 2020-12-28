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
            let { forecast } = {...data}

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageTwo.textContent = `The weather for ${forecast.location.name}, ${forecast.location.country} is currently: ${forecast.current.temperature}°C`
            }

        })
    })
})

