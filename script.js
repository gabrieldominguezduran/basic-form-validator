const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const checkbox = document.querySelector("#checkbox");
const show = document.querySelector(".show");

const passRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

// Check valid email
const isValidEmail = (email) => {
  const emailRegEx = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

  return emailRegEx.test(email.value);
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

//Get field name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//Submit listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
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
