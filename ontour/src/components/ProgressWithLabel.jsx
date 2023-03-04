import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import { Typography } from '@mui/material/styles/createTypography';

const ProgressWithLabel = ({ percent }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', marginRight: "1" }}>
                <LinearProgress variant="determinate" value={percent} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                {/* <Typography variant="body2" color="text.secondary">  */}
                    {`${percent}%`}
                {/* </Typography> */}
            </Box>
        </Box>
    );
}

export default ProgressWithLabel;