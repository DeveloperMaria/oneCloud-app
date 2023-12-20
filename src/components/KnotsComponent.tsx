import { Grid, TextField } from '@mui/material'
import React from 'react'
import DialogBox from './DialogBox'
import toast from 'react-hot-toast'
import { addKnots, updateknots } from 'src/pages/ipManagement/api'

const KnotsComponent = ({
  setShow4,
  setTitle,
  show4,
  title,
  IPId,
  setIPId,
  setKnots,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {

     const {
        firstName,
        address
      }= formik.values
      const newPartnerData = {
        firstName,
        address
      }

      if (IPId) {
        const updatedKnots = await updateknots(IPId, newPartnerData)
        const updatedData = updatedKnots.data

        setKnots(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('knots updated successfully')
      } else {
        const addedPartner = await addKnots(newPartnerData)
        setKnots(prevData => [...prevData, addedPartner.data])

        toast.success('knots added successfully')
      }
      setShow4(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow4(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow4(false)
      setTitle('Add New knots')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow4(true)
    }
  }
  return (
    <DialogBox
      open={show4}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Node Name'
            name='firstName'
            id='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Address'
            name='address'
            id='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default KnotsComponent
