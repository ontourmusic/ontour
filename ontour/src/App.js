import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Venue from "./pages/Venue";
import { CssBaseline, ThemeProvider } from "@mui/material";
import OnTourTheme from "./Styles/OnTourTheme";
import SearchResults from "./pages/SearchResults";
import Festival from "./pages/Festival";
import AccountSettings from "./pages/AccountSettings";
import ProfilePage from "./pages/ProfilePage";
import FanAnalytics from "./pages/FanAnalytics";
import Tours from "./pages/Tours";
import ManageReviews from "./pages/ManageReviews";
import mixpanel from "mixpanel-browser";
import { mixPanelId } from "./constants/constants";
import ManageEvents from "./pages/ManageEvents";
import { useAuth0 } from "@auth0/auth0-react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />}>
//       <Route path="dashboard" element={<Dashboard />} />
//       {/* ... etc. */}
//     </Route>
//   )
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/artist?",
//         element: <Artist />,
//       },
//     ],
//   },
//   // {
//   //   path: "/artist?:params",
//   //   element: <Artist />,
//   //   errorElement: <Artist />,
//   // },
//   // {
//   //   path: "/results",
//   //   element: <Results />,
//   //   errorElement: <Error />,
//   // },
//   // {
//   //   path: "/venue",
//   //   element: <Venue />,
//   //   errorElement: <Error />,
//   // },
// ]);


function App() {
  mixpanel.init(mixPanelId, {debug: true, track_pageview: true, persistence: 'localStorage'});
  const {user,isAuthenticated} = useAuth0(); 
  return (

    // <MixpanelProvider config={MIXPANEL_CONFIG} token={MIXPANEL_TOKEN}>
    <ThemeProvider theme={OnTourTheme}>
     {/* <button onClick={btnClick}>abc</button> */}
      <div className="App">
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/fan-analytics" element={<FanAnalytics />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/manage-reviews" element={<ManageReviews/>} />
            {/* <Route path="/admin/manageevents" element={!user ? <>You are not authorised to access this route</> :<ManageEvents />} /> */}
            <Route path="/adminmanageevents" element={<ManageEvents />} />
            <Route path="*" element={<>Page not found</>}/>
          </Routes>
        </Router>
        {/* <RouterProvider router={router} /> */}
      </div>
      {/* </MixpanelProvider> */}
    </ThemeProvider>
    // </MixpanelProvider>
  );
}

export default App;
