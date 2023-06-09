let mainForm = document.getElementById("main-form");
let hienthi = document.querySelector("#hienthi");
let listdv = JSON.parse(localStorage.getItem("listdichvu")) || [];
let newDv = {};
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

  servicesp = "chon";
  imgsp = "";
  pricesp = "";
  tensp = "";
};

[
  {
    "id": 12131,
    "name": "Gội đầu dưỡng sinh",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/03/IMG_0883-700x467.jpg",
    "service": "toc",
    "price": "390000"
  },
  {
    "id": 23213,
    "name": "Gội đầu thư giãn",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2022/12/IMG_0980-700x467.jpg",
    "service": "toc",
    "price": "390000"
  },
  {
    "id": 1233,
    "name": "Massage cổ vai gáy",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/02/IMG_0939-vuong-700x700.jpg",
    "service": "massage",
    "price": "290000"
  },
  {
    "id": 324234,
    "name": "Massage chân",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2022/12/IMG_0879-vuong-700x700.jpg",
    "service": "massage",
    "price": "200000"
  },
  {
    "id":2135,
    "name": "Triệt lông chân",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/04/triet-ca-chan-700x1050.jpg",
    "service": "trietlong",
    "price": "230000"
  },
  {
    "id": 621312,
    "name": "Sơn móng tay",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2022/12/son-korea-700x700.png",
    "service": "nail",
    "price": "150000"
  },
  {
    "id": 3247,
    "name": "Trị mụn mặt",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/04/tri-mun-mat-700x1050.jpg",
    "service": "nanmun",
    "price": "250000"
  },
  {
    "id": 8321,
    "name": "Sạch sâu cấp ẩm",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/04/sach-sau-cap-am-700x467.jpg",
    "service": "da",
    "price": "400000"
  },
  {
    "id": 2139,
    "name": "Triệt lông mép",
    "img": "https://nhaspa.com.vn/wp-content/uploads/2023/04/triet-mep-700x467.jpg",
    "service": "Chăm sóc tóc",
    "price": "190000"
  }
]
