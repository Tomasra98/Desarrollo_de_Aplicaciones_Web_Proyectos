const anchoVentana = window.innerWidth;
const altoVentana = window.innerHeight;

document.getElementById("jugador_1").style.left = 34 + "%";
document.getElementById("jugador_1").style.top = 36 + "%";

document.getElementById("jugador_2").style.left = 60 + "%";
document.getElementById("jugador_2").style.top = 36 + "%";

let Vida_jugador_1 = 100;
let Vida_jugador_2 = 100;
let Turno_jugador = 1;

function Atacar() {
    if (Turno_jugador === 1) {
        Vida_jugador_2 -= Math.round((Math.random() * 19) + 1);
    }
    else {
        Vida_jugador_1 -= Math.round((Math.random() * 19) + 1);
    }

    console.log(`Vida del Jugador 1: ${Vida_jugador_1}`);
    console.log(`Vida del Jugador 2: ${Vida_jugador_2}`);

    Actualizar_barra_de_vida();
    Verificar_ganador();
    Cambio_de_turno();
}

function Cambio_de_turno() {
    if (Turno_jugador === 1) {
        Turno_jugador = 2;
    }
    else {
        Turno_jugador = 1;
    }

    document.getElementById("turno_jugador").innerText = `Turno del Jugador ${Turno_jugador}`;

}

function Verificar_ganador() {
    if (Vida_jugador_2 <= 0) {
        Vida_jugador_2 = 0;
        Actualizar_barra_de_vida();
        Swal.fire({
            title: 'Ganó el Jugador 1',
            icon: 'success',
            confirmButtonText: 'Jugar Otra Partida'
        }).then(() => {
            location.reload();
        });
    } 
    else if (Vida_jugador_1 <= 0) { 
        Vida_jugador_1 = 0;
        Actualizar_barra_de_vida()
        Swal.fire({
            title: 'Ganó el Jugador 2',
            icon: 'success',
            confirmButtonText: 'Jugar Otra Partida'
        }).then(() => {
            location.reload();
        });
    }
}

function Actualizar_barra_de_vida(){
    const Barra_Vida_Jugador_1 = document.getElementById("cantidad_vida_jugador_1");
    const Barra_Vida_Jugador_2 = document.getElementById("cantidad_vida_jugador_2");

    Barra_Vida_Jugador_1.style.width = `${Vida_jugador_1} %`
    Barra_Vida_Jugador_2.style.width = `${Vida_jugador_2} %`

    // Jugador 1
    if (Vida_jugador_1 <= 20) {
        Barra_Vida_Jugador_1.style.backgroundColor = "red";
    }
    else if (Vida_jugador_1 <= 60) {
        Barra_Vida_Jugador_1.style.backgroundColor = "orange";
    }
    else {
        Barra_Vida_Jugador_1.style.backgroundColor = "#28a700";
    }

    // Jugador 2
    if (Vida_jugador_2 <= 20) {
        Barra_Vida_Jugador_2.style.backgroundColor = "red";
    }
    else if (Vida_jugador_2 <= 60) {
        Barra_Vida_Jugador_2.style.backgroundColor = "orange";
    }
    else {
        Barra_Vida_Jugador_2.style.backgroundColor = "#28a700";
    }

    document.getElementById("vida_en_texto_jugador_1").innerText = `${Vida_jugador_1} / 100`;
    document.getElementById("vida_en_texto_jugador_2").innerText = `${Vida_jugador_2} / 100`

}