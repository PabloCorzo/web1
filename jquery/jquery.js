const form_html = `
  <form id="register_form">
    <label>Nombre y apellidos <input type="text" id="name"></label>
    <span class="error" id="name_error"></span>

    <label>Email <input type="text" id="email"></label>
    <span class="error" id="email_error"></span>

    <label>Teléfono <input type="text" id="phone"></label>
    <span class="error" id="phone_error"></span>

    <label>Contraseña <input type="password" id="password"></label>
    <span class="error" id="password_error"></span>

    <button type="submit">Enviar</button>
    <button type="button" id="cancel_btn">Cancelar</button>
  </form>
`;


const name_regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)+$/;
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone_regex = /^[0-9]+$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

function checkField(id, regex, message) {
  const value = $("#" + id).val().trim();
  if (regex.test(value)) {
    $("#" + id + "_error").text("");
    return true;
  }
  $("#" + id + "_error").text(message);
  return false;
}

function closeForm() {
  $("#register_form").remove();
  $("#main_container").show();
}

$("#register_btn").on("click", () => {
  //dont stack forms if clicked twice
  if ($("#register_form").length) return;

  $("#main_container").hide();
  $("#form_container").append(form_html);
});

//delegated because the form doesnt exist on page load
$("#form_container").on("click", "#cancel_btn", closeForm);

$("#form_container").on("submit", "#register_form", (e) => {
  e.preventDefault();

  //array + every so all fields get checked and show their errors at once
  const results = [
    checkField("name", name_regex, "Al menos dos palabras, solo letras"),
    checkField("email", email_regex, "Formato de email no válido"),
    checkField("phone", phone_regex, "Solo números, sin espacios"),
    checkField("password", password_regex, "Mínimo 8 caracteres, con mayúscula, minúscula y número"),
  ];

  if (results.every((ok) => ok)) {
    alert("Registro completado. Bienvenido, " + $("#name").val().trim() + "!");
    closeForm();
  }
});
