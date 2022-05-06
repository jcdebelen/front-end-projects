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
      }
    } else if (i === userList.length - 1) {
      window.alert("Email is not registered. User does not exists.");
    }
  }
});

// localStorage.setItem(
//   "0",
//   '{"fname":"Super","lname":"Admin","email":"admin","password":"superpass","balance":"confidential","expenses":{}}'
// );
