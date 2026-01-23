const niveles = [
    document.getElementById("nivel1"),
    document.getElementById("nivel2"),
    document.getElementById("nivel3"),
    document.getElementById("nivel4"),
    document.getElementById("nivel5")
];

const originalColors = ["#ff9999", "#ffcc99", "#ffff99", "#ccff99", "#99ccff"];
const faseTexto = document.getElementById("fase");
const btnSiguiente = document.getElementById("siguiente");
const btnAuto = document.getElementById("auto");

let caminoCaptura = [];
let caminoBurbuja = [];
let eventoActivo = false;
let faseActual = "capturing";
let paso = 0;
let automatico = false;
let temporizador;
let objetivo;

niveles.forEach((nivel, index) => {
    nivel.addEventListener("click", (e) => {
        if (!eventoActivo) {
            e.stopPropagation(); // prevenir propagación para simular manualmente
            objetivo = e.currentTarget;
            console.log("Objetivo: ", objetivo);
            const indiceObjetivo = niveles.indexOf(objetivo);

            caminoCaptura = niveles.slice(0, indiceObjetivo + 1);
            caminoBurbuja = [...caminoCaptura].reverse();

            console.log("Inicia recorrido");
            console.log("Camino de captura:", caminoCaptura.map(n => n.id));
            console.log("Camino de burbuja:", caminoBurbuja.map(n => n.id));

            eventoActivo = true;
            faseActual = "capturing";
            paso = 0;
            faseTexto.textContent = "Capturing...";
        }
    });
});

function avanzarPaso() {
    const camino = faseActual === "capturing" ? caminoCaptura : caminoBurbuja;
    if (paso < camino.length) {
        const div = camino[paso];
        colorear(div, faseActual === "capturing" ? "#2ecc71" : "#e74c3c");
        console.log(`${faseActual.toUpperCase()} paso ${paso + 1}: ${div.id}`);

        if (paso > 0) restaurarColor(camino[paso - 1]);

        paso++;
    } else {
        if (faseActual === "capturing") {
            if (paso > 0) restaurarColor(camino[paso - 1]);
            faseActual = "bubbling";
            paso = 0;
            colorear(objetivo, "#b229ff");
            faseTexto.textContent = "Bubbling...";
        } else {
            if (paso > 0) restaurarColor(camino[paso - 1]);
            faseTexto.textContent = "Finalizado";
            eventoActivo = false;
            paso = 0;
            if (automatico) {
                clearInterval(temporizador);
                automatico = false;
            }
        }
    }
}

btnSiguiente.addEventListener("click", () => {
    if (eventoActivo) avanzarPaso();
});

btnAuto.addEventListener("click", () => {
    if (eventoActivo && !automatico) {
        automatico = true;
        temporizador = setInterval(() => {
            avanzarPaso();
        }, 1000);
    }
});

function colorear(div, color) {
    div.style.backgroundColor = color;
}

function restaurarColor(div) {
    const index = niveles.indexOf(div);
    if (index !== -1) {
        div.style.backgroundColor = originalColors[index];
    }
}