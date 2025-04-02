import React from "react";
import "./footer.css"

function Footer() {
    return <>
    <section className="footer" id="footer">
      <div className="credits">
          <p>Créditos:</p>
          <div className="credit-list">
              <p>Diseño y desarrollo Web: Isabel Cristina Zorrilla M</p>
              <p>Asistencia de IA: ChatGPT de OpenAI</p>
              <div className="additional-references">
                  <p><strong>Contenido adicional y referencias:</strong></p>
                  <div className="references">
                      <div className="reference">
                          <strong>Unity</strong>
                          <ul>
                              <li><a href="https://docs.unity3d.com/" target="_blank">Unity Documentation</a></li>
                              <li>"Unity 2021 Cookbook" de Matt Smith y Shaun Ferns</li>
                          </ul>
                      </div>
                      
                  </div>
              </div>
          </div>
      </div>
      <div className="alliances">
          <div className="alliance-logos">
              <img src="https://res.cloudinary.com/dj9nrp8r8/image/upload/v1743082937/tm7oqun7zwvjgfcxkzsf.png" alt="Alianza 1" />
              
          </div>
      </div>
  </section>    
    </>;
}

export default Footer;