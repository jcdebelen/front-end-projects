const dom = document;
let userList = [];
let login = false;

if (localStorage.length !== 0) {
  for (let i = 0; i < localStorage.length; i++) {
    let retrievedObject = localStorage.getItem(i);
    userList[i] = JSON.parse(retrievedObject);
  }
}

dom.getElementById("loginsubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let email = dom.getElementById("email").value;
  let pword = dom.getElementById("pword").value;
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === email && userList[i].password === pword) {
      login = true;
      localStorage.setItem("activeIndex", i);
      window.location.href = "./dashboard.html";
      return;
    }
  }
  window.alert("Either email or password is incorrect.");
});
