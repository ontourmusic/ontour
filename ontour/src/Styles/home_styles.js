
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
        transition: '0.5s ease',
        opacity: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        textAlign: 'center',
    }
}

const review = {
    container: {
        height: "250px",
        backgroundColor: "#181816",
        color: "white",
        fontWeight: "lighter",
        textAlign: "left",
        paddingLeft: "60px",
        paddingRight: "20%"
    },
    text: {
        fontSize: "2em",
        paddingTop: "10px"
    },
}

const home_styles = {
    review,
    homeTile,
}

export default home_styles