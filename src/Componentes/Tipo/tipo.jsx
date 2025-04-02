import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/config"; 
import "./tipo.css";

function Tipografia() {
  const [tipografias, setTipografias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar los documentos de la colección "Tipografía"
    const cargarTipografias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Tipografía"));
        const tipografiasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTipografias(tipografiasData);
      } catch (error) {
        setError("Error al cargar la tipografía.");
        console.error("Error al cargar tipografía:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarTipografias();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tipografia-container">
      <h1>Tipografía</h1>
      <div className="tipografia-list">
        {tipografias.map((tipografia) => (
          <div key={tipografia.id} className="tipografia-card">
            <h2>{tipografia.Nombre}</h2>
            <p>{tipografia.Desc}</p>
            <img src={tipografia.img} alt={tipografia.Nombre} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tipografia;
