const dom = document;
let userList = [];
let expensesList = [];
let value;
let key;

//Save Active User in SessionStorage | Logout and redirect if there's no active user
if (sessionStorage.getItem("activeIndex") === null) {
  window.location.href = "./login.html";
} else {
  key = sessionStorage.getItem("activeIndex");
}

//Transfer from LocalStorage to userList array
if (localStorage.length != 0) {
  let retrievedObject = localStorage.getItem("userList");
  userList = JSON.parse(retrievedObject);
}

//Update Name in HTML
dom.getElementById("user").innerHTML = userList[key].fullname;

//Deposit Function
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
  }
});

//Withdraw Function
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
    } else {
      window.alert(
        "The withdrawal amount exceeds the balance. Withrawal has failed."
      );
    }
  }
});

//Transfer Function
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
      userList[recIndex].balance += value;
      userList[key].transaction.push({
        date: dateToday(),
        transaction: `Transferred to ${userList[recIndex].fullname}`,
        amount: formatNumber(value),
      });
      userList[recIndex].transaction.push({
        date: dateToday(),
        transaction: `Received from ${userList[key].fullname}`,
        amount: formatNumber(value),
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

//Transaction Prompt
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

//Check if Decimal
function isFloat(num) {
  return !!(num % 1);
}

//Logout
dom.getElementById("logout").addEventListener("click", function () {
  sessionStorage.removeItem("activeIndex");
  window.location.href = "./login.html";
});

//Expense Object constructor
function Expenses(item, cost) {
  this.item = item;
  this.cost = cost;
}

//Add Expense function
function addExpense(item, cost) {
  let expense = new Expenses(item, cost);
  userList[key].expenses.push(expense);
  localStorage.setItem("userList", JSON.stringify(userList));
  location.reload();
}

//Add Expense Button
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

//Date Today function
function dateToday() {
  let today = new Date();
  let date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
}

//List expense to table and add remove button for each expense
if (userList[key].expenses.length > 0) {
  let totalcost = 0;
  for (let i = 0; i < userList[key].expenses.length; i++) {
    const row = document.createElement("tr");
    const controls = document.createElement("td");
    dom.getElementById("expensestbody").appendChild(row);
    row.setAttribute("id", `row ${i + 1}`);
    row.appendChild(document.createElement("td")).innerHTML =
      userList[key].expenses[i].item;
    row.appendChild(document.createElement("td")).innerHTML =
      "₱" + userList[key].expenses[i].cost.toFixed(2);
    totalcost = +userList[key].expenses[i].cost;
    row.appendChild(controls).setAttribute("class", "controls");
    controls.innerHTML = "&times";
  }
  userList[key].balance -= totalcost;
  dom.getElementById("balance").innerHTML = `${userList[key].balance.toFixed(
    2
  )}`;

  const controlList = dom.getElementsByClassName("controls");
  for (let i = 0; i < controlList.length; i++) {
    controlList[i].addEventListener("click", function () {
      let confirmAction = confirm("Are you sure to remove this expense?");
      if (confirmAction) {
        userList[key].balance += userList[key].expenses[i].cost;
        userList[key].expenses.splice(i, 1);
        localStorage.setItem("userList", JSON.stringify(userList));
        location.reload();
      }
    });
  }
}

//List transactions
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

//List number with commas and decimals
function formatNumber(value) {
  return parseFloat(value.toFixed(2)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

//Update balance to HTML
function updateDisplayBal() {
  dom.getElementById("balance").innerHTML = formatNumber(userList[key].balance);
}
updateDisplayBal();

//Display users if active user is admin
if (userList[key].email === "admin") {
  dom.getElementById("userlist").style.display = "flex";
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
