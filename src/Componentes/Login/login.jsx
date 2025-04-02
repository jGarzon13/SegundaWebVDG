import React, { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../Firebase/config"; // Asegúrate de que la ruta de tu archivo de configuración de Firebase sea correcta
import "./login.css"; // Asegúrate de que el archivo CSS esté presente y correctamente importado

const Login = ({ setLoginModalVisible, handleClose }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  
  const db = getFirestore(app);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!username || !password) {
      setStatus("Completa los campos.");
      return;
    }

    try {
      const snapshot = await getDocs(collection(db, "Usuarios"));
      let encontrado = false;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username === username && data.password === password) {
          encontrado = true;
        }
      });

      if (encontrado) {
        setUsuarioLogueado(true);
        setStatus("¡Inicio de sesión exitoso!");
        setLoginModalVisible(false); // Cerrar el modal al iniciar sesión
      } else {
        setStatus("❌ Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setStatus("Error al verificar login.");
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span> {/* Cambié de setModalVisible a handleClose */}
        <h2>Iniciar sesión</h2>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Usuario" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
        />
        <button onClick={handleLogin}>Ingresar</button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Login;
