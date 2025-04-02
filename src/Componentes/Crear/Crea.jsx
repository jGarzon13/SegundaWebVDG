import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/config"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Asegúrate de instalar axios para hacer solicitudes HTTP

function Crea({ modalType, setModalVisible, handleClose }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterURL, setPosterURL] = useState("");
  const [genero, setGenero] = useState("");
  const [comunidad, setComunidad] = useState("");
  const [habilidades, setHabilidades] = useState([]);
  const [debilidades, setDebilidades] = useState([]);
  const navigate = useNavigate();

  // Manejar el cambio de archivo (imagen)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  // Función para subir la imagen a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Determinar el preset según el tipo de modal
    const preset = modalType === "novedad" ? "novedad" : "personaje";
    
    formData.append("upload_preset", preset);  // Usa el preset correcto

    const cloudName = "dj9nrp8r8";  // Asegúrate de usar tu cloud_name correcto
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
      const response = await axios.post(url, formData);
      return response.data.secure_url; // Obtiene el URL de la imagen subida
    } catch (error) {
      console.error("Error subiendo la imagen a Cloudinary:", error);
      return null;
    }
  };

  const store = async (e) => {
    e.preventDefault();
    if (poster) {
      const downloadURL = await uploadImageToCloudinary(poster);
      if (!downloadURL) {
        alert("Error al subir la imagen.");
        return;
      }
      setPosterURL(downloadURL);

      try {
        if (modalType === "novedad") {
          // Guardar la novedad en Firestore
          await addDoc(collection(db, "Novedades"), {
            titulo,
            descripcion,
            poster: downloadURL, // URL de la imagen subida a Cloudinary
          });
        } else if (modalType === "personaje") {
          // Guardar el personaje en Firestore
          await addDoc(collection(db, "Personajes"), {
            Nombre: titulo,
            Genero: genero,
            Comunidad: comunidad,
            Habilidades: habilidades,
            Debilidades: debilidades,
            Foto: downloadURL, // URL de la imagen subida a Cloudinary
          });
        }

        setModalVisible(false); // Cerrar el modal
        navigate("/"); // Redirigir o navegar a otra página
      } catch (error) {
        console.error("Error al agregar documento:", error);
      }
    } else {
      alert("Por favor selecciona una imagen.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{modalType === "novedad" ? "Agregar Novedad" : "Agregar Personaje"}</h2>

        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              type="text"
              className="form-control"
              required
            />
          </div>

          {modalType === "personaje" && (
            <>
              <div className="mb-3">
                <label className="form-label">Género</label>
                <input
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Comunidad</label>
                <input
                  value={comunidad}
                  onChange={(e) => setComunidad(e.target.value)}
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Habilidades</label>
                <input
                  value={habilidades}
                  onChange={(e) => setHabilidades(e.target.value.split(","))}
                  type="text"
                  className="form-control"
                  placeholder="Habilidad 1, Habilidad 2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Debilidades</label>
                <input
                  value={debilidades}
                  onChange={(e) => setDebilidades(e.target.value.split(","))}
                  type="text"
                  className="form-control"
                  placeholder="Debilidad 1, Debilidad 2"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Poster</label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              accept="image/*"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Crea;
