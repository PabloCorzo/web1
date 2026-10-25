
const word_bank = ["hola","verde","doble","elefante","telepata","de","guerra","licantropo","angustiado","relajado","jeremias","bosque","32","72","231","solterito","tambores"];

const http = require("http");

//Validación de si ha llegado un parámetro y si es válido
//devuelvo 2 si no se consigue para que salga algo de todos modos
function validate(value) {
    const n = Number(value);
    return Number.isInteger(n) && n > 0 ? n : 2;
}


const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const words = validate(url.searchParams.get("words"));
    
    //join simple usando random por cada palabra en vez de shuffle si words > word_bank.length
    const chosen = [];
    for (let i = 0; i < words; i++) {
        chosen.push(word_bank[Math.floor(Math.random() * word_bank.length)]);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>${chosen.join("")}</h1>`);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
