const form = document.getElementById("formulario");
const indexedDB = window.indexedDB;
const list = document.getElementById("listaContact");
let db;
let lastItem = 1;

function addData(data) {
    let transaction = db.transaction(["contact"], "readwrite");
    let objectStore = transaction.objectStore("contact");
    let request = objectStore.add(data);
}

function readData() {
    let transaction = db.transaction(["contact"], "readonly");
    let objectStore = transaction.objectStore("contact");
    let request = objectStore.openCursor();
    let res = "";
    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            res += "<li>" + cursor.value.name + "</li>"
            cursor.continue();
        }
        list.innerHTML = res;
    }
}

function readLastData() {
    let transaction = db.transaction(["contact"], "readonly");
    let objectStore = transaction.objectStore("contact");
    let request = objectStore.openCursor();
    let actualItem = 2;
    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            actualItem++;
            cursor.continue();
        }else{
            lastItem = actualItem;
        }
    }
    console.log(lastItem);
}

if (indexedDB && form) {
    let request = indexedDB.open("contactList", 1)
    request.onupgradeneeded = () => {
        db = request.result;
        console.log("Database creada");
        let objectStore = db.createObjectStore("contact", { autoIncrement: true });
    }
    request.onsuccess = () => {
        db = request.result
        console.log("Database abierta");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            readLastData();
            let data = {
                id: lastItem,
                name: e.target.name.value
            }
            addData(data);
            readData();
        });
    }
    request.onerror = (error) => {
        console.log("Error");
    }
}