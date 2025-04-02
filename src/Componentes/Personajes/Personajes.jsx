import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../Firebase/config"; // Asegúrate de que la ruta sea correcta

const Personajes = ({ handleModalOpen }) => {
  const [personajes, setPersonajes] = useState([]);

  const db = getFirestore(app);

  // Función para cargar personajes desde Firebase
  const cargarPersonajes = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Personajes"));
      const personajesData = snapshot.docs.map((doc) => {
        const personaje = doc.data();
        return { id: doc.id, ...personaje };
      });
      setPersonajes(personajesData);
    } catch (error) {
      console.error("Error cargando personajes:", error);
    }
  };

  useEffect(() => {
    cargarPersonajes(); // Cargar personajes al cargar el componente
  }, []);

  return (
    <section id="Personajes" className="alumnos">
      <h1 className="heading">Personajes</h1>
      <h3 className="title"></h3>

      <div id="Personajes-cards-container" className="card-container">
        {personajes.map((personaje) => (
          <div key={personaje.id} className="card">
            <img src={personaje.Foto} alt={personaje.Nombre} />
            <h3>{personaje.Nombre}</h3>
            <p>Género: {personaje.Genero}</p>
            <p>Edad: {personaje.Edad}</p>
            <p>Comunidad: {personaje.Comunidad}</p>
            <p><strong>Habilidades:</strong></p>
            <ul>
              {personaje.Habilidades.map((h, index) => (
                <li key={index}>{h}</li>
              ))}
            </ul>
            <p><strong>Debilidades:</strong></p>
            <ul>
              {personaje.Debilidades.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Botón para abrir el modal de creación de personajes */}
      <button id="crearPersonajeBtn" style={{ margin: "20px" }} onClick={() => handleModalOpen("personaje")}>
        + Nuevo personaje
      </button>
    </section>
  );
};

export default Personajes;
