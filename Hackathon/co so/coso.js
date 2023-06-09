let username = JSON.parse(localStorage.getItem("user")) || [];
let emailLogin = document.querySelector(".login-email");
let passwordLogin = document.querySelector(".login-password");
let loginform = document.querySelector(".loginForm");
let loginBtn = document.querySelector(".login ");
let formSi = document.querySelector(".signIn");
let btnReg = document.querySelector(".btnReg");
let btnLogin = document.querySelector(".btnLogin");
let userLogin = document.querySelector(".userLogin");
let logOut = document.querySelector(".btnLogout");
let backReg = document.querySelector(".backReg");
let toLogin = document.querySelector(".toLogin");
let oder = document.querySelector(".oder");
let lichsu = document.querySelector(".lichsu");
let userlogin = JSON.parse(localStorage.getItem("userLogin")) || {};
const loginModal = new bootstrap.Modal("#loginBtn", {
  keyboard: false,
});

const regModal = new bootstrap.Modal("#staticBackdrop", {
  keyboard: false,
});
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
console.log(username);
oder.addEventListener("click", function () {
  let userLogins = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogins) {
    window.location.href = "../dat lich/datlich.html";
  }
  else {
    loginModal.show();
    backReg.addEventListener("click", function () {
      loginModal.hide();
      regModal.show();
    });
    toLogin.addEventListener("click", function () {
      loginModal.show();
      regModal.hide();
    });
    }
});
lichsu.addEventListener("click", function () {
  let userLogins = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogins) {
    window.location.href = "../lich su/lichsu.html";
  }
  else {
    loginModal.show();
    backReg.addEventListener("click", function () {
      loginModal.hide();
      regModal.show();
    });
    toLogin.addEventListener("click", function () {
      loginModal.show();
      regModal.hide();
    });
    }
});

loginform.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = JSON.parse(localStorage.getItem("user")) || [];
  let email = emailLogin.value;
  let password = passwordLogin.value;
  if (email == null || password == null) {
    alert(`Vui lòng nhập Email + Mật Khẩu`);
    return;
  }
  for (let i = 0; i < username.length; i++) {
    if (email == username[i].email && password == username[i].password && username[i].status == 0) {
      username[i].isLogin = true;
      localStorage.setItem("user", JSON.stringify(username));
      alert(`Đăng nhập thành công`);
      loginModal.hide();
      btnReg.classList.add("hide");
      btnLogin.classList.add("hide");
      userLogin.innerHTML = `Xin Chào ${username[i].name}   <i class="bi bi-person-circle"></i>`;
      userLogin.classList.remove("hide");
      logOut.classList.remove("hide");
      userlogin = {
        id: Math.floor(Math.random() * 100000),
        email: email,
        password: password,
        name: username[i].name,
        isLogin: username[i].isLogin,
      };
      localStorage.setItem("userlogin", JSON.stringify(userlogin));
    }
  }
});

let regEmail = document.querySelector(".regemail-input");
let regName = document.querySelector(".regname-input");
let regPassword = document.querySelector(".regpassword-input1");
let regForm = document.querySelector(".regForm");
let user = JSON.parse(localStorage.getItem("user"))|| [];
let error;
let errorContainer = document.querySelector(".error");

regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  error = "";
  let email = regEmail.value;
  let password = regPassword.value;
  let name = regName.value;
  let nameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!passRegex.test(password)) {
    error =
      error +
      `Password không hợp lệ!! <br/>
        Password phải có 8 ký tự trở lên...`;
  }
  if (!emailRegex.test(email)) {
    error =
      error +
      `Email không hợp lệ !! <br/>
        Email phải chứa @`;
  }
  if (!nameRegex.test(name)) {
    error = error + `Tên không hợp lệ !!`;
  }
  if (error) {
    errorContainer.classList.remove("hide");
    errorContainer.innerHTML = error;
  } else {
    errorContainer.classList.add("hide");
    errorContainer.innerHTML = error;
  }
  if (
    emailRegex.test(email) &&
    passRegex.test(password) &&
    nameRegex.test(name)
  ) {
    error = "";
    let newUser = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      email: email,
      password: password,
      isLogin: false,
      status: 0
    };
    let check = true;
    user.forEach((element) => {
      if (element.email == email || user == []) {
        check = false;
      }
    });
    console.log(check);
    if (check == true) {
      user.push(newUser);
      console.log("==>", user);
      localStorage.setItem("user", JSON.stringify(user));
      alert(`Chúc mừng ${name} đã đăng ký thành công`);
      loginModal.show();
      regModal.hide();
    } else if (check == false) {
      error = error + `Email đã sử dụng`;
    }
    if (error) {
      errorContainer.classList.remove("hide");
      errorContainer.innerHTML = error;
    } else {
      errorContainer.classList.add("hide");
      errorContainer.innerHTML = error;
    }
    email = "";
    name = "";
    password = "";
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
