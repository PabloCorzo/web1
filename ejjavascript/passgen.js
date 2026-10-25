const form = document.getElementById("passgen_form");
const result = document.getElementById("result");

let words = [];

fetch("https://cdn.jsdelivr.net/npm/an-array-of-spanish-words@2.0.0/index.json")
  .then((res) => res.json())
  .then((l) => words = l);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amt = Number(form.amt.value);
  const repeats = form.repeats.checked;
  const capitalize = form.capitalize.checked;

  const chosen = [];

  while (chosen.length < amt) {
    let word = words[Math.floor(Math.random() * words.length)];

    if (capitalize) {
      word = word[0].toUpperCase() + word.slice(1);
    }

    if (repeats || !chosen.includes(word)) {
      chosen.push(word);
    }
  }

  result.textContent = chosen.join("");
});
