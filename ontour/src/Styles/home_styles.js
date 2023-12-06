const header = {
  container: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')",
      //"url('https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg')",
       //"url('https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg')",
      //"url('https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg')",
      // "url('https://cdn.pixabay.com/photo/2017/08/02/13/09/confetti-2571539_1280.jpg')",
      //"url('https://cdn.pixabay.com/photo/2016/11/22/18/56/audience-1850022_1280.jpg')",
      //"url('https://cdn.pixabay.com/photo/2020/01/15/17/35/concert-4768496_1280.jpg')",
      //"url('https://cdn.pixabay.com/photo/2020/02/06/08/19/band-4823341_1280.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    height: "70vh",
    color: "white",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: "auto",
  },
  title: {
    textShadow: "0px 0px 10px rgba(0,0,0,0.55)",
    // fontSize: "max(48px, 5vw)",
    fontSize: "max(36px, 4vw)",
    paddingBottom: "20px",
    fontWeight: "lighter",
  },
};

const homeTile = {
  container: {
    minHeight: "200px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    opacity: "1.0",
    display: "block",
    transition: "0.5s ease",
    backfaceVisibility: "hidden",
  },
  middle: {
    transition: "0.5s ease",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

const review = {
  containerLargeScreen: {
    height: "25vh",
    backgroundColor: "#181816",
    color: "white",
    fontWeight: "lighter",
    textAlign: "left",
    paddingLeft: "15%",
    paddingRight: "20%",
    paddingBottom: "10%",
  },
  container: {
    height: "auto",
    backgroundColor: "#181816",
    color: "white",
    fontWeight: "lighter",
    textAlign: "left",
    margin: "5% 10% 5% 10%",
    padding: "0% 5% 0% 5%",
    borderLeft: "1px solid rgba(255,255,255,0.5)",
  },
  text: {
    fontSize: "max(16px, 2vw)",
    paddingTop: "10px",
  },
  subText: {
    overflowWrap: "break-word",
    textAlign: "center",
  },
};

const home_styles = {
  header,
  review,
  homeTile,
};

export default home_styles;
