import React from 'react';
import MediaQuery from 'react-responsive';
import { IconButton, Typography, Icon, Grid, Toolbar, Stack } from '@mui/material';
import { TFunction } from 'i18next';

import SendIcon from '@mui/icons-material/Send';
import { CO, MX, US } from 'country-flag-icons/react/3x2';

export default function ConversionBar({ translation }: { translation: TFunction }) {
    return <>
        <MediaQuery minWidth={1224}>
            <Toolbar variant='dense' sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
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

                    <Grid item>
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

                    <Grid item>
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
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
            <Toolbar variant='dense' sx={{ bgcolor: 'primary.main', color: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container direction="row"  paddingTop={1} paddingBottom={0.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item marginLeft={1}>
                            <Typography variant="body2">
                                USD 16.79
                            </Typography>
                        </Grid>

                        <Grid item marginX={1}>
                            <Icon>
                                <MX />
                            </Icon>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                            → USD 16.83
                            </Typography>
                        </Grid>

                        <Grid item marginX={1}>
                            <Icon>
                                <US />
                            </Icon>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" paddingBottom={1} paddingTop={0.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item marginLeft={1}>
                            <Typography variant="body2">
                                USD 3,870.55
                            </Typography>
                        </Grid>

                        <Grid item marginX={1}>
                            <Icon>
                                <CO />
                            </Icon>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                            → USD 3,909.45
                            </Typography>
                        </Grid>

                        <Grid item marginX={1}>
                            <Icon>
                                <US />
                            </Icon>
                        </Grid>
                    </Grid>
                </Stack>
            </Toolbar>
        </MediaQuery>
    </>
}