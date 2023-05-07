import { TextField, Grid } from "@material-ui/core"
import { useFormContext, Controller } from "react-hook-form"
import PropTypes from "prop-types"

function FormInput({name, label}) {
    const { control } = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
            as={TextField}
            control={control}
            fullWidth
            name={name}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
            <TextField
            label={label}
            variant="filled"
            value={value}
            onChange={onChange}
            required={true}
            />
        )}
        />
        </Grid>
    )
}

FormInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool
}

export default FormInput