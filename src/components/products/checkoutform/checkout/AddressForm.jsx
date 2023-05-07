import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core"
import { useForm, FormProvider } from "react-hook-form"
import FormInput from "./CustomTextField"
import { useState, useEffect } from "react"
import { commerce } from "../../../../lib/commerce"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

function AddressForm({checkoutToken, next}) {
    const methods = useForm()
    const [ shippingCountries, setShippingCountries ] = useState([]);
    const [ shippingCountry, setShippingCountry ] = useState("");
    const [ shippingSubdivisons, setShippingSubdivisions ] = useState([]);
    const [ shippingSubdivison, setShippingSubdivision ] = useState("");
    const [ shippingOptions, setShippingOptions ] = useState([]);
    const [ shippingOption, setShippingOption ] = useState("");


    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [checkoutToken?.id])

    useEffect(() => {
        //get all suvdivision according to country selected
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivison) fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivison)
    }, [shippingSubdivison, checkoutToken?.id, shippingCountry])

    
    //get all countries in id and label form to be iterated
    const countries = Object.entries(shippingCountries)?.map(([code, name]) => ({ id: code, label: name}))
    
    const subdivisions = Object.entries(shippingSubdivisons)?.map(([code, name]) => ({ id: code, label: name}))
    
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}`}))
    
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        console.log(countries)
        setShippingCountries(countries)
        //display first country fetch
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } =  await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }


    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region})
        setShippingOptions(options);
        setShippingOption(options[0].id)
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivison, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First name"/>
                        <FormInput name="lastName" label="Last name"/>
                        <FormInput name="address1" label="Address"/>
                        <FormInput name="email" label="Email"/>
                        <FormInput name="city" label="City"/>
                        <FormInput name="zip" label="Zip / Postal code"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {
                                    countries?.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivison</InputLabel>
                            <Select value={shippingSubdivison} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {
                                    subdivisions?.map((subdivison) => (
                                    <MenuItem key={subdivison.id} value={subdivison.id}>
                                        {subdivison.label}
                                    </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOptions(e.target.value)}>
                                {options?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                        <Button data-testid="checkBtn" color="primary" type="submit" variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

AddressForm.propTypes = {
    checkoutToken: PropTypes.object.isRequired,
    next: PropTypes.func
}

export default AddressForm