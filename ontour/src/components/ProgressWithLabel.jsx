import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material/styles/createTypography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#faaf00' : '#308fe8',
    },
}));
const ProgressWithLabel = ({ percent, color, leftLabel }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
            <Box sx={{ width: '90%' }}>
                <BorderLinearProgress variant="determinate" value={percent} />
            </Box>
            <Box sx={{ minWidth: 35, textAlign: "end" }}>
                {`${percent}%`}
            </Box>
        </Box>
    );
}

export default ProgressWithLabel;