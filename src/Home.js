import "./Home.css";
const Home = () => {
  return (
    <>
      <video className="video" loop width={"100%"} height={"500px"} autoPlay>
        <source src="/promo.mp4" type="video/mp4" />
      </video>
      <div className="all-about">
        <div className="about">
          <img className="images" src="/makeup.png"></img>
          <div className="text">
            <h2>SISLEY-PARIS</h2>
            <p className="text2">
              Renowned for fusing innovative formulas with sensorial
              experiences, SISLEY-PARIS enhances any (and every) make up look.
              Doing just that is the NEW Phyto-Teint Perfection Foundation, with
              a matte, high-coverage formula.
            </p>
          </div>
        </div>

        <div className="about">
          <div className="text">
            <h2>Luscious Lips </h2>
            <p className="text2">
              SISLEY-PARIS introduces a new realm of lip perfection. Elevate
              your beauty with our exquisite lipstick collection. Explore the
              rich hues and indulge in a sensorial experience that complements
              your style.
            </p>
          </div>
          <div className="towpic">
            <img className="images2" src="/konsiler.png"></img>
            <img className="images2" src="/maskara.png"></img>
          </div>
        </div>
        <div className="about">
          {" "}
          <div className="towpic">
            <img className="images2" src="/lip.png"></img>
            <img className="images2" src="/card.png"></img>
          </div>
          <div className="text">
            <h2>Discover Flawless Beauty</h2>
            <p className="text2">
              Elevate your beauty with SISLEY-PARIS' innovative formulas.
              Introducing the NEW Phyto-Teint Perfection Foundation – a matte,
              high-coverage masterpiece that enhances every makeup look.
            </p>
          </div>
        </div>
      </div>
      <img className="about-image" src="/1.png"></img>
    </>
  );
};

export default Home;
