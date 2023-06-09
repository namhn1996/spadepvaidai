let username = JSON.parse(localStorage.getItem("user"));
let btnReg = document.querySelector(".btnReg");
let btnLogin = document.querySelector(".btnLogin");
let userLogin = document.querySelector(".userLogin");
let logOut = document.querySelector(".btnLogout");
let userlogin = JSON.parse(localStorage.getItem("userlogin")) || {};
let oderr = document.querySelector(".oder");
let lichsu = document.querySelector(".lichsu");

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
lichsu.addEventListener("click", function () {
  let userLogins = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogins.isLogin == true) {
    window.location.href = "../lich su/lichsu.html";
  }
});

// Đăng xuất
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
// taoj theme id cho login
// nối id của user vào odêr
// tạo key mới

let formOder = document.querySelector(".oder-service");
let inputTime = document.querySelector("#time");
let inputDate = document.querySelector("#date");
let inputServiceName = document.querySelector("#service");
let inputNumber = document.querySelector(".number");
let inputPrice = document.querySelector("#price");
let inputPriceAll = document.querySelector("#price-all");
let listdv = JSON.parse(localStorage.getItem("listdichvu"));
let oder = JSON.parse(localStorage.getItem("oder")) || [];

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
for (let i in listdv) {
  inputServiceName.innerHTML += `<option id='${listdv[i].id}' value='${listdv[i].name}'>${listdv[i].name}</option>`;
}
inputServiceName.addEventListener("change", function () {
  let selectService = listdv.filter((e) => e.name == inputServiceName.value);
  // khi thực hiện thay đổi ở event
  // Dùng filter lọc qua mảng dịch vụ trả về một mảng theo điều kiện (id trùng với id của input khi change)
  // Sau đó lưu vào biến selectService.
  // Tiếp theo gán lại content bên trong thẻ price bằng với giá trị của trường price trong mảng selectService
  let pricemonny = selectService[0].price;
  let monny = VND.format(pricemonny);
  inputPrice.innerHTML = monny;
  inputNumber.addEventListener("change", function () {
    console.log(selectService[0].price, inputNumber.value);
    let pricemonnyall =
      Number(selectService[0].price) * Number(inputNumber.value);
    let monnyall = VND.format(pricemonnyall);
    inputPriceAll.innerHTML = monnyall; // tính tiền tổng
  });
});
formOder.addEventListener("submit", function (e) {
  e.preventDefault();
  const objService = listdv.find((item) => item.name == inputServiceName.value);
  let selectService = listdv.filter((e) => e.name == inputServiceName.value);
  let pricemonnyall =
    Number(selectService[0].price) * Number(inputNumber.value);
  let monnyall = VND.format(pricemonnyall);
  
  let obj = {
    id: Math.floor(Math.random() * 100000),
    name: userlogin.name,
    email: userlogin.email,
    timeday: inputDate.value,
    time: inputTime.value,
    service: objService.name,
    number: inputNumber.value,
    priceall: monnyall,
    status: false,
  };
  oder.push(obj);
  localStorage.setItem("oder", JSON.stringify(oder));
  inputDate.value = "";
  inputTime.value = "";
  inputServiceName.value = "chon";
  inputNumber.value = "";
  inputPrice = "";
  inputPriceAll = "";
  alert(`Chúc mừng bạn đã đặt lịch thành công`);
  location.href = "../lich su/lichsu.html";
});
