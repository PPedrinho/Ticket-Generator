const FILE_SIZE_LIMIT = 500 * 1024;
const nameVal = document.querySelector(".nameValue");
const emailVal = document.querySelector(".emailValue");
const timeValue = document.querySelector(".dot");
const avatar = document.querySelector(".avatar");
const username = document.querySelector(".name");
const githubUsernameValue = document.querySelector(".githubUsernameValue");
const ticketNumber = document.querySelector(".ticket-number");

const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const githubUsername = document.querySelector("#github-username");
const firstSection = document.querySelector(".first-section");
const secondSection = document.querySelector(".second-section");
const form = document.querySelector("#form");

const label = document.querySelector("#label");
const uploadedImg = document.querySelector("#uploaded-img");
const uploadIcon = document.querySelector("#upload-icon");
const uploadLabel = document.querySelector("#upload-label");
const btn = document.querySelector("#submit-btn");
const btnContainer = document.querySelector(".btn-container");
const removeBtn = document.querySelector(".remove-btn");
const changeBtn = document.querySelector(".change-btn");
const errorWarning = document.querySelectorAll(".error-warning");
const sizeWarning = document.querySelector(".size-warning");
const dragText = document.querySelector(".drag-text");
const fileError = document.querySelector(".error");
const photoPreview = document.querySelector(".img-container");

function checkFileSize(file) {
  if (!file) return;

  if (file.size > FILE_SIZE_LIMIT) {
    sizeWarning.style.display = "none";
    fileError.style.display = "block";
    btnContainer.style.display = "none";
    dragText.style.display = "block";
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    uploadedImg.src = reader.result;
    avatar.src = reader.result;
    uploadedImg.style.display = "block";
    uploadIcon.style.display = "none";
    btnContainer.style.display = "block";
    dragText.style.display = "none";
  };
}

label.addEventListener("dragover", (e) => {
  e.preventDefault();
  label.classList.add("dragOver");
});

label.addEventListener("dragleave", (e) => {
  e.preventDefault();
  label.classList.remove("dragOver");
});

label.addEventListener("drop", (e) => {
  e.preventDefault();
  label.classList.remove("dragOver");
  const file = e.dataTransfer.files[0];
  checkFileSize(file); 
});

uploadLabel.addEventListener("change", () => {
  const file = uploadLabel.files[0];
  checkFileSize(file); 
});

changeBtn.addEventListener("click", () => {
  btnContainer.style.display = "none";
  dragText.style.display = "block";
  uploadLabel.click(); 
});

removeBtn.addEventListener("click", () => {
  uploadedImg.style.display = "none";
  uploadIcon.style.display = "block";
  uploadedImg.src = "";
  btnContainer.style.display = "none";
  dragText.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (fullName.value.trim() === "") {
    errorWarning[0].style.display = "block";
    fullName.style.border = "2px solid var(--laranja1)";
    isValid = false;
  } else {
    errorWarning[0].style.display = "none";
    fullName.style.border = "2px solid var(--branco2)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    errorWarning[1].style.display = "block";
    email.style.border = "2px solid var(--laranja2)";
    isValid = false;
  } else {
    errorWarning[1].style.display = "none";
    email.style.border = "2px solid var(--branco2)";
  }

  if (githubUsername.value.trim() === "") {
    errorWarning[2].style.display = "block";
    githubUsername.style.border = "2px solid var(--laranja2)";
    isValid = false;
  } else {
    errorWarning[2].style.display = "none";
    githubUsername.style.border = "2px solid var(--branco2)";
  }

  // verificação se avatar foi anexado
  const file = uploadLabel.files[0];
  if (!file || uploadedImg.src === '' || uploadedImg.style.display === 'none') {
    sizeWarning.style.display = "none";
    fileError.style.display = "block";
    fileError.querySelector('small').textContent = "Por favor, anexe uma imagem de avatar antes de gerar o ticket.";
    isValid = false;
  } else {
    fileError.style.display = "none";
  }

  if (isValid) {
    firstSection.style.display = "none";
    secondSection.style.display = "block";
  }
});


email.addEventListener("input", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    errorWarning[1].style.display = "none";
    email.style.border = "2px solid var(--branco2)";
    emailVal.textContent = email.value;
  }
});

fullName.addEventListener("input", () => {
  if (fullName.value.trim() !== "") {
    errorWarning[0].style.display = "none";
    fullName.style.border = "2px solid var(--branco2)";
    username.textContent = fullName.value;
    nameVal.textContent = fullName.value;
  }
});

githubUsername.addEventListener("input", () => {
  if (githubUsername.value.trim() !== "") {
    errorWarning[2].style.display = "none";
    githubUsername.style.border = "2px solid var(--branco2)";
    githubUsernameValue.textContent = githubUsername.value;
  }
});

ticketNumber.textContent = "#" + Math.floor(Math.random() * 100000);

const currentDate = new Date();
const options = { month: 'short', day: 'numeric', year: 'numeric' };
timeValue.textContent = currentDate.toLocaleDateString('en-US', options);

document.getElementById('reset-btn').addEventListener('click', function() {
  document.getElementById('form').reset();
  document.querySelector('.second-section').style.display = 'none';
  document.querySelector('.first-section').style.display = 'block';
  document.getElementById('uploaded-img').style.display = 'none';
});

document.querySelector('.remove-btn').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('uploaded-img').style.display = 'none';
  document.getElementById('upload-label').value = '';
});

document.getElementById('reset-btn').addEventListener('click', function() {
  document.querySelector('.second-section').style.display = 'none';
  document.querySelector('.first-section').style.display = 'block';

  form.reset();

  uploadedImg.style.display = 'none';
  uploadIcon.style.display = 'block';
  uploadedImg.src = '';
  btnContainer.style.display = 'none';
  dragText.style.display = 'block';

  errorWarning.forEach(warning => {
    warning.style.display = 'none';
  });

  fullName.style.border = '2px solid var(--branco2)';
  email.style.border = '2px solid var(--branco2)';
  githubUsername.style.border = '2px solid var(--branco2)';

  nameVal.textContent = '';
  emailVal.textContent = '';
  githubUsernameValue.textContent = '';
});
