import React from "react";
import "./home.css"

function Home() {
  return (
    <>
      <section className="home" id="home">
        <div className="content">
          <h1>Tlaolli: La Cultura del maíz</h1>
        </div>
      </section>

      <section className="about" id="about">
        <div className="project-content">
          <p>
            Es un juego de simulación y estrategia inspirado en la cultura del
            maíz en Latinoamérica. Los jugadores gestionan una aldea en
            crecimiento, utilizando el maíz como recurso principal para construir,
            alimentar a la comunidad y expandir su territorio. La experiencia
            combina mecánicas de recolección, producción y comercio con una
            narrativa envolvente centrada en la supervivencia, la cooperación y la
            sostenibilidad.
          </p>
          <a href="./src/Recursos/VideoJuego.png">
            <button>Ver más</button>
          </a>
        </div>

        <div className="box-container">
          <h2>Características</h2>
          <div className="box">
            <h3>Plataforma de despliegue</h3>
            <img
              src="https://es.blog.symbaloo.com/assets/symbaloo/files/726_6219f1cbb41bb.png"
              alt="Plataforma de despliegue"
            />
            <p>Dispositivos móviles y tablets (Android)</p>
          </div>
          <div className="box">
            <h3>Público objetivo</h3>
            <img
              src="https://www.josebernalte.com/wp-content/uploads/2017/05/crear-contenido-publico-objetivo.png"
              alt="Público objetivo"
            />
            <ul>
              <li>Niños, jóvenes y adultos (8+ años)</li>
              <li>
                Interesados en juegos de simulación, gestión de recursos y cultura
                ancestral
              </li>
              <li>
                Personas con curiosidad por la historia del maíz, la agricultura
                y la sostenibilidad
              </li>
            </ul>
          </div>
          <div className="box">
            <h3>Género del juego</h3>
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/339/890/non_2x/bulb-illustrations-of-learning-symbol-theme-symbol-of-education-hand-drawn-design-png.png"
              alt="Género del juego"
            />
            <p>Simulación y estrategia con gestión de recursos</p>
          </div>
          <div className="box">
            <h3>Clasificación ESRB</h3>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrogQrZyZxe2ZR707cUAVyA11tQ9T_bjiCTQ&s"
              alt="Clasificación ESRB"
            />
            <p>E (Everyone - Todos)</p>
          </div>
          <div className="box">
            <h3>Desarrollado en</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Unity_2021.svg"
              alt="Unity"
            />
            <p>Unity 2D</p>
            <p>Versión</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
