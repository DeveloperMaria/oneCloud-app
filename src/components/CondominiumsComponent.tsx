import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogBox from './DialogBox'
import toast from 'react-hot-toast'
import { addCondominiums, getAllIpAccessPoint, updateCondominiums } from 'src/pages/ipManagement/api'

const CondominiumsComponent = ({ setShow3, setTitle, show3, title, IPId, setIPId, setCondominiums, formik }) => {
  const [getipAccess, setGetIpAccess] = useState<[]>([])
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { ipCpe, name, address, referent, accessPoint } = formik.values
      const newPartnerData = {
        ipCpe,
        name,
        address,
        referent,
        accessPoint
      }

      if (IPId) {
        const updatedCondominiums = await updateCondominiums(IPId, newPartnerData)
        const updatedData = updatedCondominiums.data

        setCondominiums(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('Condominiums updated successfully')
      } else {
        const addedPartner = await addCondominiums(newPartnerData)
        setCondominiums(prevData => [...prevData, addedPartner.data])
        toast.success('Condominiums added successfully')
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
      setTitle('Add New Condominiums')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow3(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllIpAccessPoint()
        setGetIpAccess(allData)
      } catch (error) {
        console.error('Error fetching Ip AccessPoint:', error)
      }
    }

    fetchData()
  }, [])

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
            label='IP CPE'
            name='ipCpe'
            id='ipCpe'
            value={formik.values.ipCpe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ipCpe && Boolean(formik.errors.ipCpe)}
            helperText={formik.touched.ipCpe && formik.errors.ipCpe}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='First Name '
            name='name'
            id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Referent'
            name='referent'
            id='referent'
            value={formik.values.referent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.referent && Boolean(formik.errors.referent)}
            helperText={formik.touched.referent && formik.errors.referent}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='access-select'>Access Points</InputLabel>
            <Select
              fullWidth
              label='Access Points'
              name='accessPoint'
              id='accessPoint'
              value={formik.values.accessPoint}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.accessPoint && Boolean(formik.errors.accessPoint)}
              labelId='access-select'
            >
              {getipAccess.map((ipAccess, index) => (
                <MenuItem key={index} value={ipAccess}>
                  {ipAccess}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default CondominiumsComponent
