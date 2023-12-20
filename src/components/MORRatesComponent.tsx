import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addMorRates, updateMorRates } from 'src/pages/editor/api'

const MORRatesComponent = ({ setShow3, setTitle, show3, title, IPId, setIPId, setMORRateData, formik }) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const {
        BackendDescription,
        Descriptioninvoice,
        MORID,
        Service,
        CommunicationCode,
        Isnap,
        ITfixed,
        ITfurniture,
        FixedEU,
        EUfurniture,
        FixedWorld,
        WorldFurniture
      } = formik.values

      const newPartnerData = {
        BackendDescription,
        Descriptioninvoice,
        MORID,
        Service,
        CommunicationCode,
        Isnap,
        ITfixed,
        ITfurniture,
        FixedEU,
        EUfurniture,
        FixedWorld,
        WorldFurniture
      }

      if (IPId) {
        const updatedMorRates = await updateMorRates(IPId, newPartnerData)
        const updatedData = updatedMorRates.data

        setMORRateData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('MorRates updated successfully')
      } else {
        const addedPartner = await addMorRates(newPartnerData)
        setMORRateData(prevData => [...prevData, addedPartner.data])

        toast.success('MorRates added successfully')
      }
      setShow3(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow3(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow3(false)
      setTitle('Add New MorRates')
    }
  }

  const handleButtonClick = () => {
    if (!IPId) {
      setShow3(true)
    }
  }

  return (
    <DialogBox
      open={show3}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='MOR ID'
            type='number'
            name='MORID'
            id='MORID'
            value={formik.values.MORID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.MORID && Boolean(formik.errors.MORID)}
            helperText={formik.touched.MORID && formik.errors.MORID}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='service-select'>Service</InputLabel>
            <Select
              fullWidth
              label='Service'
              name='Service'
              id='Service'
              value={formik.values.Service}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Service && Boolean(formik.errors.Service)}
              labelId='service-select'
            >
              <MenuItem value='ADSL'>ADSL</MenuItem>
              <MenuItem value='FIBER'>FIBER</MenuItem>
              <MenuItem value='WIFI'>WIFI</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Backend Description'
            name='BackendDescription'
            id='BackendDescription'
            value={formik.values.BackendDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.BackendDescription && Boolean(formik.errors.BackendDescription)}
            helperText={formik.touched.BackendDescription && formik.errors.BackendDescription}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Description on the invoice'
            name='Descriptioninvoice'
            id='Descriptioninvoice'
            value={formik.values.Descriptioninvoice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Descriptioninvoice && Boolean(formik.errors.Descriptioninvoice)}
            helperText={formik.touched.Descriptioninvoice && formik.errors.Descriptioninvoice}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='communication-select'>Communication Code</InputLabel>
            <Select
              fullWidth
              label='Communication Code'
              name='CommunicationCode'
              id='CommunicationCode'
              value={formik.values.CommunicationCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.CommunicationCode && Boolean(formik.errors.CommunicationCode)}
              labelId='communication-select'
            >
              <MenuItem value='-----'>----</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='I snap'
            type='number'
            name='Isnap'
            id='Isnap'
            value={formik.values.Isnap}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Isnap && Boolean(formik.errors.Isnap)}
            helperText={formik.touched.Isnap && formik.errors.Isnap}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='IT fixed'
            type='number'
            name='ITfixed'
            id='ITfixed'
            value={formik.values.ITfixed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ITfixed && Boolean(formik.errors.ITfixed)}
            helperText={formik.touched.ITfixed && formik.errors.ITfixed}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='IT furniture'
            type='number'
            name='ITfurniture'
            id='ITfurniture'
            value={formik.values.ITfurniture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ITfurniture && Boolean(formik.errors.ITfurniture)}
            helperText={formik.touched.ITfurniture && formik.errors.ITfurniture}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Fixed EU'
            type='number'
            name='FixedEU'
            id='FixedEU'
            value={formik.values.FixedEU}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.FixedEU && Boolean(formik.errors.FixedEU)}
            helperText={formik.touched.FixedEU && formik.errors.FixedEU}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='EU furniture'
            type='number'
            name='EUfurniture'
            id='EUfurniture'
            value={formik.values.EUfurniture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.EUfurniture && Boolean(formik.errors.EUfurniture)}
            helperText={formik.touched.EUfurniture && formik.errors.EUfurniture}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Fixed World'
            type='number'
            name='FixedWorld'
            id='FixedWorld'
            value={formik.values.FixedWorld}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.FixedWorld && Boolean(formik.errors.FixedWorld)}
            helperText={formik.touched.FixedWorld && formik.errors.FixedWorld}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='World Furniture'
            type='number'
            name='WorldFurniture'
            id='WorldFurniture'
            value={formik.values.WorldFurniture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.WorldFurniture && Boolean(formik.errors.WorldFurniture)}
            helperText={formik.touched.WorldFurniture && formik.errors.WorldFurniture}
          />
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default MORRatesComponent
