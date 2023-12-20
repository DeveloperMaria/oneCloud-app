import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogBox from './DialogBox'
import { addAccessPoint, getAllFirstName, getAllIpNas, updateAccessPoint } from 'src/pages/ipManagement/api'
import toast from 'react-hot-toast'

const AccessPointComponent = ({ formik, setShow2, setTitle, show2, title, IPId, setIPId, setAccessPointData }) => {
  const [getFirstName, setGetFirstName] = useState<[]>([])
  const [ipNas, setIpNas] = useState<[]>([])

  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { ipAccessPoint, name, nas, node } = formik.values

      const newPartnerData = {
        ipAccessPoint,
        name,
        nas,
        node
      }

      if (IPId) {
        const updatedAccessPoint = await updateAccessPoint(IPId, newPartnerData)
        const updatedData = updatedAccessPoint.data

        setAccessPointData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('AccessPoint updated successfully')
      } else {
        const addedPartner = await addAccessPoint(newPartnerData)
        setAccessPointData(prevData => [...prevData, addedPartner.data])

        toast.success('AccessPoint added successfully')
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
      setTitle('Add New AccessPoint')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow2(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllFirstName()
        setGetFirstName(allData)
      } catch (error) {
        console.error('Error fetching First Name:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllIpNas()
        setIpNas(allData)
      } catch (error) {
        console.error('Error fetching Ip Nas:', error)
      }
    }

    fetchData()
  }, [])

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
            label='IP AccessPoint'
            name='ipAccessPoint'
            id='ipAccessPoint'
            value={formik.values.ipAccessPoint}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ipAccessPoint && Boolean(formik.errors.ipAccessPoint)}
            helperText={formik.touched.ipAccessPoint && formik.errors.ipAccessPoint}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Name'
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
          <FormControl fullWidth>
            <InputLabel id='nas-select'>NAS</InputLabel>
            <Select
              fullWidth
              label='NAS'
              name='nas'
              id='nas'
              value={formik.values.nas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nas && Boolean(formik.errors.nas)}
              labelId='nas-select'
            >
              {getFirstName.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {ipNas.map((ipNas, index) => (
                <MenuItem key={index} value={ipNas}>
                  {ipNas}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default AccessPointComponent
