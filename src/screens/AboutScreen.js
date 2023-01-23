import "../css/AboutScreen.css";
function AboutScreen() {
  return (
    <div className="contenedor__main__aboutus">
      <div className="aboutus__section__one">
        <div className="aboutus__section__one__img">
          {" "}
          <img alt="logo" src={require(`../img/logoColors.jpg`)} />
        </div>
        <div className="aboutus__section__one_txt">
          <div className="aboutus__txt__title">NOSOTROS</div>
          <div className="aboutus__txt__text">
            Estamos convencidos de que la salud es lo más importante y que la
            diferencia en la atención al paciente, la hacen los doctores con
            equipo médico de vanguardia. Es por esto que durante años y hasta el
            día de hoy, nuestra familia Gillsany, se ha comprometido en proveer
            tecnología médica de vanguardia a doctores, hospitales y clínicas.
            Contamos con personal especializado en cada área de servicio, centro
            de atención a clientes y asesoría continua, para brindar resultados
            con los mejores beneficios. En Gillsany Impulsamos la innovación, y
            trabajamos por fortalecer los procesos del cuidado de la salud.
          </div>
        </div>
      </div>
      <div className="aboutus__section__two">
        <img src={require(`../img/banneraboutus.jpg`)}></img>
      </div>
      <div className="aboutus__section__three">
        <div className="aboutus__card__mision">
          <div className="aboutus__card__mision_title">Misión</div>
          <div className="aboutus__card__mision_txt">
            Satisfacer con excelencia los requerimientos de cada proyecto de
            equipamiento médico tecnológico. Salvaguardando y protegiendo la
            confianza que nos brindan nuestros clientes.{" "}
          </div>
        </div>
        <div className="aboutus__card__vision">
          <div className="aboutus__card__vision_title">Visión</div>
          <div className="aboutus__card__vision_txt">
            Ser líderes clave en el fortalecimiento de los modelos del cuidado
            de la salud, a través del suministro de tecnología vanguardista que
            generé valor e impulsé la calidad en la atención al paciente.
          </div>
        </div>
      </div>
      <div className="aboutus__section__four">
        <div className="aboutus__valores__title">Valores</div>
        <div className="aboutus__valores__items__section">
          <div className="valores__item">
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor01.jpg`)}
            />
            Responsabilidad con espíritu de servicio
          </div>
          <div className="valores__item">
            {" "}
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor02.jpg`)}
            />
            Capacidad con profesionalismo
          </div>
          <div className="valores__item">
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor03.jpg`)}
            />
            Honestidad con respeto
          </div>
          <div className="valores__item">
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor04.jpg`)}
            />
            Entrega con disposición
          </div>
          <div className="valores__item">
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor05.jpg`)}
            />
            Calidad con integridad
          </div>
          <div className="valores__item">
            <img
              alt="valor item"
              className="valores__item__img"
              src={require(`../img/iconvalor06.jpg`)}
            />
            Resultados con beneficios
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutScreen;
