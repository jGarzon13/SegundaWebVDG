import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/config";  // Asegúrate de que la ruta sea correcta

function PaletaColores() {
  const [colores, setColores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar los documentos de la colección "PaletaColores"
    const cargarColores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PaletaColores"));
        const coloresData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setColores(coloresData);
      } catch (error) {
        setError("Error al cargar los colores.");
        console.error("Error al cargar colores:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarColores();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="colores-container">
      <h1>Paleta de Colores</h1>
      <div className="colores-list">
        {colores.map((color) => (
          <div key={color.id} className="color-card" style={{ backgroundColor: color.Nombre }}>
            <h2>{color.Nombre}</h2>
            <p>{color.Desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaletaColores;
