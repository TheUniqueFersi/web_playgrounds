const contenedor = document.getElementById("contenedor");
const boton = document.querySelector(".boton");

// Fase de bubbling (por defecto)

contenedor.addEventListener("click", function (event) {
    console.log("[BUBBLING] Contenedor escuchó clic");
    console.log("  target:", event.target);
    console.log("  currentTarget:", event.currentTarget);
}, false); // bubbling explícito

// Fase de capturing
contenedor.addEventListener("click", function (event) {
    console.log("[CAPTURING] Contenedor escuchó clic");
    console.log("  target:", event.target);
    console.log("  currentTarget:", event.currentTarget);
}, true);

boton.addEventListener("click", function (event) {
    console.log("[BOTÓN] Escuchó clic directamente");
    console.log("  target:", event.target);
    console.log("  currentTarget:", event.currentTarget);
});