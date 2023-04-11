const header = {
    container: {
        backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        height: "800px",
        color: "white",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        margin: 0,
        // position: "absolute",
        // top: "55%",
        // left: "50%",
        // msTransform: "translate(-50%, -50%)",
        // transform: "translate(-50%, -50%)",
    },
    title: {
        fontSize: "70px",
        paddingBottom: "20px",
        fontWeight: "lighter",
    },
};

const homeTile = {
    container: {
        height: "25vh",
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
    container: {
        height: "250px",
        backgroundColor: "#181816",
        color: "white",
        fontWeight: "lighter",
        textAlign: "left",
        paddingLeft: "60px",
        paddingRight: "20%",
    },
    text: {
        fontSize: "2em",
        paddingTop: "10px",
    },
};

const home_styles = {
    header,
    review,
    homeTile,
};

export default home_styles;
