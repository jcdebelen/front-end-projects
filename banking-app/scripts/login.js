const dom = document;
let userList = [];

if (localStorage.length != 0) {
  let retrievedObject = localStorage.getItem("userList");
  userList = JSON.parse(retrievedObject);
}

dom.getElementById("loginsubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let email = dom.getElementById("email").value;
  let pword = dom.getElementById("pword").value;
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === email) {
      if (userList[i].password === pword) {
        sessionStorage.setItem("activeIndex", i);
        window.location.href = "./dashboard.html";
        return;
      } else {
        window.alert("Password is incorrect.");
        return;
      }
    } else if (i === userList.length - 1) {
      window.alert("Email is not yet registered. User does not exists.");
    }
  }
});

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
