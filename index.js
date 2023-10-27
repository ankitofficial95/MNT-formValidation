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


const usersArray = JSON.parse(localStorage.getItem("users")) || [];
// console.log('users array-->>>>>>>>>');
// console.log(usersArray);

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

  if (password.length === 0) {
    seterror("pass", "*Password should not be Blank !!");
    returnval = false;
  }
  if (password.length < 6) {
    seterror("pass", "*Password should be at least 6 characters long!");
    returnval = false;
  }

  const cpassword = document.querySelector('input[name="fcpass"]').value;

  if (cpassword.length === 0) {
    seterror("cpass", "*Confirm password is required");
    returnval = false;
  } else if (cpassword !== password) {
    seterror("cpass", "*Password and Confirm password should match");
    returnval = false;
  }
  //-----------------------------------------------------------------------------------------

  if (returnval) {
    window.alert("Registration successful !!!");
    const newUser = {
      name: name,
      email: email,
      password: password,
    };

   
    usersArray.push(newUser);

    const usersArrayString = JSON.stringify(usersArray);

    localStorage.setItem("users", usersArrayString);

    window.location.href = 'login.html'

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
  const enteredEmail = document.querySelector('input[name="femail"]').value;
  const enteredPassword = document.querySelector('input[name="fpass"]').value;

  const usersArrayString = localStorage.getItem("users");
  const usersArray = JSON.parse(usersArrayString) || [];


  if (usersArray.length === 0) {
    window.alert("No users registered. Please register first.");
    return false;
  }

  const foundUser = usersArray.find(
    (user) => user.email === enteredEmail && user.password === enteredPassword
  );

   if (foundUser) {
    window.alert("Login successful !!!");
    document.querySelector('input[name="femail"]').value = "";
    document.querySelector('input[name="fpass"]').value = "";
    setUserNameToLoginPage(foundUser.name); // Pass the user's name to display on the login page
    return false;
  } else {
    window.alert("Login failed. Please check your email and password.");
    return false;
  }
}

function redirectToLoginPage() {
  // console.log("inside redirectToLoginPage");
  window.location.href = "login.html";
  return false;
}

function setUserNameToLoginPage(userName) {
  let user = "Hello: " + userName;
  document.getElementById("userName").innerHTML = user;
}
