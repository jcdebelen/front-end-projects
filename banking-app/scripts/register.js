const dom = document;
let userList = [];

if (localStorage.length > 0) {
  let retrievedObject = localStorage.getItem("userList");
  userList = JSON.parse(retrievedObject);
}

dom.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let fname = dom.getElementById("fname").value;
  let lname = dom.getElementById("lname").value;
  let email = dom.getElementById("email").value;
  let pword = dom.getElementById("pword").value;
  let balance = parseFloat(dom.getElementById("balance").value);
  if (
    fname !== "" &&
    lname !== "" &&
    email !== "" &&
    pword !== "" &&
    balance !== ""
  ) {
    let fnamesplit = fname.split("");
    let lnamesplit = lname.split("");
    if (isLetter(fnamesplit[0]) && isLetter(lnamesplit[0])) {
      if (parseFloat(balance) >= 0) {
        for (let i = 0; i < userList.length; i++) {
          if (userList[i].email === dom.getElementById("email").value) {
            window.alert("E-mail is already used. User already exists.");
            return;
          }
        }
        addUser(fname, lname, email, pword, balance);
        localStorage.setItem("userList", JSON.stringify(userList));
        window.alert("Registration successful! Redirecting to login page.");
        window.location.href = "./login.html";
      } else {
        window.alert("The initial balance must not contain negative value.");
      }
    } else {
      window.alert(
        "Please make sure that the first character of name is letter."
      );
    }
  } else {
    window.alert("Please fill out the missing fields.");
  }
});

function User(fname, lname, email, password, balance) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.password = password;
  this.balance = balance;
  this.expenses = [];
  this.transaction = [
    {
      date: dateToday(),
      transaction: "Initial Deposit",
      amount: balance.toFixed(2),
    },
  ];
  this.fullname = `${fname} ${lname}`;
  this.created = dateToday();
}

function addUser(fname, lname, email, password, balance) {
  let user = new User(fname, lname, email, password, balance);
  userList.push(user);
}

function dateToday() {
  let today = new Date();
  let date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
}

function isLetter(char) {
  if (typeof char !== "string") {
    return false;
  }
  return /^[a-zA-Z]+$/.test(char);
}

let admin = {
  fname: "The",
  lname: "Admin",
  email: "admin",
  password: "superpass",
  balance: 10000000,
  expenses: [],
  transaction: [
    {
      date: "Confidential",
      transaction: "Initial Deposit",
      amount: "Confidential",
    },
  ],
  fullname: "The Admin",
  created: "Confidential",
};

if (userList.length > 0) {
  if (userList[0].email !== "admin") {
    createAdmin();
  }
} else if (userList.length === 0) {
  createAdmin();
}

function createAdmin() {
  userList.unshift(admin);
  localStorage.setItem("userList", JSON.stringify(userList));
}
