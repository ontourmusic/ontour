const header = {
    container: {
        backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        height: "100vh",
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
        fontSize: "max(48px, 5vw)",
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
};

const home_styles = {
    header,
    review,
    homeTile,
};

export default home_styles;
