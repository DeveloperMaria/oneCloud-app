import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { InvensionGridType } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import { addInvention, getAllInvention, updateInvention } from './api'
import toast from 'react-hot-toast'
import InventionGrid from './InventionGrid'
import { inventionGridSchema } from 'src/schema'
import { useFormik } from 'formik'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Index: React.FC = () => {
  const [data, setData] = useState<InvensionGridType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<InvensionGridType[]>([])
  const [title, setTitle] = useState<string>('Add New Technical Invention')
  const [inventionId, setInvensionId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      Supervisor: '',
      Technician: '',
      AppointmentDate: '',
      AppointmentDuration: '',
      Customer: '',
      Service: '',
      Priority: '',
      Reminder: '',
      Contacts: '',
      Address: '',
      EstimatedPrice: '',
      NotifyCustomer: false
    },
    validationSchema: inventionGridSchema,
    onSubmit: async values => {
      try {
        const {
          Supervisor,
          Technician,
          AppointmentDate,
          AppointmentDuration,
          Customer,
          Service,
          Priority,
          Reminder,
          Contacts,
          Address,
          EstimatedPrice,
          NotifyCustomer
        } = values

        const newInvensionGrid = {
          Supervisor,
          Technician,
          AppointmentDate,
          AppointmentDuration,
          Customer,
          Service,
          Priority,
          Reminder,
          Contacts,
          Address,
          EstimatedPrice,
          NotifyCustomer
        }

        if (inventionId) {
          const updatedInvension = await updateInvention(inventionId, newInvensionGrid)
          const updatedInvensionGrid = updatedInvension.data

          setData(prevData =>
            prevData.map(invension => (invension.id === updatedInvensionGrid.id ? updatedInvensionGrid : invension))
          )

          toast.success('Technical Invention updated successfully')
        } else {
          const addedInvensionGrid = await addInvention(newInvensionGrid)
          setData(prevData => [...prevData, addedInvensionGrid.data])

          toast.success('Technical Invention added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

  const handleCloseDialog = () => {
    if (!inventionId) {
      setShow(false)
      resetFormFields()
    } else {
      resetFormFields()
      setInvensionId(null)
      setShow(false)
      setTitle('Add New Technical Invention')
    }
  }

  const handleEdit = (invention: InvensionGridType) => {
    formik.setValues({
      Supervisor: invention.Supervisor,
      Technician: invention.Technician,
      AppointmentDate: invention.AppointmentDate,
      AppointmentDuration: invention.AppointmentDuration,
      Customer: invention.Customer,
      Service: invention.Service,
      Priority: invention.Priority,
      Reminder: invention.Reminder,
      Contacts: invention.Contacts,
      Address: invention.Address,
      EstimatedPrice: invention.EstimatedPrice,
      NotifyCustomer: invention.NotifyCustomer
    })
    setInvensionId(invention.id)
    setShow(true)
    setTitle('Update Technical Invention')
  }

  const handleButtonClick = () => {
    if (!inventionId) {
      setShow(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllInvention()
        setData(allData)
      } catch (error) {
        console.error('Error fetching Technical Invention:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmitFormik = (event: React.FormEvent) => {
    event.preventDefault()
    formik.handleSubmit()
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Add Invetion
          </Button>
        </Box>
        <QuickSearchToolbar
          value={searchText}
          clearSearch={() => handleSearch('')}
          onChange={event => handleSearch(event.target.value)}
        />
      </Box>

      <DialogBox
        open={show}
        onClose={handleCloseDialog}
        handleSubmit={handleSubmitFormik}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='supervisor-select'>Supervisor</InputLabel>
              <Select
                fullWidth
                label='Supervisor'
                name='Supervisor'
                id='Supervisor'
                value={formik.values.Supervisor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Supervisor && Boolean(formik.errors.Supervisor)}
                labelId='supervisor-select'
              >
                <MenuItem value='Eleono'>Eleono</MenuItem>
                <MenuItem value='Farhan Ali'>Farhan Ali</MenuItem>
                <MenuItem value='Sokol Petro'>Sokol Petro</MenuItem>
                <MenuItem value='Yuri Marcozzi'>Yuri Marcozzi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='technician-select'>Technician</InputLabel>
              <Select
                fullWidth
                label='Technician'
                name='Technician'
                id='Technician'
                value={formik.values.Technician}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Technician && Boolean(formik.errors.Technician)}
                labelId='technician-select'
              >
                <MenuItem value='Eleono'>Eleono</MenuItem>
                <MenuItem value='Farhan Ali'>Farhan Ali</MenuItem>
                <MenuItem value='Sokol Petro'>Sokol Petro</MenuItem>
                <MenuItem value='Yuri Marcozzi'>Yuri Marcozzi</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='Appointment Date'
              name='AppointmentDate'
              id='AppointmentDate'
              value={formik.values.AppointmentDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.AppointmentDate && Boolean(formik.errors.AppointmentDate)}
              helperText={formik.touched.AppointmentDate && formik.errors.AppointmentDate}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              type='time'
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label='Appointment duration'
              name='AppointmentDuration'
              id='AppointmentDuration'
              value={formik.values.AppointmentDuration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.AppointmentDuration && Boolean(formik.errors.AppointmentDuration)}
              helperText={formik.touched.AppointmentDuration && formik.errors.AppointmentDuration}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='Customer'
              name='Customer'
              id='Customer'
              value={formik.values.Customer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Customer && Boolean(formik.errors.Customer)}
              helperText={formik.touched.Customer && formik.errors.Customer}
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
                <MenuItem value='Eleono'>-----</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='priority-select'>Priority</InputLabel>
              <Select
                fullWidth
                label='Priority'
                name='Priority'
                id='Priority'
                value={formik.values.Priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Priority && Boolean(formik.errors.Priority)}
                labelId='priority-select'
              >
                <MenuItem value='High'>High</MenuItem>
                <MenuItem value='Average'>Average</MenuItem>
                <MenuItem value='Low'>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='reminder-select'>Reminder</InputLabel>
              <Select
                fullWidth
                label='Reminder'
                name='Reminder'
                id='Reminder'
                value={formik.values.Reminder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Reminder && Boolean(formik.errors.Reminder)}
                labelId='reminder-select'
              >
                <MenuItem value='1 Hour'>1 Hour</MenuItem>
                <MenuItem value='2 Hour'>2 Hour</MenuItem>
                <MenuItem value='6 Hour'>6 Hour</MenuItem>
                <MenuItem value='12 Hour'>12 Hour</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name='Contacts'
              id='Contacts'
              value={formik.values.Contacts}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Contacts && Boolean(formik.errors.Contacts)}
              helperText={formik.touched.Contacts && formik.errors.Contacts}
              label='Contacts'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name='Address'
              id='Address'
              value={formik.values.Address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Address && Boolean(formik.errors.Address)}
              helperText={formik.touched.Address && formik.errors.Address}
              label='Address'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='Estimated Price'
              name='EstimatedPrice'
              id='EstimatedPrice'
              value={formik.values.EstimatedPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.EstimatedPrice && Boolean(formik.errors.EstimatedPrice)}
              helperText={formik.touched.EstimatedPrice && formik.errors.EstimatedPrice}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControlLabel
              label='Notify the customer (SMS/Push)'
              control={
                <Checkbox
                  name='NotifyCustomer'
                  id='NotifyCustomer'
                  checked={formik.values.NotifyCustomer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
            />
          </Grid>
        </Grid>
      </DialogBox>

      <InventionGrid
        setData={setData}
        loading={loading}
        handleEdit={handleEdit}
        filteredData={filteredData}
        data={data}
      />
    </Box>
  )
}

export default Index
