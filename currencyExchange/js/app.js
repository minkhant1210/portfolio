let input = document.querySelector("#input");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let result = document.querySelector("#result");
let historyList = document.querySelector("#historyList");


function toNum(x){
   return Number(x.replace(",", ""));
};

function addToSelect(x, y, z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value", toNum(z));
    o.appendChild(t);
    x.appendChild(o);
};

for( x in data.rates){
    // console.log(x);
    // console.log(data.rates[x]);
    addToSelect(from, x, data.rates[x]);
    addToSelect(to, x, data.rates[x]);
};

function createTr(x){
    let rowSpacer = document.querySelector("#rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    };

    let tr = document.createElement("tr");
    x.map((el) => {
        let td =document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    historyList.appendChild(tr);
};

function store(){
    localStorage.setItem("record",historyList.innerHTML);
}
    
document.querySelector("#calc").addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e);
    
    //get
    let x = input.value;
    let y = from.value;
    let z = to.value;
    
    //process
    let first = x * y;
    let second = first / z;
    let finalResult = second.toFixed(2);
    let date = new Date().toLocaleString();
    let fromText = x +" "+ from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    let arr = [date,fromText,toText,finalResult];
    createTr(arr);
    store();
    //set
    result.innerHTML = finalResult;

    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";

});

(() => {
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr id = "rowSpacer"><td colspan="4">There is no record!</td></tr>`
    }
})();

function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun");
}

    




