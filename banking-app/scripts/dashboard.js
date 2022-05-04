const dom = document;
let userList = [];
let value;
let key = localStorage.getItem("activeIndex");
const active = userList[key];
if (localStorage.length !== 0) {
  for (let i = 0; i < localStorage.length - 1; i++) {
    retrievedObject = localStorage.getItem(i);
    userList[i] = JSON.parse(retrievedObject);
  }
}

dom.getElementById(
  "user"
).innerHTML = `${userList[key].fname} ${userList[key].lname}`;
dom.getElementById("balance").innerHTML = `${userList[key].balance}`;

dom.getElementById("deposit").addEventListener("click", function () {
  transact("deposit");
  if (!Number.isInteger(value) || !isFloat(value)) {
    userList[key].balance += value;
    localStorage.setItem(key, JSON.stringify(userList[key]));
    dom.getElementById("balance").innerHTML = userList[key].balance.toFixed(2);
  }
});

dom.getElementById("withdraw").addEventListener("click", function () {
  transact("withdraw");
  if (!Number.isInteger(value) || !isFloat(value)) {
    if (userList[key].balance >= value) {
      userList[key].balance = (userList[key].balance - value).toFixed(2);
      userList[key].balance = parseFloat(userList[key].balance);
      localStorage.setItem(key, JSON.stringify(userList[key]));
      dom.getElementById("balance").innerHTML =
        userList[key].balance.toFixed(2);
    } else {
      window.alert(
        "The withdraw amount exceeds the balance. Withrawal has failed."
      );
    }
  }
});

function transact(input) {
  value = parseFloat(prompt(`Please enter ${input} amount.`)).toFixed(2);
  value = parseFloat(value);
  while (!Number.isInteger(value) && !isFloat(value)) {
    value = parseFloat(prompt(`Please enter a valid ${input} amount.`)).toFixed(
      2
    );
    value = parseFloat(value);
  }
}

function isFloat(num) {
  return !!(num % 1);
}

dom.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("activeIndex");
  window.location.href = "./login.html";
});

dom.getElementById("transfer").addEventListener("click", function () {
  let tempIndex;
  let receiver = prompt(`Please enter a valid email address`);
  for (i = 0; i < userList.length; i++) {
    if (userList[i].email === receiver) {
      tempIndex = i;
      break;
    }
  }
  if (i === userList.length) {
    window.alert("There's no email in ther record.");
    return;
  }
  if (tempIndex == key) {
    window.alert("Transfer account is the user account. Transfer invalid.");
    return;
  }
  transact("transfer");
  if (!Number.isInteger(value) || !isFloat(value)) {
    if (userList[key].balance >= value) {
      userList[key].balance = (userList[key].balance - value).toFixed(2);
      userList[key].balance = parseFloat(userList[key].balance);
      localStorage.setItem(key, JSON.stringify(userList[key]));
      dom.getElementById("balance").innerHTML =
        userList[key].balance.toFixed(2);
      userList[tempIndex].balance += value;
      localStorage.setItem(tempIndex, JSON.stringify(userList[tempIndex]));
      window.alert(
        `Transferred ₱ ${value.toFixed(2)} to ${userList[tempIndex].fname} ${
          userList[tempIndex].lname
        }`
      );
    } else {
      window.alert(
        "The transfer amount exceeds the balance. The transfer has failed."
      );
    }
  }
  tempIndex = null;
});
