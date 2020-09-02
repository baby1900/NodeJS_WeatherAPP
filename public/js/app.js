console.log('Client side JS file is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchWeather = (address) => {
    fetch('/weather?address=' + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
            }       
        })
    })
}




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = searchElement.value

    fetchWeather(location)
})