import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../Firebase/config"; // Asegúrate de que la ruta de tu archivo de configuración de Firebase sea correcta
import "./novedades.css";

const Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  const db = getFirestore(app);

  // Función para cargar novedades desde Firebase
  const cargarNovedades = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Novedades"));
      const novedadesData = snapshot.docs.map((doc) => {
        const novedad = doc.data();
        
        // Verificar si la propiedad 'Fecha' existe y es un Timestamp válido
        let fecha = "Fecha no disponible"; // Valor por defecto
        if (novedad.Fecha && novedad.Fecha.seconds) {
          fecha = new Date(novedad.Fecha.seconds * 1000).toLocaleDateString();
        }

        // Verificar si la propiedad 'Referencia' es válida
        let mediaHTML = "<p>[Contenido no soportado]</p>";
        const url = novedad.Referencia || "";
        
        // Si la URL de 'Referencia' no está vacía, tratar de cargarla
        if (url) {
          const esVideo = /\.(mp4|webm|ogg)$/i.test(url);
          const esImagen = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

          if (esVideo) {
            mediaHTML = `<video src="${url}" controls width="100%"></video>`;
          } else if (esImagen) {
            mediaHTML = `<img src="${url}" alt="${novedad.Titulo}" width="100%">`;
          } else {
            mediaHTML = "<p>[Contenido no soportado]</p>";
          }
        } else {
          mediaHTML = "<p>[Contenido no disponible]</p>";
        }

        return {
          id: doc.id,
          ...novedad,
          fecha,
          mediaHTML,
        };
      });

      setNovedades(novedadesData);
    } catch (error) {
      console.error("Error cargando novedades:", error);
    }
  };

  useEffect(() => {
    cargarNovedades(); // Cargar novedades al cargar el componente
  }, []);

  return (
    <section className="about" id="about">
      <h1 className="heading">Novedades</h1>

      <div className="box-container">
        {novedades.map((novedad) => (
          <div key={novedad.id} className="box">
            <h3>{novedad.Titulo}</h3>
            <div dangerouslySetInnerHTML={{ __html: novedad.mediaHTML }} />
            <p>{novedad.Descripcion}</p>
            <p>Por: {novedad.Por}</p>
            <p>Fecha: {novedad.fecha}</p> {/* Mostrar la fecha correctamente */}
          </div>
        ))}
      </div>

      <button id="crearNovedadBtn" style={{ margin: "20px" }}>
        + Novedad
      </button>
    </section>
  );
};

export default Novedades;
