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
}

export default BusinessSidebar;