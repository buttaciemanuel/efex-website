import React from 'react';
import { IconButton, Typography, Icon, Grid, Toolbar } from '@mui/material';
import { TFunction } from 'i18next';

import SendIcon from '@mui/icons-material/Send';
import { CO, MX, US } from 'country-flag-icons/react/3x2';

export default function ConversionBar({ translation }: { translation: TFunction }) {
    return <Toolbar sx={{ bgcolor: '#022f8e', color: 'white' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" padding={1}>
            <Grid item marginX={3}>
                <IconButton
                    color="inherit"
                    aria-label="send money"
                    sx={{ marginLeft: '1em' }}
                >
                    <SendIcon />
                </IconButton>
            </Grid>
            
            <Grid item marginLeft={1}>
                <Typography variant="body1">
                    USD 16.79
                </Typography>
            </Grid>

            <Grid item marginX={1}>
                <Icon>
                    <MX />
                </Icon>
            </Grid>

            <Grid item marginLeft={1}>
                <Typography variant="body1">
                    {translation('correspondTo')} USD 16.83
                </Typography>
            </Grid>

            <Grid item marginX={1}>
                <Icon>
                    <US />
                </Icon>
            </Grid>

            <Grid item marginX={3}>
                <Typography variant="body1">
                    |
                </Typography>
            </Grid>

            <Grid item marginLeft={1}>
                <Typography variant="body1">
                    USD 3,870.55
                </Typography>
            </Grid>

            <Grid item marginX={1}>
                <Icon>
                    <CO />
                </Icon>
            </Grid>

            <Grid item marginLeft={1}>
                <Typography variant="body1">
                    {translation('correspondTo')} USD 3,909.45
                </Typography>
            </Grid>

            <Grid item marginX={1}>
                <Icon>
                    <US />
                </Icon>
            </Grid>
        </Grid>
        </Toolbar>
}