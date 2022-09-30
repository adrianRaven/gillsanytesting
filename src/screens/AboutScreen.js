import "../css/AboutScreen.css";
function AboutScreen() {
  return (
    <div className="contenedor__aboutus">
      <div className="aboutus_img">
        <img src={require("../img/banner_about_1.jpg")} alt="banner_1"></img>
      </div>
      <h3>¿Quienes somos?</h3>
      <div className="aboutus_info_text">
        <p>
          Somos una empresa mexicana vanguardista, dedicada a la distribución de
          equipo médico veterniario, con el distintivo de ofrecer la mejor
          calidad en nuestros productos y servicios.
        </p>{" "}
      </div>
      <div className="aboutus_info_text">
        <p>
          Contamos con ingenieros biómedicos altamente calificados, con más de
          diez años de experiencia en Tecnología de imagen de Diagnóstica, para
          satisfacer las necesidades de mantenimineto de forma eficiente y
          oportuna. Brindando atención personalizada a todos nuestros clientes.
          <br></br>
          <br></br>
          Abastecemos toda la línea de suministro de nuestros productos y
          realizamos mantenimineto Preventivo y correctivo.
        </p>{" "}
      </div>

      <div className="aboutus_img">
        <img src={require("../img/banner_about_2.jpg")} alt="banner_1"></img>
      </div>
      <h3>Nuestra Misión</h3>
      <div className="aboutus_info_text">
        <p>
          Satisfacer a cada uno de nuestros clientes alrededor del mundo,
          ofreciendole atención personalizada y productos de la más alta calidad
          y al mejor precio.
        </p>{" "}
      </div>
    </div>
  );
}

export default AboutScreen;
