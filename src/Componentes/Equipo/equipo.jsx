import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../Firebase/config"; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Importa los iconos de GitHub y LinkedIn
import "./equipo.css"

function Equipo() {
  const [perfiles, setPerfiles] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [perfilEditId, setPerfilEditId] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const db = getFirestore(app);

  // Cargar perfiles desde Firestore
  const cargarPerfiles = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Perfiles"));
      const perfilesData = [];
      snapshot.forEach((docSnap) => {
        const perfil = docSnap.data();
        perfilesData.push({ id: docSnap.id, ...perfil });
      });
      setPerfiles(perfilesData);
    } catch (err) {
      setError("Error al cargar los perfiles.");
    } finally {
      setLoading(false); // Cambia el estado de carga a falso una vez se haya completado
    }
  };

  useEffect(() => {
    cargarPerfiles();
  }, []);

  const handleCardClick = (perfilId, perfil) => {
    if (!usuarioLogueado) return;
    setPerfilEditId(perfilId);
    // Aquí puedes manejar la lógica de la edición de perfil si es necesario
    console.log(perfil); // Imprime el perfil para depurar
  };

  if (loading) return <p>Cargando...</p>; // Mensaje mientras se carga

  if (error) return <p>{error}</p>; // Muestra un mensaje de error si ocurre

  return (
    <>
      <section id="alumnos" className="alumnos">
        <h1 className="heading">Equipo</h1>
        <h3 className="title"></h3>

        <div id="cards-container" className="card-container">
          {perfiles.map((perfil) => (
            <div
              key={perfil.id}
              className="card"
              onClick={() => handleCardClick(perfil.id, perfil)}
            >
              <img src={perfil.Foto} alt={perfil.Nombre} />
              <h3>{perfil.Nombre}</h3>
              <p>Rol: {perfil.Rol}</p>
              <div className="icons">
                {perfil.Github && (
                  <a
                    href={perfil.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-icon"
                  >
                    <FontAwesomeIcon icon={faGithub} size="2x" /> {/* Icono de GitHub */}
                  </a>
                )}
                {perfil.Linkedin && (
                  <a
                    href={perfil.Linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-icon"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" /> {/* Icono de LinkedIn */}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Equipo;
