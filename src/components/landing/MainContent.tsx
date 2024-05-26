import React from 'react';
import MediaQuery from 'react-responsive';
import { TFunction } from 'i18next';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Card, TextField, InputAdornment, MenuItem, Icon, IconButton } from '@mui/material';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import { US, MX, CO } from 'country-flag-icons/react/3x2'

const serviceOptions = ['logistics', 'ecommerce', 'exports', 'imports', 'fintech'];
const countriesOptions = [
    { value: 'USA', label: 'USD' },
    { value: 'Mexico', label: 'MXN' },
    { value: 'Colombia', label: 'COP' },
];
const currenciesOptions = [
    { id: 'USD', icon: US, currency: 'USD' },
    { id: 'MXN', icon: MX, currency: 'MXN' },
    { id: 'COP', icon: CO, currency: 'COP' },
]

interface ExchangeRates {
    USD: undefined | number;
    MXN: undefined | number;
    COP: undefined | number
}

interface ExchangeRatesMap {
    USD: ExchangeRates;
    MXN: ExchangeRates;
    COP: ExchangeRates;
}

const exchangeRatesInitialization: ExchangeRatesMap = {
    USD: { USD: 1, MXN: undefined, COP: undefined },
    MXN: { USD: undefined, MXN: 1, COP: undefined },
    COP: { USD: undefined, MXN: undefined, COP: 1 }
};

export default function MainContent({ translation }: { translation: TFunction }) {
    const getRates = async () => {
        const currencyPairs = [['USD', 'MXN'], ['USD', 'COP'], ['MXN', 'COP']]

        currencyPairs.forEach(async (pair) => {
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/61ffb1b3c4a049e69a4060e2/pair/${pair[0]}/${pair[1]}`
            ).then((response) => response.json());

            if (response.result === "success") {
                var ratesCopy = Object.assign({}, rates);
                ratesCopy[pair[0] as keyof ExchangeRatesMap][pair[1] as keyof ExchangeRates] = response.conversion_rate;
                ratesCopy[pair[1] as keyof ExchangeRatesMap][pair[0] as keyof ExchangeRates] = 1 / response.conversion_rate;
                setRates(ratesCopy);
            }
        });
    };

    useEffect(() => {
        getRates();
    }, []);

    const timeoutRoutine: TimerHandler = () => {
        if (serviceItem === serviceOptions.length - 1) {
            setServiceItem(0);
        }
        else {
            setServiceItem(serviceItem + 1);
        }
    };

    setTimeout(timeoutRoutine, 500);

    const [serviceItem, setServiceItem] = useState(0);
    const [sendCurrency, setSendCurrency] = useState(countriesOptions[0].label);
    const [receiveCurrency, setReceiveCurrency] = useState(countriesOptions[1].label);
    const [sendValue, setSendValue] = useState("0");
    const [receiveValue, setReceiveValue] = useState("0");
    const [rates, setRates] = useState(exchangeRatesInitialization);

    const swapCurrencies = () => {
        const sendCurrencyCopy = sendCurrency;
        const sendValueCopy = sendValue;

        setSendCurrency(receiveCurrency);
        setSendValue(receiveValue);

        setReceiveCurrency(sendCurrencyCopy);
        setReceiveValue(sendValueCopy);
    }

    return <>
        <MediaQuery minWidth={1224}>
            <Box paddingTop="15vh">
                <Grid container direction="row" justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={3} marginX={4}>
                        <Typography variant="h4" color="white" fontWeight="900">
                            {translation("mainTitle")}
                        </Typography>

                        <Typography variant="h4" color="#022f8e" fontWeight="900" marginTop={4}>
                            {translation(serviceOptions[serviceItem])}
                        </Typography>

                        <Typography variant="body1" color="white" fontWeight="light" marginTop={4}>
                            {translation("subTitle")}
                        </Typography>

                        <Grid container direction="row" justifyContent="start" alignItems="center" height="100%" marginTop={4}>
                            <Grid item xs={6}>
                                <Button variant="contained" disableElevation
                                    sx={{
                                        boxShadow: 'none',
                                        borderRadius: '20px',
                                        '&:hover': {
                                            boxShadow: 'none',
                                            bgcolor: '#003761'
                                        },
                                        bgcolor: '#022f8e'
                                    }}>
                                    {translation("openAccount")}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" disableElevation color="primary" sx={{
                                    boxShadow: 'none',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        borderColor: '#003761',
                                        color: '#003761',
                                    },
                                    borderColor: '#022f8e',
                                    color: '#022f8e',
                                }}>
                                    {translation("scheduleDemo")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item marginX={4}>
                        <Card elevation={5} sx={{ backgroundColor: '#022f8e', paddingX: '30pt', paddingTop: '30pt', paddingBottom: '35pt', borderRadius: '10pt' }}>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Grid>
                                    <Grid item paddingBottom={1}>
                                        <Typography variant='body1' color='white'>{translation("youSend")}</Typography>
                                    </Grid>
                                    <Grid item paddingBottom={5}>
                                        <TextField
                                            id="outlined-basic"
                                            label="You send"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{
                                                style: { borderRadius: '5pt' },
                                                startAdornment: <InputAdornment position="start"><Typography color='black'>$</Typography></InputAdornment>
                                            }}
                                            InputLabelProps={{ shrink: false }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white'
                                                },
                                                "& .MuiInputLabel-root": { display: "none" }
                                            }}
                                            onChange={(e) => {
                                                setSendValue(e.target.value);

                                                if (e.target.value === '') {
                                                    setReceiveValue("0");
                                                    return;
                                                }

                                                const parsed = parseFloat(e.target.value)
                                                const sendCurrencyKey = sendCurrency as keyof ExchangeRatesMap;
                                                const receiveCurrencyKey = receiveCurrency as keyof ExchangeRates;
                                                const rate = rates[sendCurrencyKey][receiveCurrencyKey];

                                                if (!isNaN(parsed) && rate !== undefined) {
                                                    setReceiveValue((rate * parsed).toFixed(3));
                                                }
                                            }}
                                            value={sendValue}
                                        />
                                        <TextField
                                            id="you-send-currency"
                                            select
                                            label="Currency"
                                            defaultValue={currenciesOptions[0].currency}
                                            SelectProps={{
                                                native: false,
                                            }}
                                            InputProps={{
                                                style: { borderRadius: '5pt' },
                                            }}
                                            InputLabelProps={{ shrink: false }}
                                            sx={{
                                                marginLeft: '1em',
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white'
                                                },
                                                "& .MuiInputLabel-root": { display: "none" },
                                                width: '7.5em'
                                            }}
                                            onChange={(e) => {
                                                setSendCurrency(e.target.value);
                                                setSendValue("0");
                                                setReceiveValue("0");
                                            }}
                                            value={sendCurrency}
                                        >
                                            {currenciesOptions.map((option) => (
                                                <MenuItem disabled={option.currency === sendCurrency || option.currency === receiveCurrency} key={`send-option-${option.id}`} value={option.currency}>
                                                    <Box>
                                                        <Grid container direction='row'>
                                                            <Icon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '5pt' }}><option.icon /></Icon>
                                                            {option.currency}
                                                        </Grid>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container direction='row' marginTop={1} marginBottom={2} justifyContent='center'>
                                    <Button variant="contained" startIcon={<SwapVertIcon />} color='primary' onClick={swapCurrencies} sx={{
                                        boxShadow: 'none',
                                        borderRadius: '20px',
                                        '&:hover': {
                                            boxShadow: 'none',
                                        }
                                    }}>
                                        Swap
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Grid item paddingBottom={1}>
                                        <Typography variant='body1' color='white'>{translation("youReceive")}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-basic"
                                            label="You receive"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{
                                                style: { borderRadius: '5pt' },
                                                startAdornment: <InputAdornment position="start"><Typography color='black'>$</Typography></InputAdornment>
                                            }}
                                            InputLabelProps={{ shrink: false }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white'
                                                },
                                                "& .MuiInputLabel-root": { display: "none" }
                                            }}
                                            onChange={(e) => {
                                                setReceiveValue(e.target.value);

                                                if (e.target.value === '') {
                                                    setSendValue("0");
                                                    return;
                                                }

                                                const parsed = parseFloat(e.target.value)
                                                const sendCurrencyKey = sendCurrency as keyof ExchangeRates;
                                                const receiveCurrencyKey = receiveCurrency as keyof ExchangeRatesMap;
                                                const rate = rates[receiveCurrencyKey][sendCurrencyKey];

                                                if (!isNaN(parsed) && rate !== undefined) {
                                                    setSendValue((rate * parsed).toFixed(3));
                                                }
                                            }}
                                            value={receiveValue}
                                        />
                                        <TextField
                                            id="you-receive-currency"
                                            select
                                            label="Currency"
                                            defaultValue={countriesOptions[1].label}
                                            SelectProps={{
                                                native: false,
                                            }}
                                            InputProps={{ style: { borderRadius: '5pt' } }}
                                            InputLabelProps={{ shrink: false }}
                                            sx={{
                                                marginLeft: '1em',
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white'
                                                },
                                                "& .MuiInputLabel-root": { display: "none" },
                                                width: '7.5em'
                                            }}
                                            onChange={(e) => {
                                                setReceiveCurrency(e.target.value);
                                                setSendValue("0");
                                                setReceiveValue("0");
                                            }}
                                            value={receiveCurrency}
                                        >
                                            {currenciesOptions.map((option) => (
                                                <MenuItem disabled={option.currency === sendCurrency || option.currency === receiveCurrency} key={`receive-option-${option.id}`} value={option.currency}>
                                                    <Box>
                                                        <Grid container direction='row'>
                                                            <Icon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '5pt' }}><option.icon /></Icon>
                                                            {option.currency}
                                                        </Grid>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
            <Box paddingTop="10vh" paddingX='10vw' sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid item>
                    <Typography variant="h4" color="white" fontWeight="900">
                        {translation("mainTitle")}
                    </Typography>

                    <Typography variant="h4" color="#022f8e" fontWeight="900" marginTop={4}>
                        {translation(serviceOptions[serviceItem])}
                    </Typography>

                    <Typography variant="body1" color="white" fontWeight="light" marginTop={4}>
                        {translation("subTitle")}
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" alignContent="center" height="100%" marginTop={4}>
                    <Grid item>
                        <Button size='small' variant="contained" disableElevation
                            sx={{
                                boxShadow: 'none',
                                borderRadius: '20px',
                                '&:hover': {
                                    boxShadow: 'none',
                                    bgcolor: '#003761'
                                },
                                bgcolor: '#022f8e'
                            }}>
                            {translation("openAccount")}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button size='small' variant="outlined" disableElevation color="primary" sx={{
                            boxShadow: 'none',
                            borderRadius: '20px',
                            '&:hover': {
                                boxShadow: 'none',
                                borderColor: '#003761',
                                color: '#003761',
                            },
                            borderColor: '#022f8e',
                            color: '#022f8e',
                        }}>
                            {translation("scheduleDemo")}
                        </Button>
                    </Grid>
                </Grid>

                <Grid item marginTop={5}>
                    <Card elevation={5} sx={{ backgroundColor: '#022f8e', paddingX: '30pt', paddingTop: '30pt', paddingBottom: '35pt', borderRadius: '10pt' }}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid>
                                <Grid item paddingBottom={1}>
                                    <Typography variant='body2' color='white'>{translation("youSend")}</Typography>
                                </Grid>
                                <Grid item paddingBottom={5}>
                                    <TextField
                                        id="outlined-basic"
                                        size='small'
                                        label="You send"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            style: { borderRadius: '5pt' },
                                            startAdornment: <InputAdornment position="start"><Typography color='black'>$</Typography></InputAdornment>
                                        }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white'
                                            },
                                            "& .MuiInputLabel-root": { display: "none" },
                                            width: '25vw'
                                        }}
                                        onChange={(e) => {
                                            setSendValue(e.target.value);

                                            if (e.target.value === '') {
                                                setReceiveValue("0");
                                                return;
                                            }

                                            const parsed = parseFloat(e.target.value)
                                            const sendCurrencyKey = sendCurrency as keyof ExchangeRatesMap;
                                            const receiveCurrencyKey = receiveCurrency as keyof ExchangeRates;
                                            const rate = rates[sendCurrencyKey][receiveCurrencyKey];

                                            if (!isNaN(parsed) && rate !== undefined) {
                                                setReceiveValue((rate * parsed).toFixed(3));
                                            }
                                        }}
                                        value={sendValue}
                                    />
                                    <TextField
                                        id="you-send-currency"
                                        size='small'
                                        select
                                        label="Currency"
                                        defaultValue={countriesOptions[0].label}
                                        SelectProps={{
                                            native: false,
                                        }}
                                        InputProps={{ style: { borderRadius: '5pt' } }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={{
                                            marginLeft: '1em',
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white'
                                            },
                                            "& .MuiInputLabel-root": { display: "none" },
                                            width: '30vw'
                                        }}
                                        onChange={(e) => {
                                            setSendCurrency(e.target.value);
                                            setSendValue("0");
                                            setReceiveValue("0");
                                        }}
                                        value={sendCurrency}
                                    >
                                        {currenciesOptions.map((option) => (
                                            <MenuItem disabled={option.currency === sendCurrency || option.currency === receiveCurrency} key={`send-option-${option.id}`} value={option.currency}>
                                                <Box>
                                                    <Grid container direction='row'>
                                                        <Icon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '5pt' }}><option.icon /></Icon>
                                                        {option.currency}
                                                    </Grid>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container direction='row' marginTop={1} marginBottom={2} justifyContent='center'>
                                    <Button size='small' variant="contained" startIcon={<SwapVertIcon />} color='primary' onClick={swapCurrencies} sx={{
                                        boxShadow: 'none',
                                        borderRadius: '20px',
                                        '&:hover': {
                                            boxShadow: 'none',
                                        }
                                    }}>
                                        Swap
                                    </Button>
                                </Grid>
                            <Grid>
                                <Grid item paddingBottom={1}>
                                    <Typography variant='body2' color='white'>{translation("youReceive")}</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        size='small'
                                        label="You receive"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            style: { borderRadius: '5pt' },
                                            startAdornment: <InputAdornment position="start"><Typography color='black'>$</Typography></InputAdornment>
                                        }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white'
                                            },
                                            "& .MuiInputLabel-root": { display: "none" },
                                            width: '25vw'
                                        }}
                                        onChange={(e) => {
                                            setReceiveValue(e.target.value);

                                            if (e.target.value === '') {
                                                setSendValue("0");
                                                return;
                                            }

                                            const parsed = parseFloat(e.target.value)
                                            const sendCurrencyKey = sendCurrency as keyof ExchangeRates;
                                            const receiveCurrencyKey = receiveCurrency as keyof ExchangeRatesMap;
                                            const rate = rates[receiveCurrencyKey][sendCurrencyKey];

                                            if (!isNaN(parsed) && rate !== undefined) {
                                                setSendValue((rate * parsed).toFixed(3));
                                            }
                                        }}
                                        value={receiveValue}
                                    />
                                    <TextField
                                        id="you-receive-currency"
                                        size='small'
                                        select
                                        label="Currency"
                                        defaultValue={countriesOptions[1].label}
                                        SelectProps={{
                                            native: false,
                                        }}
                                        InputProps={{ style: { borderRadius: '5pt' } }}
                                        InputLabelProps={{ shrink: false }}
                                        sx={{
                                            marginLeft: '1em',
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white'
                                            },
                                            "& .MuiInputLabel-root": { display: "none" },
                                            width: '30vw'
                                        }}
                                        onChange={(e) => {
                                            setReceiveCurrency(e.target.value);
                                            setSendValue("0");
                                            setReceiveValue("0");
                                        }}
                                        value={receiveCurrency}
                                    >
                                        {currenciesOptions.map((option) => (
                                            <MenuItem disabled={option.currency === sendCurrency || option.currency === receiveCurrency} key={`receive-option-${option.id}`} value={option.currency}>
                                                <Box>
                                                    <Grid container direction='row'>
                                                        <Icon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '5pt' }}><option.icon /></Icon>
                                                        {option.currency}
                                                    </Grid>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Box>
        </MediaQuery >
    </>
}