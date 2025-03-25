const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn"); 
const cashInDrawer = document.getElementById("cash-in-drawer");

let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const values = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
const valuesTitles = ["Pennies", "Nickels", "Dimes", "Quarters", "Ones", "Fives", "Tens", "Twenties", "Hundreds"];

let price = 1.87;

function countTheChangeBills(change, values, cidReversed) {
    let changeBills = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < values.length; i++) {
        let numberOfBills = 0;
        let valueOfBills = cidReversed[i][1];
        while (change >= values[i] && valueOfBills > 0) {
            valueOfBills = parseFloat((valueOfBills - values[i]).toFixed(2));
            change = parseFloat((change - values[i]).toFixed(2));
            numberOfBills++;
        };
        if (numberOfBills > 0) {
            changeBills[i] = parseFloat((values[i] * numberOfBills).toFixed(2));
        };
    };
    if (change > 0) {
        // insuf funds
        changeBills = [];
    }
    return changeBills;
};

function showMoneyInDrawer(cid, valuesTitles) {
    cashInDrawer.innerHTML = "";
    for (let i = 0; i < cid.length; i++) {
        cashInDrawer.innerHTML += `<p>${valuesTitles[i]}: $${cid[i][1]}</p>`;
    };
};

function showState(status, changeBills, cidReversed) {
    changeDue.innerText = status;
    for (let i = 0; i < changeBills.length; i++) {
        if (changeBills[i] > 0) {
            changeDue.innerText += `${cidReversed[i][0]}: $${changeBills[i]}`;
            changeDue.innerText += "\n";
        }
    }
}

function updateCid(changeBills, cidReversed) {
    for(let i = 0; i < cidReversed.length; i++) {
        cidReversed[i][1] = parseFloat((cidReversed[i][1] - changeBills[i]).toFixed(2));
    }
}

function main() {
    let cashRecieved = Number(cash.value);
    let change = parseFloat((cashRecieved - price).toFixed(2));
    let moneyInDrawer = parseFloat((cid.reduce((acc, el) => acc + el[1], 0)).toFixed(2));
    let cidReversed = cid.toReversed();

    // show the change
    if (cashRecieved < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cashRecieved === price) {
        changeDue.innerText = "No change due - customer paid with exact cash";
    } else if (moneyInDrawer < change) {
        changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (moneyInDrawer > change) {
        let changeBills = countTheChangeBills(change, values, cidReversed);
        if (changeBills.length === 0) {
            changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
        } else {
            updateCid(changeBills, cidReversed);
            showState(`Status: OPEN\n`, changeBills, cidReversed);
        }
    } else if (change === moneyInDrawer) {
        let changeBills = countTheChangeBills(change, values, cidReversed);
        updateCid(changeBills, cidReversed);
        showState(`Status: CLOSED\n`, changeBills, cidReversed);
    };
    // show what's left in the drawer
    showMoneyInDrawer(cid, valuesTitles);
};
showMoneyInDrawer(cid, valuesTitles);
purchaseButton.addEventListener("click", main);