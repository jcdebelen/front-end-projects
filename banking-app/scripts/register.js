const dom = document;
let userList = [];
let login = false;

if (localStorage.length !== 0) {
  for (let i = 0; i < localStorage.length; i++) {
    let retrievedObject = localStorage.getItem(i);
    userList[i] = JSON.parse(retrievedObject);
  }
}

dom.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let fname = dom.getElementById("fname").value;
  let lname = dom.getElementById("lname").value;
  let email = dom.getElementById("email").value;
  let pword = dom.getElementById("pword").value;
  if (fname !== "" && lname !== "" && email !== "" && pword !== "") {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].email === dom.getElementById("email").value) {
        window.alert("E-mail is already taken.");
        return;
      }
    }
    addUser(fname, lname, email, pword);
    let last = localStorage.length;
    localStorage.setItem(last, JSON.stringify(userList[last]));
    dom.getElementById("fname").value = "";
    dom.getElementById("lname").value = "";
    dom.getElementById("email").value = "";
    dom.getElementById("pword").value = "";
  } else {
    window.alert("Please fill out the missing fields.");
  }
});

var User = function (fname, lname, email, password) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.password = password;
  this.balance = 0;
  this.expenses = {};
};

function addUser(fname, lname, email, password) {
  let user = new User(fname, lname, email, password);
  userList.push(user);
}

let newUser = new User(null, null, null, null);
