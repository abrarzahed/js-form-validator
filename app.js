const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// check Require fields

function checkRequire(inputArr) {
  inputArr.forEach((item) => {
    if (item.value.trim() == "") {
      showError(item, `${getFieldName(item)} is require`);
    } else {
      showSuccess(item);
    }
  });
}

// check length of user name and password
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at less then ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// convert first latter of error message to uppercase

function getFieldName(i) {
  return i.id.charAt(0).toUpperCase() + i.id.slice(1);
}

// check pass mach
function checkPassMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password not matched");
  }
}

// check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequire([userName, email, password, password2]);
  checkLength(userName, 3, 15);
  checkLength(password, 4, 25);
  checkEmail(email);
  checkPassMatch(password, password2);
});
