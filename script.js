const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const checkbox = document.querySelector("#checkbox");
const show = document.querySelector(".show");

// Check valid email
const checkEmail = (input) => {
  const emailRegEx = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  if (emailRegEx.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

// Check valid password
const checkPassword = (input) => {
  const passRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/;

  if (passRegEx.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Password not valid");
  }
};

//Error message
const showError = (input, msg) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = msg;
};

//Success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

//Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less then ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
};

//Get field name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//Submit listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassword(password);
  checkPasswordsMatch(password, password2);
});

// Show password listener
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    password.type = "text";
    password2.type = "text";
    show.textContent = "Hide password";
  } else {
    password.type = "password";
    password2.type = "password";
    show.textContent = "Show password";
  }
});
