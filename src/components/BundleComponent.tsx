import { Grid, TextField } from '@mui/material'
import React from 'react'
import DialogBox from './DialogBox'
import toast from 'react-hot-toast'
import { addBundle, updateBundle } from 'src/pages/articleBundles/api'

const BundleComponent = ({
  setShow2,
  setTitle,
  show2,
  title,
  IPId,
  setIPId,
  setBundleData,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { Description } = formik.values
      const newBundleData = {
        Description
      }

      if (IPId) {
        const updatedBundle = await updateBundle(IPId, newBundleData)
        const updatedData = updatedBundle.data

        setBundleData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('Bundle updated successfully')
      } else {
        const addedBundle = await addBundle(newBundleData)
        setBundleData(prevData => [...prevData, addedBundle.data])

        toast.success('Bundle added successfully')
      }
      setShow2(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow2(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow2(false)
      setTitle('Add New Bundle')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow2(true)
    }
  }

  return (
    <DialogBox
      open={show2}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={12} xs={12}>
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
      </Grid>
    </DialogBox>
  )
}

export default BundleComponent
