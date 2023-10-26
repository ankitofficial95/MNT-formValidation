function clearErrors() {
  // console.log("inside clearErrors");

  const errors = document.querySelectorAll(".formerror");
  for (let err of errors) {
    err.innerHTML = "";
  }
}

function seterror(id, error) {
  // console.log("inside seterror");

  const element = document.querySelector(`#${id} .formerror`);
  element.innerHTML = error;
}

function validateForm() {
  // console.log("inside validateForm");

  let returnval = true;
  clearErrors();

  const name = document.querySelector('input[name="fname"]').value;
  if (name.length < 5) {
    seterror("name", "*Length of name is too short");
    returnval = false;
  }

  if (name.length === 0) {
    seterror("name", "*Length of name cannot be zero!!!");
    returnval = false;
  }

  const email = document.querySelector('input[name="femail"]').value;
  if (email.length < 5) {
    seterror("email", "*Email length is too short");
    returnval = false;
  } else if (!validateEmail(email)) {
    seterror("email", "*Please enter a valid email address");
    returnval = false;
  }

  const phone = document.querySelector('input[name="fphone"]').value;
  if (phone.length !== 10) {
    seterror("phone", "*Phone number should be of 10 digits!");
    returnval = false;
  }

  const password = document.querySelector('input[name="fpass"]').value;
  if (password.length < 6) {
    seterror("pass", "*Password should be at least 6 characters long!");
    returnval = false;
  }

  const cpassword = document.querySelector('input[name="fcpass"]').value;
  if (cpassword !== password) {
    seterror("cpass", "*Password and Confirm password should match!");
    returnval = false;
  }

  userName = document.querySelector('input[name="fname"]').value;
  passWord = document.querySelector('input[name="fpass"]').value;

  if (returnval) {
    window.alert("Registration successful !!!");
    window.localStorage.clear();

    window.localStorage.setItem("email", email);
    window.localStorage.setItem("password", password);

    redirectToLoginPage();
  } else {
    window.alert("Registration failed. Please check your input.");
  }

  return false;
}

function validateEmail(email) {
  // console.log("inside validateEmail");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateEmailPass() {
  let enteredEmail = document.querySelector('input[name="femail"]').value;
  let enteredPassword = document.querySelector('input[name="fpass"]').value;

  let storedEmail = window.localStorage.getItem("email");
  let storedPassword = window.localStorage.getItem("password");

  if (enteredEmail == storedEmail && enteredPassword == storedPassword) {
    window.alert("Login successful !!!");
  } else {
    window.alert("Login failed. Please check your email and password.");
  }
  return false;
}

function redirectToLoginPage() {
  // console.log("inside redirectToLoginPage");
  window.location.href = "login.html";
  return false;
}
