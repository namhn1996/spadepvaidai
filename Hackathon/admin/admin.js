let account = document.querySelector(".account");
let service = document.querySelector(".service");
let oder = document.querySelector(".oder");
let title = document.querySelector(".title");

function clickSideBar(id) {
  switch (id) {
    case 1:
      oder.style.display = "none";
      account.style.display = "block";
      service.style.display = "none";
      title.style.display = "none";
      break;
    case 2:
      oder.style.display = "none";
      account.style.display = "none";
      service.style.display = "block";
      title.style.display = "none";
      break;
    case 3:
      oder.style.display = "block";
      account.style.display = "none";
      service.style.display = "none";
      title.style.display = "none";
      break;
    default:
      console.log("click bi loi");
  }
}
// thêm dịch vụ
let mainForm = document.getElementById("main-form");
let hienthi = document.querySelector("#hienthi");
let listdv = JSON.parse(localStorage.getItem("listdichvu")) || [];
let newDv = {}; //tạo mới dịch vụ
mainForm.onsubmit = function submit(e) {
  e.preventDefault();
  let listdv = JSON.parse(localStorage.getItem("listdichvu")) || [];
  let imgsp = document.getElementById("imgsp").value;
  let servicesp = document.getElementById("lishdichvu").value;
  let tensp = document.getElementById("servicename").value;
  let pricesp = document.getElementById("price").value;
  newDv = {
    id: Math.floor(Math.random() * 100000),
    service: servicesp,
    img: imgsp,
    name: tensp,
    price: pricesp,
  };
  listdv.push(newDv);
  console.log("==>", listdv);
  hienthi.innerHTML = `
  <div class="item card">
    <img
      class="img-item card-img-top"
      src="${imgsp}"
      alt=""/>
    <div class="name-item card-text">${tensp}</div>
    <div class="price card-text">
    <span class="price-num">${pricesp}</span><span>đ</span>
    </div>
  </div>`;

  localStorage.setItem("listdichvu", JSON.stringify(listdv));
  renderServiceAdmin();
};

// Render dữ liệu ra trang admin
function renderServiceAdmin() {
  let tbodyE = document.getElementById("tbody");
  // let listdv = JSON.parse(localStorage.getItem("listdichvu")) || [];
  tbodyE.innerHTML = "";
  for (let i = 0; i < listdv.length; i++) {
    tbodyE.innerHTML += `
    <tr>
    <td>${listdv[i].id}</td>
    <td>${listdv[i].name}</td>
    <td>${listdv[i].img}</td>
    <td>${listdv[i].price}</td>
    <td><button class="delete-Service" id=${listdv[i].id}>Xóa</button>
    <button class="edit-Service" id=${listdv[i].id}>Sửa</button></td>
    </tr>
    `;
  }
}
renderServiceAdmin();

let deleteTable = document.getElementById("delete-table");
deleteTable.onclick = function (e) {
  // Xóa dịch vụ
  if (e.target.classList.contains("delete-Service")) {
    let number = Number(e.target.id);
    let index = listdv.findIndex((element) => number == element.id);
    listdv.splice(index, 1);
    alert(`Bạn đã hủy thành công`);
    localStorage.setItem("listdichvu", JSON.stringify(listdv));
    renderServiceAdmin();
  }
  // Sửa dịch vụ
  if (e.target.classList.contains("edit-Service")) {
    let number = Number(e.target.id);
    let editTr = e.target.parentElement.parentElement;
    let index = listdv.findIndex((element) => number == element.id);
    editTr.innerHTML = `<tr>
    <td>${listdv[index].id}</td>
    <td><input type="text" id='name-ListDV' value='${listdv[index].name}'></td>
    <td><input type="text" id="img-ListDV" value=${listdv[index].img}></td>
    <td><input type="text" id='price-ListDV' value=${listdv[index].price}></td>
    <td><button class="confirm-Service" id=${listdv[index].id}>Xác nhận</button></td>
    </tr>
    `;
  }
  if (e.target.classList.contains("confirm-Service")) {
    let number = Number(e.target.id);
    let index = listdv.findIndex((element) => number == element.id);
    let nameService = document.getElementById("name-ListDV").value;
    let imgService = document.getElementById("img-ListDV").value;
    let priceService = document.getElementById("price-ListDV").value;
    if (number !== -1) {
      console.log("kkkkk");
      listdv[index].name = nameService;
      listdv[index].img = imgService;
      listdv[index].price = priceService;
      localStorage.setItem("listdichvu", JSON.stringify(listdv));
      renderServiceAdmin();
      alert(`Bạn đã sửa dịch vụ thành công`);
    } else {
      alert("Không tìm thấy dịch vụ");
    }
  }
};

// hiển thị account
let user = JSON.parse(localStorage.getItem("user"));
let accTable = document.querySelector(".acc-table");
for (let i = 0; i < user.length; i++) {
  accTable.innerHTML += `
          <tr>
            <td>${user[i].id}</td>
            <td>${user[i].name}</td>
            <td>${user[i].email}</td>
            <td>${user[i].password}</td>
            <td>
              <button class="${
                user[i].status == 1 ? "red" : ""
              }" onclick="khoa('${user[i].id}')">Khóa</button>  
              <button class="${
                user[i].status == 0 ? "blue" : ""
              }" onclick="mo('${user[i].id}')">Mở</button>
            </td>
          </tr>`;
}
function khoa(id) {
  let listUser = JSON.parse(localStorage.getItem("user"));

  let index = listUser.findIndex((item) => item.id == id);
  listUser[index].status = 1;
  localStorage.setItem("user", JSON.stringify(listUser));

  const listACC = JSON.parse(localStorage.getItem("user"));
  console.log("==>", listACC);
  let accTable = document.querySelector(".acc-table");
  accTable.innerHTML = "";
  for (let i = 0; i < listACC.length; i++) {
    accTable.innerHTML += `
            <tr>
              <td>${listACC[i].id}</td>
              <td>${listACC[i].name}</td>
              <td>${listACC[i].email}</td>
              <td>${listACC[i].password}</td>
              <td>
                <button class="${
                  listACC[i].status == 1 ? "red" : ""
                }" onclick="khoa('${listACC[i].id}')">Khóa</button>  
                <button class="${
                  listACC[i].status == 0 ? "blue" : ""
                }" onclick="mo('${listACC[i].id}')">Mở</button>
              </td>
            </tr>`;
  }
}
function mo(id) {
  let listUser = JSON.parse(localStorage.getItem("user"));
  let index = listUser.findIndex((item) => item.id == id);
  // console.log(document.querySelector('.mo'))
  listUser[index].status = 0;
  localStorage.setItem("user", JSON.stringify(listUser));

  const listACC = JSON.parse(localStorage.getItem("user"));
  console.log("==>", listACC);
  let accTable = document.querySelector(".acc-table");
  accTable.innerHTML = "";
  for (let i = 0; i < listACC.length; i++) {
    accTable.innerHTML += `
            <tr>
              <td>${listACC[i].id}</td>
              <td>${listACC[i].name}</td>
              <td>${listACC[i].email}</td>
              <td>${listACC[i].password}</td>
              <td>
                <button class="${
                  listACC[i].status == 1 ? "red" : ""
                }" onclick="khoa('${listACC[i].id}')">Khóa</button>  
                <button class="${
                  listACC[i].status == 0 ? "blue" : ""
                }" onclick="mo('${listACC[i].id}')">Mở</button>
              </td>
            </tr>`;
  }
}

// Hiển thị đơn hàng
let oderTable = document.querySelector(".odertable");
let oderList = JSON.parse(localStorage.getItem("oder"));
for (let i = 0; i < oderList.length; i++) {
  oderTable.innerHTML += `

  <tr>
    <td>${oderList[i].id}</td>
    <td>${oderList[i].timeday}</td>
    <td>${oderList[i].time}</td>
    <td>${oderList[i].name}</td>
    <td>${oderList[i].email}</td>
    <td>${oderList[i].service}</td>
    <td>${oderList[i].number}</td>
    <td>${oderList[i].priceall}</td>
    <td>${oderList[i].status == true ? "Chấp nhận" : "Chưa chấp nhận"}</td>
    <td><button onclick="chapnhan(${oderList[i].id})">Chấp nhận</button>
    <button onclick="huylich(${oderList[i].id})">Hủy xóa lịch</button>
    </td>
  </tr>
  `;
}
function chapnhan(id) {
  let listOder = JSON.parse(localStorage.getItem("oder"));
  let index = listOder.findIndex((item) => item.id == id);
  listOder[index].status = true;
  localStorage.setItem("oder", JSON.stringify(listOder));
  const listOd = JSON.parse(localStorage.getItem("oder"));
  oderTable.innerHTML = "";
  for (let i = 0; i < listOd.length; i++) {
    oderTable.innerHTML += `
    <tr>
      <td>${listOd[i].id}</td>
      <td>${listOd[i].timeday}</td>
      <td>${listOd[i].time}</td>
      <td>${listOd[i].name}</td>
      <td>${listOd[i].email}</td>
      <td>${listOd[i].service}</td>
      <td>${listOd[i].number}</td>
      <td>${listOd[i].priceall}</td>
      <td>${listOd[i].status == true ? "Chấp nhận" : "Chưa chấp nhận"}</td>
      <td><button onclick="chapnhan(${listOd[i].id})">Chấp nhận</button>
      <button onclick="huylich(${listOd[i].id})">Hủy xóa lịch</button>
      </td>
    </tr>
    `;
  }
}
function huylich (id){
  let oder = JSON.parse(localStorage.getItem("oder"));
  const arrFiltered = oder.filter((item) => item.id != id);
  localStorage.setItem("oder", JSON.stringify(arrFiltered));
  alert(`Bạn đã hủy thành công`);
  localStorage.getItem("oder");
  const listOd = JSON.parse(localStorage.getItem("oder"));
  oderTable.innerHTML = "";
  for (let i = 0; i < listOd.length; i++) {
    oderTable.innerHTML += `
    <tr>
      <td>${listOd[i].id}</td>
      <td>${listOd[i].timeday}</td>
      <td>${listOd[i].time}</td>
      <td>${listOd[i].name}</td>
      <td>${listOd[i].email}</td>
      <td>${listOd[i].service}</td>
      <td>${listOd[i].number}</td>
      <td>${listOd[i].priceall}</td>
      <td>${listOd[i].status == true ? "Chấp nhận" : "Chưa chấp nhận"}</td>
      <td><button onclick="chapnhan(${listOd[i].id})">Chấp nhận</button>
      <button onclick="huylich(${listOd[i].id})">Hủy xóa lịch</button>
      </td>
    </tr>
    `;
  }
}