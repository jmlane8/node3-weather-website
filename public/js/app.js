
 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ""
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    messageOne.textContent = ""
    messageTwo.textContent = "Fetching content"
    const location = search.value
    console.log(location)

    url = "/weather?address=" + location

    
fetch(url).then((response) => {
    console.log(response)
    response.json().then((abcdata) => {
        if (!abcdata.error){
            messageOne.textContent = abcdata.location
            messageTwo.textContent = abcdata.forecast
        } else {
            messageTwo.textContent = abcdata.error
        }
        
    
    })
})

})
