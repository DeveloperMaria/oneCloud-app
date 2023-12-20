import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogBox from './DialogBox'
import { addNAS, getAllFirstName, updateNAS } from 'src/pages/ipManagement/api'
import toast from 'react-hot-toast'

const NasComponent = ({
  setShow5,
  setTitle,
  show5,
  title,
  IPId,
  setIPId,
  setNasData,
  formik
}) => {
  const [firstName, setFirstName] = useState<[]>([])

  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { ipNas, node } = formik.values
      const newPartnerData = {
        ipNas,
        node
      }

      if (IPId) {
        const updatedNas = await updateNAS(IPId, newPartnerData)
        const updatedData = updatedNas.data

        setNasData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('NAS updated successfully')
      } else {
        const addedPartner = await addNAS(newPartnerData)
        setNasData(prevData => [...prevData, addedPartner.data])

        toast.success('NAS added successfully')
      }
      setShow5(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow5(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow5(false)
      setTitle('Add New NAS')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow5(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllFirstName()
        setFirstName(allData)
      } catch (error) {
        console.error('Error fetching First Name:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <DialogBox
      open={show5}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='IP'
            name='ipNas'
            id='ipNas'
            value={formik.values.ipNas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ipNas && Boolean(formik.errors.ipNas)}
            helperText={formik.touched.ipNas && formik.errors.ipNas}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='node-select'>Node</InputLabel>
            <Select
              fullWidth
              label='Node'
              name='node'
              id='node'
              value={formik.values.node}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.node && Boolean(formik.errors.node)}
              labelId='node-select'
            >
              {firstName.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default NasComponent
