import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {

  // Estado del juego
  anchoVentana: number = 0;
  altoVentana: number = 0;

  Vida_jugador_1: number = 100;
  Vida_jugador_2: number = 100;
  Turno_jugador: number = 1;

  constructor() {

    (window as any).Atacar = this.atacar.bind(this);
  }


  ngAfterViewInit(): void {
    this.anchoVentana = window.innerWidth;
    this.altoVentana = window.innerHeight;


    const j1 = document.getElementById('jugador_1') as HTMLElement | null;
    const j2 = document.getElementById('jugador_2') as HTMLElement | null;

    if (j1) {
      j1.style.left = '22%';
      j1.style.top = '22%';
    }
    if (j2) {
      j2.style.left = '52%';
      j2.style.top = '22%';
    }


    const turnoElem = document.getElementById('turno_jugador') as HTMLElement | null;
    if (turnoElem) {
      turnoElem.innerText = `Turno del Jugador ${this.Turno_jugador}`;
    }


    this.actualizarBarraDeVida();
  }



  atacar(): void {
    if (this.Turno_jugador === 1) {
      this.Vida_jugador_2 -= Math.round((Math.random() * 19) + 1);
    } else {
      this.Vida_jugador_1 -= Math.round((Math.random() * 19) + 1);
    }

    if (this.Vida_jugador_1 < 0) this.Vida_jugador_1 = 0;
    if (this.Vida_jugador_2 < 0) this.Vida_jugador_2 = 0;

    console.log(`Vida del Jugador 1: ${this.Vida_jugador_1}`);
    console.log(`Vida del Jugador 2: ${this.Vida_jugador_2}`);

    this.actualizarBarraDeVida();
    this.verificarGanador();
    this.cambioDeTurno();
  }

  private cambioDeTurno(): void {
    this.Turno_jugador = this.Turno_jugador === 1 ? 2 : 1;

    const turnoElem = document.getElementById('turno_jugador') as HTMLElement | null;
    if (turnoElem) {
      turnoElem.innerText = `Turno del Jugador ${this.Turno_jugador}`;
    }
  }

  private verificarGanador(): void {
    if (this.Vida_jugador_2 <= 0) {
      this.Vida_jugador_2 = 0;
      this.actualizarBarraDeVida();
      Swal.fire({
        title: 'Ganó el Jugador 1',
        icon: 'success',
        confirmButtonText: 'Jugar Otra Partida'
      }).then(() => location.reload());
    } else if (this.Vida_jugador_1 <= 0) {
      this.Vida_jugador_1 = 0;
      this.actualizarBarraDeVida();
      Swal.fire({
        title: 'Ganó el Jugador 2',
        icon: 'success',
        confirmButtonText: 'Jugar Otra Partida'
      }).then(() => location.reload());
    }
  }

  private actualizarBarraDeVida(): void {
    const barra1 = document.getElementById('cantidad_vida_jugador_1') as HTMLElement | null;
    const barra2 = document.getElementById('cantidad_vida_jugador_2') as HTMLElement | null;

    if (barra1) {
      barra1.style.width = `${this.Vida_jugador_1}%`;
      if (this.Vida_jugador_1 <= 20) barra1.style.backgroundColor = 'red';
      else if (this.Vida_jugador_1 <= 60) barra1.style.backgroundColor = 'orange';
      else barra1.style.backgroundColor = '#28a700';
    }

    if (barra2) {
      barra2.style.width = `${this.Vida_jugador_2}%`;
      if (this.Vida_jugador_2 <= 20) barra2.style.backgroundColor = 'red';
      else if (this.Vida_jugador_2 <= 60) barra2.style.backgroundColor = 'orange';
      else barra2.style.backgroundColor = '#28a700';
    }

    const vida1Elem = document.getElementById('vida_en_texto_jugador_1') as HTMLElement | null;
    const vida2Elem = document.getElementById('vida_en_texto_jugador_2') as HTMLElement | null;

    if (vida1Elem) vida1Elem.innerText = `${this.Vida_jugador_1} / 100`;
    if (vida2Elem) vida2Elem.innerText = `${this.Vida_jugador_2} / 100`;
  }
}
