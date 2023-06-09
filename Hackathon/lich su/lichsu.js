let username = JSON.parse(localStorage.getItem("user"));
let btnReg = document.querySelector(".btnReg");
let btnLogin = document.querySelector(".btnLogin");
let userLogin = document.querySelector(".userLogin");
let logOut = document.querySelector(".btnLogout");
let userlogin = JSON.parse(localStorage.getItem("userLogin")) || {};
let oderr = document.querySelector(".oder");
let lichsur = document.querySelector(".lichsu");
// Duy trì đăng nhập
window.onload = function () {
  username.forEach((e) => {
    if (e.isLogin == true) {
      btnReg.classList.add("hide");
      btnLogin.classList.add("hide");
      userLogin.innerHTML = `Xin Chào ${e.name}   <i class="bi bi-person-circle"></i>`;
      logOut.classList.remove("hide");
      userLogin.classList.remove("hide");
    }
  });
};
oderr.addEventListener("click", function () {
  let userLogins = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogins.isLogin == true) {
    window.location.href = "../dat lich/datlich.html";
  }
});
lichsur.addEventListener("click", function () {
  let userLogins = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogins.isLogin == true) {
    window.location.href = "../lich su/lichsu.html";
  }
});

logOut.addEventListener("click", function () {
  btnReg.classList.remove("hide");
  btnLogin.classList.remove("hide");
  userLogin.classList.add("hide");
  logOut.classList.add("hide");
  for (let i = 0; i < username.length; i++) {
    username[i].isLogin = false;
    localStorage.setItem("user", JSON.stringify(username));
  }
  localStorage.removeItem("userlogin");
});

let oder = JSON.parse(localStorage.getItem("oder"));
let lichsu = document.getElementById("history");
console.log(oder);
function render() {
  for (let i = 0; i < oder.length; i++) {
    lichsu.innerHTML += `
    <tr>
  <th>${oder[i].id}</th>
  <th>${oder[i].name}</th>
  <th>${oder[i].email}</th>
  <th>${oder[i].timeday}</th>
  <th>${oder[i].time}</th>
  <th>${oder[i].number}</th>
  <th>${oder[i].service}</th>
  <th>${oder[i].priceall}</th>
  <th>${oder[i].status  == true ? "Chấp nhận": "Chưa chấp nhận"}</th>
  <th><button class="delete-btn" onclick="huyLich('${oder[i].id}')">Hủy lịch</button></th>
</tr>
  `;
  }
}
render();

function huyLich(id) {
  const arrFiltered = oder.filter((item) => item.id != id);
  localStorage.setItem("oder", JSON.stringify(arrFiltered));
  alert(`Bạn đã hủy thành công`);
  window.location.reload();
}
