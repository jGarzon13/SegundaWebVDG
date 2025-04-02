import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/config";  // Asegúrate de que la ruta sea correcta

function HUD() {
  const [hudElements, setHudElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar los documentos de la colección "HUD"
    const cargarHUD = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "HUD"));
        const hudData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHudElements(hudData);
      } catch (error) {
        setError("Error al cargar los elementos del HUD.");
        console.error("Error al cargar HUD:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarHUD();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hud-container">
      <h1>Elementos del HUD</h1>
      <div className="hud-list">
        {hudElements.map((element) => (
          <div key={element.id} className="hud-card">
            <h2>{element.Nombre}</h2>
            <p><strong>Descripción:</strong> {element.Desc}</p>
            <p><strong>Función:</strong> {element.Info?.Función}</p>
            <p><strong>Tipo:</strong> {element.Info?.Tipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HUD;
