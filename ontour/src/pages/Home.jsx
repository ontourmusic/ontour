import React, { startTransition } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePageArtist from "../components/HomePageArtist";
import Navigation from "../Navigation";
import { artistList } from "../ArtistInfo";
import MobileHomePageArtist from "../components/MobileHomePageArtist";
import SearchBar from "../components/SearchBar";


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://zouczoaamusrlkkuoppu.supabase.co'
// // const supabaseKey = process.env.SUPABASE_KEY
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNTg1MjEsImV4cCI6MTk5MzczNDUyMX0.T-vjkWIKobH1SwMOh528rMt4Pmeu1WlDHZVTlJ-QLwU"
// const supabase = createClient(supabaseUrl, supabaseKey)

function splitArtistsToRows(artists, rowLength) {
    var splitArray = [];
    for (var i = 0; i < artists.length; i += (rowLength)) {
        splitArray.push(artists.slice(i, i + (rowLength)));
    }
    return splitArray;
}

function Home() {
    const [artist_name, setName] = useState('')
    const [ratings, setRatings] = useState({});
    const [reviewCount, setReviewCount] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const routeChange = (artist) => {
        navigate({
            pathname: '/artist',
            search: createSearchParams({
                artist: artist_name,
            }).toString()
        });
    };

    //gets the artist rating data from the database
    const performSearch = async () => {
        var starsResults = {};
        var ratingCount = {};
        var newRatings = {};
        var newCount = {};
        for (var i = 1; i <= Object.keys(artistList).length; i++) {
            newRatings[i] = 0;
            newCount[i] = 0;
        }
        var fetchReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/`, { mode: 'cors' });
        var reviewData = await fetchReviews.json();

        console.log(reviewData);
        reviewData.forEach((element) => {
            newRatings[element.artist_id] += element.rating;
            newCount[element.artist_id]++;
        });

        for (var i = 0; i < Object.keys(artistList).length; i++) {
            var artistNameList = Object.keys(artistList);
            var artistName = artistNameList[i];
            var artistID = artistList[artistName].artistID;
            starsResults[artistName] = (newRatings[artistID] / newCount[artistID]);
            ratingCount[artistName] = newCount[artistID];
        }

        setRatings(() => {
            return starsResults
        });
        setReviewCount(() => {
            return ratingCount
        })
        setLoading(false);
    }

    function generateRow(rowItems) {
        var row = [];
        rowItems.map((artist) => {
            row.push(<HomePageArtist artist={artist} rating={ratings[artist]} loading={loading} reviewCount={reviewCount[artist]}></HomePageArtist>);
        })
        return row;
    }

    //performs the search when the page loads
    useEffect(() => {
        performSearch();
    }, [artistRows]);
    var artistRows = splitArtistsToRows(Object.keys(artistList), 3);

    // const handlePressImage = async () => {
    //     const adeleImages = "https://townsquare.media/site/252/files/2012/02/Adele21.jpg?w=980&q=75	https://pyxis.nymag.com/v1/imgs/9f4/bcd/752bddb078656e93f6f590d53442689cc6-20-ade-le.2x.rhorizontal.w710.jpg https://people.com/thmb/h8IivmPsbBoHJcZm3RGxJymS4jY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(1039x239:1041x241)/Adele_1-2000-051132e13ab7482eb9d0c8ae21975fcc.jpg"
    //     const andreaImages = "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/HotV8mEKAKncBNnnK2BxEnrCbKo=/1660x934/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/FMMGAFNIP5A3RJL6RGWEQCWDBU.jpg https://img.jakpost.net/c/2020/04/08/2020_04_08_92184_1586313211._large.jpg https://s2.glbimg.com/JiOpVymrjSkMLrUoYNKe-jKrQEYg=/0x0:3000x2000/924x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2016/10/13/bocelli.jpg"
    //     const billieImages = "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/FPEPN7RJ4RMHXCJLKKDHHMGKYE.jpg https://www.rollingstone.com/wp-content/uploads/2019/11/billie-eilish.jpg https://www.rollingstone.com/wp-content/uploads/2021/09/GettyImages-1341198883.jpg"
    //     const chainImages = "https://cdn.postindependent.com/wp-content/uploads/sites/6/2018/06/bellyup-atd-070118-3.jpg,https://news.djcity.com/wp-content/uploads/2018/02/chainsmokers-600-2-1.jpg,https://media.lasvegasweekly.com/img/photos/2016/09/14/Chainsmokers-now.jpg https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/27/Style/Images/thechainsmokers0526_rz_04.jpg https://nypost.com/wp-content/uploads/sites/2/2020/07/GettyImages-1258940494.jpg?quality=75&strip=all&w=878"
    //     const gravyImages = "https://www.hawkherald.com/wp-content/uploads/sites/4/2019/10/015CF608-CECF-428B-8100-114E49710801.jpg,http://www.seattlemusicnews.com/wp-content/uploads/2019/03/190303-gravy-showbox-4.jpg https://www.hawkherald.com/wp-content/uploads/sites/4/2019/10/941431C3-74DB-4C97-985E-B24208C47621.jpg,http://www.seattlemusicnews.com/wp-content/uploads/2019/03/190303-gravy-showbox-9.jpg https://www.seattlemusicnews.com/wp-content/uploads/2019/03/190303-gravy-showbox-7.jpg"
    //     const billyJoelImages = "https://nypost.com/wp-content/uploads/sites/2/2022/10/Billy-Jo-el.jpg?quality=75&strip=all&w=744 https://imengine.public.prod.day.navigacloud.com/?uuid=C10F380D-6A18-47B8-89B7-E0EC7BC11585&type=preview&function=cover&height=609&width=800 https://nypost.com/wp-content/uploads/sites/2/2018/07/billy-joel2.jpg?quality=75&strip=all"
    //     const oldDominionImages = "https://people.com/thmb/buVFHv29BZaLKbeYZiqYFfNyvo0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/matthew_ramsey-1-2000-4fd1922c0b0845c5a2add3e9a4f44f58.jpg https://www.billboard.com/wp-content/uploads/media/king-of-leon-iheartradio-la-2017-billboard-1548.jpg	https://www.soundslikenashville.com/wp-content/uploads/2019/05/Old-Dominion-Matthew-Ramsey-1557156545.jpg"
    //     const postImages = "https://www.billboard.com/wp-content/uploads/2022/04/Post-Malone-lolla-2021-billboard-1548.jpg https://www.billboard.com/wp-content/uploads/2021/08/post-malone-lollapalooza-07312021-billboard-1548-1627828884.jpg	https://www.billboard.com/wp-content/uploads/2021/09/Post-Malone-lolla-2021-billboard-1548-1631812271.jpg?w=1024"
    //     const jackHarlowImages = "https://s.hdnux.com/photos/01/22/47/15/21656444/4/rawImage.jpg https://www.rollingstone.com/wp-content/uploads/2022/05/jack-harlow-tour.jpg?w=1581&h=1054&crop=1 https://assets.rebelmouse.io/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yOTc1MTA1NC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY5NjI1ODE5NX0.QMCpGjk9vhPwOmz9BQ9uF0yB-BfFCkdzsq_WvsK-PEM/img.jpg"
    //     const eltonJohnImages = "https://townsquare.media/site/295/files/2021/06/attachment-elton-john.jpeg	https://s3.amazonaws.com/sfc-datebook-wordpress/wp-content/uploads/sites/2/2021/04/MER2019012018451044_listen0425-1024x684.jpg https://images.dailyhive.com/20191113090959/eltonjohn_71192939_163066671446590_1045964659012242469_n-e1648572263874.jpg"
    //     const harryStylesImages = "https://media.glamour.com/photos/62470f3dd07b65b164122982/master/w_2560%2Cc_limit/931619330,https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/NPTQBFYTbgZoIII_z7CW7V9fZcE=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/IXYMDEXQ4XJDY2WW4BLV5PFM2A.jpg https://ca-times.brightspotcdn.com/dims4/default/d19541d/2147483647/strip/true/crop/6720x4480+0+0/resize/1200x800!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffd%2F25%2F04f59633444483abc91481e16c65%2F14122019-img-6171.jpg https://media.cnn.com/api/v1/images/stellar/prod/221007125250-harry-styles-0529-restricted.jpg?c=original"
    //     const dominicFikeImages = "https://www.allthingsloud.com/wp-content/uploads/2019/10/20191026_2115_Dominic-Fike10.jpg https://media1.popsugar-assets.com/files/thumbor/ZQwZxTHP70LkkihlShaYJHppI5o/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2022/03/01/937/n/1922153/047ed19a3587145d_DF_deer_tattoo/i/Dominic-Fike-Deer-Tattoo.jpg https://www.usmagazine.com/wp-content/uploads/2022/01/5-Things-Know-About-Euphoria-Season-2-Star-Dominic-Fike-006.jpg"
    //     const imagesToPush =
    //         [
    //             { artistID: 1, images: adeleImages.split("	") },
    //             { artistID: 2, images: andreaImages.split("	") },
    //             { artistID: 3, images: billieImages.split("	") },
    //             { artistID: 4, images: chainImages.split("	") },
    //             { artistID: 5, images: gravyImages.split("	") },
    //             { artistID: 6, images: billyJoelImages.split("	") },
    //             { artistID: 7, images: oldDominionImages.split("	") },
    //             { artistID: 8, images: postImages.split("	") },
    //             { artistID: 9, images: jackHarlowImages.split("	") },
    //             { artistID: 10, images: eltonJohnImages.split("	") },
    //             { artistID: 11, images: harryStylesImages.split("	") },
    //             { artistID: 12, images: dominicFikeImages.split("	") },
    //         ]

    //     // let { data: current_artist_carousel_images, error } = await supabase
    //     //     .from('artist_carousel_images')
    //     //     .select('*')


    //     let { data: current_artist_carousel_images, error } = await supabase
    //         .from('artist_carousel_images')
    //         .select('image_id')


    //     // after retrieving console.log it
    //     console.log(error)
    //     console.log(current_artist_carousel_images)

    //     const actuallyPushImages = false;
    //     if (actuallyPushImages) {
    //         imagesToPush.map(async (artist) => {
    //             let artistID = artist.artistID
    //             let artistImages = current_artist_carousel_images.filter((image) => image.artist_id === artistID)
    //             if (artistImages.length < 3) {

    //                 let images = artist.images
    //                 images.map(async (image) => {
    //                     let { data: new_artist_carousel_images, error } = await supabase
    //                         .from('artist_carousel_images')
    //                         .insert([
    //                             { artist_id: artistID, image_url: image }
    //                         ])
    //                     if (error) {
    //                         console.log(error)
    //                     } else {
    //                         console.log(new_artist_carousel_images)
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // };

    return (
        <>
            <Navigation />
            {/* <div onClick={handlePressImage} style={{ height: "100px", backgroundColor: "white", minWidth: "50px" }}>PUSH IMAGES</div> */}
            <div id="homepage">

                <div id="homeheader">
                    <img id="home-logo" src="images/logo.png" alt="" />
                    <div class="home-title">
                        Own your next live experience.
                    </div>
                    <div class="search row">
                        <SearchBar></SearchBar>
                        {/* <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button class="btn btn-dark" onClick={() => {alert('Feature coming soon! (see artists below)')}}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button> */}
                    </div>

                    {/* Mobile */}
                    <div class="d-block d-sm-none">
                        <div id="gallery" class="row">
                            <div class="col-12 col-sm-9 align-self-center">
                                <h4 class="fw-bold ">Recently Added Artists</h4>
                            </div>
                        </div>
                        {Object.keys(artistList).map((item) => {
                            return <MobileHomePageArtist artist={item} rating={ratings[item]} reviewCount={reviewCount[item]}></MobileHomePageArtist>
                        })
                        }
                    </div>

                    {/* Web */}
                    <div class="d-none d-sm-block">
                        <div id="gallery" class="row">
                            <div class="col-12 col-sm-9 align-self-center">
                                <h4 class="fw-bold ">Recently Added Artists</h4>
                            </div>
                        </div>
                        {
                            artistRows.map((item) => {
                                return (
                                    <div class="row mb-5">
                                        {generateRow(item)}
                                    </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;
