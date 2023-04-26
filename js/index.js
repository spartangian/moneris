let url = 'http://10.0.0.224:8082/api.php';
let myCheckout = new monerisCheckout();
myCheckout.setMode("qa");
myCheckout.setCheckoutDiv("monerisCheckout");


let body= JSON.stringify({'total' : '300.00'});

const myPageLoad = (params) =>{
    console.log(params);
}

async function sendRequest(){
    fetch(url, {
        Method: 'POST',
        Headers: {
            'Content-Type': 'application/json'
        },
        Body: body,
        Cache: 'default'
    })
        .then(res => console.log(res))
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

let ticket = '';
let xhr = new XMLHttpRequest();
xhr.open('POST', url, true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        let response = JSON.parse(xhr.responseText);
        ticket = response.response.ticket;
        myCheckout.startCheckout(ticket);
    }
}
xhr.send(body);

const myPaymentReceipt = (params) => {
    console.log(params);
}

const myPaymentComplete = (params) => {
    console.log(params);
}

const myErrorEvent = (params) => {
    console.log(params);
}

const myCancelTransaction = (params) => {
    console.log(params);
}

const myPageClosed = (params) => {
    console.log(params);
}

myCheckout.setCallback("page_loaded", myPageLoad);
myCheckout.setCallback("cancel_transaction", myCancelTransaction);
myCheckout.setCallback("error_event", myErrorEvent);
myCheckout.setCallback("payment_receipt", myPaymentReceipt);
myCheckout.setCallback("payment_complete", myPaymentComplete);
myCheckout.setCallback("page_closed", myPageClosed);
