let Form = document.getElementById("form")
let AddButton = document.getElementById("add-content")
let Dropdown = document.getElementById("dropdown")

// Form.appendChild(Input)
function addInput(){
    let Row = document.createElement("div")
    let NewInput = document.createElement("input")
    let DeleteButton = document.createElement("button")
    let SubmitButton = document.createElement("button")

    DeleteButton.innerHTML ="Delete"
    SubmitButton.innerHTML = "Add"

    if (Dropdown.value == "paragraph"){
        NewInput.type = "text"
        NewInput.className = "paragraph"
        Row.className = "row"
        Row.appendChild(NewInput)
        Row.appendChild(SubmitButton)
        Row.appendChild(DeleteButton)
        Form.appendChild(Row)
    }else{
        NewInput.type = "text"
        NewInput.className = "image"
        Row.className = "row"
        Row.appendChild(NewInput)
        Row.appendChild(SubmitButton)
        Row.appendChild(DeleteButton)
        Form.appendChild(Row)
    }

}