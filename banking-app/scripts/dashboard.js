const dom = document;
let userList = [];
let expensesList = [];
let value;
let key;
if (sessionStorage.getItem("activeIndex") === null) {
  window.location.href = "./login.html";
} else {
  key = sessionStorage.getItem("activeIndex");
}

if (localStorage.length != 0) {
  let retrievedObject = localStorage.getItem("userList");
  userList = JSON.parse(retrievedObject);
}

dom.getElementById("user").innerHTML = `${userList[key].fullname}`;
dom.getElementById("balance").innerHTML = `${userList[key].balance.toFixed(2)}`;

dom.getElementById("deposit").addEventListener("click", function () {
  transact("deposit");
  if (value <= 0) {
    window.alert("Value must be a positive amount.");
    return;
  }
  if (!Number.isInteger(value) || !isFloat(value)) {
    userList[key].balance += value;
    userList[key].transaction.push({
      date: dateToday(),
      transaction: "Deposit",
      amount: value.toFixed(2),
    });
    localStorage.setItem("userList", JSON.stringify(userList));
    location.reload();
    dom.getElementById("balance").innerHTML = userList[key].balance.toFixed(2);
  }
});

dom.getElementById("withdraw").addEventListener("click", function () {
  transact("withdraw");
  if (value <= 0) {
    window.alert("Value must be a positive amount.");
    return;
  }
  if (!Number.isInteger(value) || !isFloat(value)) {
    if (userList[key].balance >= value) {
      userList[key].balance = (userList[key].balance - value).toFixed(2);
      userList[key].balance = parseFloat(userList[key].balance);
      userList[key].transaction.push({
        date: dateToday(),
        transaction: "Withdrawal",
        amount: value.toFixed(2),
      });
      localStorage.setItem("userList", JSON.stringify(userList));
      location.reload();
      dom.getElementById("balance").innerHTML =
        userList[key].balance.toFixed(2);
    } else {
      window.alert(
        "The withdrawal amount exceeds the balance. Withrawal has failed."
      );
    }
  }
});

dom.getElementById("transfer").addEventListener("click", function () {
  let recIndex;
  let receiver = prompt(`Please enter a valid email address`);
  for (i = 0; i < userList.length; i++) {
    if (userList[i].email === receiver) {
      recIndex = i;
      break;
    }
  }
  if (i === userList.length) {
    window.alert("There's no email in ther record. User does not exists.");
    return;
  }
  if (recIndex == key) {
    window.alert("The email is the current user account. Transfer invalid.");
    return;
  }
  transact("transfer");
  if (value <= 0) {
    window.alert("Value must be a positive amount.");
    return;
  }
  if (!Number.isInteger(value) || !isFloat(value)) {
    if (userList[key].balance >= value) {
      userList[key].balance = (userList[key].balance - value).toFixed(2);
      userList[key].balance = parseFloat(userList[key].balance);
      dom.getElementById("balance").innerHTML =
        userList[key].balance.toFixed(2);
      userList[recIndex].balance += value;
      userList[key].transaction.push({
        date: dateToday(),
        transaction: `Transferred to ${userList[recIndex].fullname}`,
        amount: value.toFixed(2),
      });
      userList[recIndex].transaction.push({
        date: dateToday(),
        transaction: `Received from ${userList[key].fullname}`,
        amount: value.toFixed(2),
      });
      localStorage.setItem("userList", JSON.stringify(userList));
      window.alert(
        `Transferred ₱ ${value.toFixed(2)} to ${userList[recIndex].fullname}`
      );
      location.reload();
    } else {
      window.alert("Not enough money. The transfer has failed.");
    }
  }
  recIndex = null;
});

function transact(input) {
  value = parseFloat(
    parseFloat(prompt(`Please enter ${input} amount.`)).toFixed(2)
  );
  while (!Number.isInteger(value) && !isFloat(value)) {
    value = parseFloat(
      parseFloat(prompt(`Please enter a valid ${input} amount.`)).toFixed(2)
    );
  }
}

function isFloat(num) {
  return !!(num % 1);
}

dom.getElementById("logout").addEventListener("click", function () {
  sessionStorage.removeItem("activeIndex");
  window.location.href = "./login.html";
});

let admin = true;
if (admin === true) {
  for (let i = 0; i < userList.length; i++) {
    const row = document.createElement("tr");
    dom.getElementById("usertbody").appendChild(row);
    row.setAttribute("id", `row ${i + 1}`);
    row.appendChild(document.createElement("td")).innerHTML = userList[i].email;
    row.appendChild(document.createElement("td")).innerHTML = userList[i].fname;
    row.appendChild(document.createElement("td")).innerHTML = userList[i].lname;
    row.appendChild(document.createElement("td")).innerHTML =
      "₱" + userList[i].balance;
    row.appendChild(document.createElement("td")).innerHTML =
      userList[i].created;
  }
}

var Expenses = function (item, cost) {
  this.item = item;
  this.cost = cost;
};

function addExpense(item, cost) {
  let expense = new Expenses(item, cost.toFixed(2));
  userList[key].expenses.push(expense);
  localStorage.setItem("userList", JSON.stringify(userList));
  location.reload();
}

let newExpenses = new Expenses(null, null);

dom.getElementById("expensebutton").addEventListener("click", function () {
  let item = prompt(`Please enter the expense name.`);
  while (item === "") {
    item = prompt(`Please enter the expense name.`);
  }
  let cost = parseFloat(parseFloat(prompt(`Please enter the cost`)).toFixed(2));
  while (!Number.isInteger(cost) && !isFloat(cost)) {
    cost = parseFloat(
      parseFloat(prompt(`Please enter a valid amount`)).toFixed(2)
    );
  }
  if (cost <= 0) {
    window.alert("Value must be a positive amount.");
    return;
  }
  addExpense(item, cost);
});

function dateToday() {
  let today = new Date();
  let date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
}

let totalcost = 0;
for (let i = 0; i < userList[key].expenses.length; i++) {
  const row = document.createElement("tr");
  dom.getElementById("expensestbody").appendChild(row);
  row.setAttribute("id", `row ${i + 1}`);
  row.appendChild(document.createElement("td")).innerHTML =
    userList[key].expenses[i].item;
  row.appendChild(document.createElement("td")).innerHTML =
    "₱" + userList[key].expenses[i].cost;
  totalcost = +userList[key].expenses[i].cost;
}
userList[key].balance = userList[key].balance - totalcost;
dom.getElementById("balance").innerHTML = `${userList[key].balance.toFixed(2)}`;

for (let i = 0; i < userList[key].transaction.length; i++) {
  const row = document.createElement("tr");
  dom.getElementById("transacttbody").appendChild(row);
  row.setAttribute("id", `row ${i + 1}`);
  row.appendChild(document.createElement("td")).innerHTML =
    userList[key].transaction[i].date;
  row.appendChild(document.createElement("td")).innerHTML =
    userList[key].transaction[i].transaction;
  row.appendChild(document.createElement("td")).innerHTML =
    "₱" + userList[key].transaction[i].amount;
}
