import React from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField
} from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addRate, updateRate } from 'src/pages/editor/api'

const RateComponent = ({
  setShow6,
  setTitle,
  show6,
  title,
  IPId,
  setIPId,
  setRateData,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { Rate, Description, Nature, Default } = formik.values
      const newPartnerData = {
        Rate,
        Description,
        Nature,
        Default
      }

      if (IPId) {
        const updatedRate = await updateRate(IPId, newPartnerData)
        const updatedData = updatedRate.data
        setRateData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('Rate updated successfully')
      } else {
        const addedPartner = await addRate(newPartnerData)
        setRateData(prevData => [...prevData, addedPartner.data])

        toast.success('Rate added successfully')
      }
      setShow6(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow6(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow6(false)
      setTitle('Add New Rate')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow6(true)
    }
  }

  return (
    <DialogBox
      open={show6}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Rate %'
            name='Rate'
            id='Rate'
            value={formik.values.Rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Rate && Boolean(formik.errors.Rate)}
            helperText={formik.touched.Rate && formik.errors.Rate}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Description'
            name='Description'
            id='Description'
            value={formik.values.Description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Description && Boolean(formik.errors.Description)}
            helperText={formik.touched.Description && formik.errors.Description}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Nature'
            name='Nature'
            id='Nature'
            value={formik.values.Nature}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Nature && Boolean(formik.errors.Nature)}
            helperText={formik.touched.Nature && formik.errors.Nature}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormGroup row>
            <FormControlLabel
              label='Default rate?'
              control={
                <Checkbox
                  name='Default'
                  id='Default'
                  checked={formik.values.Default}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
            />
          </FormGroup>
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default RateComponent
