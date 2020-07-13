document.addEventListener('DOMContentLoaded', () => {

    let tableBody = document.querySelector('tbody#table-body')

    let editBlock = document.querySelector('div#edit-block')
    editBlock.style.display = 'none'

    let editForm = document.querySelector('form#dog-form')

    function fetchDogs(){
        tableBody.innerHTML = ""
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(addDogs)
    }

    function addDogs(dogs){
        dogs.forEach(dog => addDog(dog))
    }

    function addDog(dog){

        let tableRow = document.createElement('tr')
        let name = document.createElement('td')
        let breed = document.createElement('td')
        let sex = document.createElement('td')
        let edit = document.createElement('td')
        let editButton = document.createElement('button')

        name.innerText = dog.name
        breed.innerText = dog.breed
        sex.innerText = dog.sex
        editButton.innerText = 'Edit'
        
        edit.append(editButton)
        tableRow.append(name, breed, sex, edit)
        tableBody.append(tableRow)

        editButton.addEventListener('click', () => {
            editBlock.style.display = 'block'

            editForm.addEventListener('submit', () => {
                event.preventDefault()

                let newName = event.target[0].value
                let newBreed = event.target[1].value
                let newSex = event.target[2].value

                let updatedDog = dog
                updatedDog.name = newName
                updatedDog.breed = newBreed
                updatedDog.sex = newSex

                let configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": updatedDog.name,
                        "breed": updatedDog.breed,
                        "sex": updatedDog.sex
                    })
                }

                fetch(`http://localhost:3000/dogs/${dog.id}`, configObj)
                .then(res => res.json())
                .then(fetchDogs)
                editForm.reset()
            })
        })
    }

    fetchDogs()


})