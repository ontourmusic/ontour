import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

const BusinessSidebar = () => {
    // return (
    //     <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col">
    //       <div className="font-bold text-xl mb-4">My Dashboard</div>
    //       <Link href="/fan-analytics">
    //         <a className="text-blue-600 hover:text-blue-800 mb-2 cursor-pointer">Fan Analytics</a>
    //       </Link>
    //       <Link href="/reviews">
    //         <a className="text-blue-600 hover:text-blue-800 mb-2 cursor-pointer">Reviews</a>
    //       </Link>
    //       <Link href="/tours">
    //         <a className="text-blue-600 hover:text-blue-800 mb-2 cursor-pointer">Tours</a>
    //       </Link>
    //       <Link href="/account-settings">
    //         <a className="text-blue-600 hover:text-blue-800 mb-2 cursor-pointer">Account Settings</a>
    //       </Link>
    //     </div>
    // );

    return (
        <div style={{ padding: '16px', maxWidth: '240px', margin: 'auto' }}>
            <h1 style={{ marginBottom: '16px' }}>My Dashboard</h1>
            <Link to="/fan-analytics" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                Fan Analytics
            </Link>
            <Link to="/reviews" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                Reviews
            </Link>
            <Link to="/tours" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                Tours
            </Link>
            <Link to="/account-settings" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                Account Settings
            </Link>
        </div>
    );
}

export default BusinessSidebar;