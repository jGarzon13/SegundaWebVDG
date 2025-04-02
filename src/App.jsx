import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Asegúrate de importar Router
import Login from "./Componentes/Login/login";
import Header from "./Componentes/Nav/nav";
import Home from "./Componentes/Home/home";
import Equipo from "./Componentes/Equipo/equipo";
import Footer from "./Componentes/Footer/footer";
import Novedades from "./Componentes/Novedades/novedades";
import Personajes from "./Componentes/Personajes/Personajes";
import Crea from "./Componentes/Crear/Crea"; // Asegúrate de importar el componente de creación
import Tipografia from "./Componentes/Tipo/tipo";
import PaletaColores from "./Componentes/Paleta/Paleta";
import HUD from "./Componentes/Hud/hud";

const App = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false); // Para el modal de Login
  const [modalVisible, setModalVisible] = useState(false); // Para el modal de creación
  const [modalType, setModalType] = useState(""); // Puede ser "novedad" o "personaje"

  // Función para abrir el modal de login
  const handleLoginModalOpen = () => {
    setLoginModalVisible(true);
  };

  // Función para cerrar el modal de login
  const handleLoginModalClose = () => {
    setLoginModalVisible(false);
  };

  // Función para abrir el modal de creación (novedad/personaje)
  const handleModalOpen = (type) => {
    setModalType(type); // Establecer el tipo de modal (novedad o personaje)
    setModalVisible(true); // Mostrar el modal
  };

  // Función para cerrar el modal de creación
  const handleModalClose = () => {
    setModalVisible(false); // Cerrar el modal de creación
  };

  return (
    <Router> {/* Asegúrate de envolver todo dentro de Router */}
      <>
        <Header setLoginModalVisible={setLoginModalVisible} handleModalOpen={handleModalOpen} />

        {/* Mostrar el modal de login */}
        {loginModalVisible && (
          <Login setLoginModalVisible={setLoginModalVisible} handleClose={handleLoginModalClose} />
        )}

        {/* Mostrar el modal de creación de novedades o personajes */}
        {modalVisible && (
          <Crea 
            modalType={modalType} 
            setModalVisible={setModalVisible} 
            handleClose={handleModalClose} 
          />
        )}

        {/* Resto de los componentes de la aplicación */}
        <Home />
        <Equipo />
        <Footer />
        <Novedades handleModalOpen={handleModalOpen} />
        <Personajes handleModalOpen={handleModalOpen} />
        <Tipografia/>
        <PaletaColores/>
        <HUD/>
      </>
    </Router> 
  );
};

export default App;
