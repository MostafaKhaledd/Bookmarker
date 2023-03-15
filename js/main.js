let BookName = document.getElementById("BookmarkerName")
let BookLinke = document.getElementById("websiteURL")
let searchInput = document.getElementById("searchInput")
let alertName = document.getElementById("alertName")
let alertLink = document.getElementById("alertLink")
let already = document.getElementById("already")
let BookList = []
let currentindex = 0
let numberOflist = 0
let result
// ======================================================================
if (localStorage.getItem("Bookinfo") != null) {
    BookList = JSON.parse(localStorage.getItem("Bookinfo"))
    display()
}
function BookInfo() {
    if (validName() == true && validLinke() == true) {
        already.classList.add("d-none")
        let Book = {
            name: document.getElementById("BookmarkerName").value,
            link: document.getElementById("websiteURL").value,
        }
        result = BookList.some((e) => {
            return e.name.toLowerCase() == BookName.value.toLowerCase()
        })
        if (result == false) {
            BookList.push(Book)
            localStorage.setItem("Bookinfo", JSON.stringify(BookList))
            display()
            BookName.value = ""
            BookLinke.value = ""
            BookName.classList.remove("is-valid")
            BookLinke.classList.remove("is-valid")
        }

        else {
            already.classList.remove("d-none")
        }
    }
}

function display() {
    let temp = ""
    for (let i = 0; i < BookList.length; i++) {
        temp += `<div class="background_vip my-3 w_95 m-auto row">
        <div class="col-md-4">
        <h3 class="my-4">`+ BookList[i].name + `</h3>
        </div>
        <div class="col-md-1 my-4">
          <a href="`+ BookList[i].link + `" target="_blank"> <button type="button" class="btn btn-dark">Visit</button></a>
        </div>
        <div class="col-md-1 my-4">
        <button onclick="model(`+ i + `)" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Delet</button>
        </div>
        <div class="col-md-1 my-4">
        <button onclick="updatebook(`+ i + `)" type="button" class="btn  btn-success">update</button>
        </div>
        </div>`
    }
    document.getElementById("Divbody").innerHTML = temp
}
function getindex(index) {
    currentindex = index
}
let numberOfbook = 0
function model(number) {
    numberOfbook = number
}
function Deletbook() {
    BookList.splice(numberOfbook, 1)
    localStorage.setItem("Bookinfo", JSON.stringify(BookList))
    display()
}
function updatebook(numberOfup) {
    numberOflist = numberOfup
    BookName.value = BookList[numberOfup].name
    BookLinke.value = BookList[numberOfup].link
    document.getElementById("Submit").style.display = "none"
    document.getElementById("Add_edit").style.display = "inline"
    localStorage.setItem("Bookinfo", JSON.stringify(BookList))
    display()
}
function edit() {
    BookList[numberOflist].name = BookName.value
    BookList[numberOflist].link = BookLinke.value
    document.getElementById("Submit").style.display = "inline"
    document.getElementById("Add_edit").style.display = "none"
    localStorage.setItem("Bookinfo", JSON.stringify(BookList))
    display()
    BookName.value = ""
    BookLinke.value = ""
}
function search() {
    let searchValue = searchInput.value.toLowerCase()
    console.log(searchValue)
    let temp = ""
    for (let i = 0; i < BookList.length; i++) {
        if (BookList[i].name.toLowerCase().includes(searchValue) == true) {
            temp += `<div class="background_vip my-3 w_95 m-auto row">
     <div class="col-md-4">
     <h3 class="my-4">`+ BookList[i].name.toLowerCase().replace(searchValue, '<span class="text-danger fw-bolder">' + searchValue + '</span>') + `</h3>
     </div>
     <div class="col-md-1 my-4">
       <a href="`+ BookList[i].link + `" target="_blank"> <button type="button" class="btn btn-dark">Visit</button></a>
     </div>
     <div class="col-md-1 my-4">
     <button onclick="Deletbook(`+ i + `)" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Delet</button>
     </div>
     <div class="col-md-1 my-4">
        <button onclick="updatebook(`+ i + `)" type="button" class="btn  btn-success">update</button>
        </div>
     </div>`
        }
    }
    document.getElementById("Divbody").innerHTML = temp
}

function validName() {
    let reg = /^[A-Z a-z 0-9]{3,25}$/
    if (reg.test(BookName.value) == true) {
        alertName.classList.replace("d-block", "d-none")
        BookName.classList.add("is-valid")
        BookName.classList.remove("is-invalid")
        return true
    }
    else {
        alertName.classList.replace("d-none", "d-block")
        BookName.classList.add("is-invalid")
        BookName.classList.remove("is-valid")
        return false
    }
}
function validLinke() {
    let reg = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
    if (reg.test(BookLinke.value) == true) {
        alertLink.classList.replace("d-block", "d-none")
        BookLinke.classList.add("is-valid")
        BookLinke.classList.remove("is-invalid")
        return true
    }
    else {
        alertLink.classList.replace("d-none", "d-block")
        BookLinke.classList.add("is-invalid")
        BookLinke.classList.remove("is-valid")
        return false
    }
}
BookName.addEventListener("blur", validName)
BookLinke.addEventListener("blur", validLinke)



