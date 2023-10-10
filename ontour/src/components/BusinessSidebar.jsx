import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

const BusinessSidebar = () => {
    return (
        <Box display="grid" gap={2} bgcolor="grey.200" p={2} boxShadow={3}>
            <h3>My Dashboard</h3>
            <Button color="primary" fullWidth component={Link} to="/fan-analytics" sx={{color: 'black'}}>Fan Analytics</Button>
            <Button color="primary" fullWidth component={Link} to="/reviews" sx={{color: 'black'}}>Reviews</Button>
            <Button color="primary" fullWidth component={Link} to="/tours" sx={{color: 'black'}}>Tours</Button>
            <Button color="primary" fullWidth component={Link} to="/account" sx={{color: 'black'}}>Account Settings</Button>
        </Box>
      );

    // return (
    //     <div style={{ padding: '16px', maxWidth: '240px', margin: 'auto' }}>
    //         <h1 style={{ marginBottom: '16px' }}>My Dashboard</h1>
    //         <Link to="/fan-analytics" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
    //             Fan Analytics
    //         </Link>
    //         <Link to="/reviews" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
    //             Reviews
    //         </Link>
    //         <Link to="/tours" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
    //             Tours
    //         </Link>
    //         <Link to="/account-settings" style={{ display: 'block', marginBottom: '12px', textDecoration: 'none', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
    //             Account Settings
    //         </Link>
    //     </div>
    // );
}

export default BusinessSidebar;