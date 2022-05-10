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

//Update Display in HTML
dom.getElementById("user").innerHTML = userList[key].fullname;
updateDisplayBal();

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
      amount: formatNumber(value),
    });
    console.log(userList[key].balance);
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
        amount: formatNumber(value),
      });
      localStorage.setItem("userList", JSON.stringify(userList));
      location.reload();
    } else {
      window.alert("Insufficient funds. Withrawal has failed.");
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
  makeRow();
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

function makeRow() {
  dom.getElementById("expensessub").innerHTML = "";
  let totalcost = 0;
  let tempbalance = userList[key].balance;
  dom.getElementById("expensestbody").innerHTML =
    '<tr><th id="expenseName"></th><th id="costName"></th><th id="tablecontrol"></th></tr>';
  for (let i = 0; i < userList[key].expenses.length; i++) {
    const row = document.createElement("tr");
    const controls = document.createElement("td");
    dom.getElementById("expensestbody").appendChild(row);
    row.setAttribute("id", `row${i + 1}`);
    row.appendChild(document.createElement("td")).innerHTML =
      userList[key].expenses[i].item;
    row.appendChild(document.createElement("td")).innerHTML =
      "₱ " + formatNumber(userList[key].expenses[i].cost);
    totalcost = +userList[key].expenses[i].cost;
    row.appendChild(controls).setAttribute("class", "controls");
    controls.innerHTML = "&times";
    tempbalance -= totalcost;
  }
  dom.getElementById("balance").innerHTML = formatNumber(tempbalance);
  const controlList = dom.getElementsByClassName("controls");
  for (let i = 0; i < controlList.length; i++) {
    controlList[i].addEventListener("click", function () {
      let confirmAction = confirm("Are you sure to remove this expense?");
      if (confirmAction) {
        userList[key].expenses.splice(i, 1);
        localStorage.setItem("userList", JSON.stringify(userList));
        makeRow();
      }
    });
  }
  if (userList[key].expenses.length === 0) {
    dom.getElementById("expenseName").innerHTML = "";
    dom.getElementById("costName").innerHTML = "";
    dom.getElementById("expensessub").innerHTML = "No expenses";
  }
}

makeRow();

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

//Display users if active user is admin
if (userList[key].email === "admin") {
  dom.getElementById("users").style.display = "flex";
  for (let i = 0; i < userList.length; i++) {
    let x = 0;
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
    row.appendChild(document.createElement("td")).innerHTML =
      '<button class="transferFrom">Transfer</button>';
  }

  const transferList = dom.getElementsByClassName("transferFrom");
  for (let i = 0; i < transferList.length; i++) {
    transferList[i].addEventListener("click", function () {
      let recIndex;
      let receiver = prompt(`Please enter a receiver email address`);
      for (x = 0; x < userList.length; x++) {
        if (userList[x].email === receiver) {
          recIndex = x;
          break;
        }
      }
      if (x === userList.length) {
        window.alert("There's no email in ther record. User does not exists.");
        return;
      }
      if (recIndex == i) {
        window.alert(
          "The email is the current user account. Transfer invalid."
        );
        return;
      }
      transact("transfer");
      if (value <= 0) {
        window.alert("Value must be a positive amount.");
        return;
      }
      if (!Number.isInteger(value) || !isFloat(value)) {
        if (userList[i].balance >= value) {
          userList[i].balance = (userList[i].balance - value).toFixed(2);
          userList[i].balance = parseFloat(userList[i].balance);
          userList[recIndex].balance += value;
          userList[i].transaction.push({
            date: dateToday(),
            transaction: `Transferred to ${userList[recIndex].fullname}`,
            amount: formatNumber(value),
          });
          userList[recIndex].transaction.push({
            date: dateToday(),
            transaction: `Received from ${userList[i].fullname}`,
            amount: formatNumber(value),
          });
          localStorage.setItem("userList", JSON.stringify(userList));
          window.alert(
            `Transferred ₱ ${value.toFixed(2)} to ${
              userList[recIndex].fullname
            }`
          );
          location.reload();
          dom.getElementById("transaction").setAttribute("class", "hide");
          dom.getElementById("userlist").setAttribute("class", "show");
        } else {
          window.alert("Insufficient funds. The transfer has failed.");
        }
      }
      recIndex = null;
    });
  }
}

dom.getElementById("history").addEventListener("click", function () {
  dom.getElementById("transaction").setAttribute("class", "show");
  dom.getElementById("expenses").setAttribute("class", "hide");
  dom.getElementById("userlist").setAttribute("class", "hide");
  dom.getElementById("bills").setAttribute("class", "hide");
});

dom.getElementById("expense").addEventListener("click", function () {
  dom.getElementById("transaction").setAttribute("class", "hide");
  dom.getElementById("expenses").setAttribute("class", "show");
  dom.getElementById("userlist").setAttribute("class", "hide");
  dom.getElementById("bills").setAttribute("class", "hide");
});

dom.getElementById("users").addEventListener("click", function () {
  dom.getElementById("userlist").setAttribute("class", "show");
  dom.getElementById("transaction").setAttribute("class", "hide");
  dom.getElementById("expenses").setAttribute("class", "hide");
  dom.getElementById("bills").setAttribute("class", "hide");
});

dom.getElementById("paybills").addEventListener("click", function () {
  dom.getElementById("bills").setAttribute("class", "show");
  dom.getElementById("userlist").setAttribute("class", "hide");
  dom.getElementById("transaction").setAttribute("class", "hide");
  dom.getElementById("expenses").setAttribute("class", "hide");
});

dom.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let billtype = dom.getElementById("bill").value;
  let amount = dom.getElementById("amount").value;
  if (amount === "") {
    window.alert("Please fill out the missing fields.");
    return;
  }
  amount = parseFloat(parseFloat(amount).toFixed(2));
  console.log(amount);
  if (amount !== "") {
    if (amount <= 0) {
      window.alert("Amount must be positive.");
      return;
    }
    if (!Number.isInteger(amount) || !isFloat(amount)) {
      if (userList[key].balance >= amount) {
        userList[key].balance = (userList[key].balance - amount).toFixed(2);
        userList[key].balance = parseFloat(userList[key].balance);
        userList[key].transaction.push({
          date: dateToday(),
          transaction: `Pay  ${billtype}`,
          amount: formatNumber(amount),
        });
        localStorage.setItem("userList", JSON.stringify(userList));
        window.alert(`₱${amount} has been paid for ${billtype}`);
        location.reload();
      }
    }
  }
});
