import React, { useEffect } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addEditorProfile, updateEditorProfile } from 'src/pages/editor/api'

const ProfileComponent = ({
  setTitle,
  show2,
  title,
  setProfileData,
  setShow2,
  IPId,
  setIPId,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const {
        BackendDescription,
        Descriptioninvoice,
        Service,
        Type,
        LineTechnicalProfile,
        BandPeakDown,
        BandaPiccoUP,
        PriceMonthly,
        RadiusServiceId,
        CommunicationCode,
        Partner,
        Business,
        active
      } = formik.values
      const newPartnerData = {
        BackendDescription,
        Descriptioninvoice,
        Service,
        Type,
        LineTechnicalProfile,
        BandPeakDown,
        BandaPiccoUP,
        PriceMonthly,
        RadiusServiceId,
        CommunicationCode,
        Partner,
        Business,
        active
      }

      if (IPId) {
        const updatedProfile = await updateEditorProfile(IPId, newPartnerData)
        const updatedData = updatedProfile.data

        setProfileData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('Profile updated successfully')
      } else {
        const addedPartner = await addEditorProfile(newPartnerData)
        setProfileData(prevData => [...prevData, addedPartner.data])

        toast.success('Profile added successfully')
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
      setTitle('Add New profile')
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
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Descr. Backends'
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
            label='Descr. Invoice'
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
          <FormControl fullWidth>
            <InputLabel id='type-select'>Type</InputLabel>
            <Select
              fullWidth
              label='Type'
              name='Type'
              id='Type'
              value={formik.values.Type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Type && Boolean(formik.errors.Type)}
              labelId='type-select'
            >
              <MenuItem value='PPPOE'>PPPOE</MenuItem>
              <MenuItem value='Radius'>Radius</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='LineTechnicalProfile'
            name='LineTechnicalProfile'
            id='LineTechnicalProfile'
            value={formik.values.LineTechnicalProfile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.LineTechnicalProfile && Boolean(formik.errors.LineTechnicalProfile)}
            helperText={formik.touched.LineTechnicalProfile && formik.errors.LineTechnicalProfile}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Down band'
            name='BandPeakDown'
            id='BandPeakDown'
            value={formik.values.BandPeakDown}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.BandPeakDown && Boolean(formik.errors.BandPeakDown)}
            helperText={formik.touched.BandPeakDown && formik.errors.BandPeakDown}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Band Up'
            name='BandaPiccoUP'
            id='BandaPiccoUP'
            value={formik.values.BandaPiccoUP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.BandaPiccoUP && Boolean(formik.errors.BandaPiccoUP)}
            helperText={formik.touched.BandaPiccoUP && formik.errors.BandaPiccoUP}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Price'
            name='PriceMonthly'
            id='PriceMonthly'
            value={formik.values.PriceMonthly}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.PriceMonthly && Boolean(formik.errors.PriceMonthly)}
            helperText={formik.touched.PriceMonthly && formik.errors.PriceMonthly}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Id Radius'
            name='RadiusServiceId'
            id='RadiusServiceId'
            value={formik.values.RadiusServiceId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.RadiusServiceId && Boolean(formik.errors.RadiusServiceId)}
            helperText={formik.touched.RadiusServiceId && formik.errors.RadiusServiceId}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Communication Code'
            name='CommunicationCode'
            id='CommunicationCode'
            value={formik.values.CommunicationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.CommunicationCode && Boolean(formik.errors.CommunicationCode)}
            helperText={formik.touched.CommunicationCode && formik.errors.CommunicationCode}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='partner-select'>Partner</InputLabel>
            <Select
              fullWidth
              label='Partner'
              name='Partner'
              id='Partner'
              value={formik.values.Partner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Partner && Boolean(formik.errors.Partner)}
              labelId='partner-select'
            >
              <MenuItem value='CRM_ADMIN'>CRM_ADMIN</MenuItem>
              <MenuItem value='Example'>Example</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormGroup row>
            <FormControlLabel
              label='Business'
              control={
                <Checkbox
                  name='Business'
                  id='Business'
                  checked={formik.values.Business}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
            />
          </FormGroup>
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormGroup row>
            <FormControlLabel
              label='Active'
              control={
                <Checkbox
                  name='active'
                  id='active'
                  checked={formik.values.active}
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

export default ProfileComponent
