const htmlArrCase = document.querySelector('.__insertArray')
const formCase = document.getElementById('__formCase')
const inputField = document.getElementById('__inputField')
const btn = document.getElementById('__submit')
const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const errSibling = document.querySelector('.inner__content')
// console.log(errSibling.previousElementSibling)

formCase.addEventListener('submit', (e) => {
    e.preventDefault()
    let value = inputField.value
    if(value === '') return console.log('Please enter a value')
    addData(value)
    clear()
})

function clear () {
    return inputField.value = ''
}

function addData(value) {
    const dictionaryAPI = API.concat(value)

    fetch(dictionaryAPI)
        .then(res => {
            if(res.status === 404) {
                // return alert(`Sorry we couldn't find the definition of ${value}`)
                const errMessage = `
                    <button type="button" class="__modalParent" onClick="closeErrModal(this)">
                        <div class="__modalCase">
                            <div class="__err">Sorry! We cannot find the word: <br> <h2 class="__valCap">${value}</h2></div>
                        </div>
                    </button>
                `
                return errSibling.insertAdjacentHTML("beforebegin", errMessage)
            }
            return res.json()
        })
        .then(datas => {
            // console.log(datas)
            let title = (datas[0].word)
            let definition = (datas[0].meanings[0].definitions[0].definition)

            if (datas[0].meanings > 1) {
                const meanings = datas[0].meanings
                // console.log(meanings, 'hmm')
            }
            
            const content = `
                <div class="eachArr">
                    <h1>${title}</h1>
                    <p class="__def">${definition}</p>
                    <button onClick="deleteItem(this)">X</button>
                </div>
            `
            htmlArrCase.insertAdjacentHTML("afterbegin", content)
        })
    inputField.focus()
}

function deleteItem(elementToDelete) {
    console.log(`Requested to delete this item from the UI ${elementToDelete}`)

    //  Remove the entire element, target the parent element
    elementToDelete.parentElement.remove()
}

function closeErrModal(closeModal) {
    closeModal.remove()
}