import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TicketTypes } from 'src/types/apps/userTypes'
import TicketList from './TicketList'
import { Autocomplete } from '@mui/material'
import DialogBox from 'src/components/DialogBox'
import { addTicket, getAllTicket, updateTicket } from './api'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { ticketSchema } from 'src/schema'

const index = () => {
  const [data, setData] = useState<TicketTypes[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<TicketTypes[]>([])
  const [title, setTitle] = useState('Open a New Ticket')
  const [selectedOption, setSelectedOption] = useState<TicketTypes | null>(null)
const [ticketId, setTicketId] = useState<string | null>(null)

  const handleOptionChange = (event: React.SyntheticEvent, value: TicketTypes | null) => {
    setSelectedOption(value)
  }


  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      customer: '',
      service: '',
      ticketType: '',
      reasonForRequest: '',
      assignTo: '',
      priority: '',
      description: '',
      ticketVisibleByCustomer: false,
      addDescriptionForCustomer: false,
      descriptionForCustomer: '',
      closeTicketDueToInactivity: undefined
    },
    validationSchema: ticketSchema,
    onSubmit: async (values) => {
      try {
        const {
          customer,
          service,
          ticketType,
          reasonForRequest,
          assignTo,
          priority,
          description,
          ticketVisibleByCustomer,
          addDescriptionForCustomer,
          descriptionForCustomer,
          closeTicketDueToInactivity,
        } = values; 
  
        const newTicket = {
          customer,
          service,
          ticketType,
          reasonForRequest,
          assignTo,
          priority,
          description,
          ticketVisibleByCustomer,
          addDescriptionForCustomer,
          descriptionForCustomer,
          closeTicketDueToInactivity,
        };

        if (ticketId) {
          const updatedTicket = await updateTicket(ticketId, newTicket)

          setData(prevData => prevData.map(client => (client.id === updatedTicket.id ? updatedTicket : client)))

          toast.success('Ticket updated successfully')
        } else {
          const addedTicket = await addTicket(newTicket)
          setData(prevData => [...prevData, addedTicket])

          toast.success('Ticket added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

  const cardData = [
    {
      id: 1,
      title: 'My Tickets'
    },
    {
      id: 2,
      title: 'Open'
    },
    {
      id: 3,
      title: 'Closed'
    }
  ]

  const handleEdit = (ticket: TicketTypes) => {
    formik.setValues({
      customer: ticket.customer,
      service: ticket.service,
      ticketType: ticket.ticketType,
      reasonForRequest: ticket.reasonForRequest,
      assignTo: ticket.assignTo,
      priority: ticket.priority,
      description: ticket.description,
      ticketVisibleByCustomer: ticket.ticketVisibleByCustomer,
      addDescriptionForCustomer: ticket.addDescriptionForCustomer,
      descriptionForCustomer: ticket.descriptionForCustomer,
      closeTicketDueToInactivity: ticket.closeTicketDueToInactivity
    })
    setTicketId(ticket.id)
    setShow(true)
    setTitle('Update Ticket')
  }
  const handleButtonClick = () => {
    if (!ticketId) {
      setShow(true)
    }
  }

  const handleCloseDialog = () => {
    if (!ticketId) {
      setShow(false)
      resetFormFields()
    } else {
      resetFormFields()
      setTicketId(null)
      setShow(false)
      setTitle('Add New Ticket')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllTicket()
        setData(allData)
      } catch (error) {
        console.error('Error fetching Ticket:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setSelectedOption(cardData[0])
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
            New
          </Button>
        </Box>
        <Box>
          <Autocomplete
            autoHighlight
            id='add-members'
            options={cardData}
            getOptionLabel={option => option.title || ''}
            disableClearable
            renderInput={params => <TextField {...params} size='small' sx={{ width: '300px' }} />}
            value={selectedOption}
            onChange={handleOptionChange}
          />
        </Box>
      </Box>

      <DialogBox
        open={show}
        onClose={handleCloseDialog}
        handleSubmit={handleSubmitFormik}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='customer'
              name='customer'
              id='customer'
              value={formik.values.customer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              helperText={formik.touched.customer && formik.errors.customer}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='service-select'>Service</InputLabel>
              <Select
                fullWidth
                label='Service'
                labelId='service-select'
                name='service'
                id='service'
                value={formik.values.service}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.service && Boolean(formik.errors.service)}
              >
                <MenuItem value='CMD_ADMIN'>----</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='ticket-select'>Ticket Type</InputLabel>
              <Select
                fullWidth
                label='Ticket Type'
                labelId='ticket-select'
                name='ticketType'
                id='ticketType'
                value={formik.values.ticketType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ticketType && Boolean(formik.errors.ticketType)}
              >
                <MenuItem value='Provisioning (Activation/Migration)'>Provisioning (Activation/Migration)</MenuItem>
                <MenuItem value='Assurance (In Operation)'>Assurance (In Operation)</MenuItem>
                <MenuItem value='Administration /Billing'>Administration /Billing</MenuItem>
                <MenuItem value='Line Deactivation'>Line Deactivation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='reason-select'>Reason For Request</InputLabel>
              <Select
                fullWidth
                label='Reason For Request'
                name='reasonForRequest'
                id='reasonForRequest'
                value={formik.values.reasonForRequest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.reasonForRequest && Boolean(formik.errors.reasonForRequest)}
                labelId='reason-select'
              >
                <MenuItem value='Disservice'>Disservice</MenuItem>
                <MenuItem value='Degradation'>Degradation</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='assign-select'>Assign to</InputLabel>
              <Select
                fullWidth
                label='Assign to'
                name='assignTo'
                id='assignTo'
                value={formik.values.assignTo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.assignTo && Boolean(formik.errors.assignTo)}
                labelId='assign-select'
              >
                <MenuItem value='Disservice'>Admin</MenuItem>
                <MenuItem value='Degradation'>Farhan</MenuItem>
                <MenuItem value='Other'>Sokol</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='priority-select'>Priority</InputLabel>
              <Select
                fullWidth
                label='Priority'
                name='priority'
                id='priority'
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.priority && Boolean(formik.errors.priority)}
                labelId='priority-select'
              >
                <MenuItem value='Disservice'>Low</MenuItem>
                <MenuItem value='Degradation'>Average</MenuItem>
                <MenuItem value='Other'>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              fullWidth
              multiline
              name='description'
              id='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              minRows={3}
              label='Description'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Grid>
              <FormControlLabel
                label='Ticket visible by the customer'
                control={
                  <Checkbox
                    name='ticketVisibleByCustomer'
                    id='ticketVisibleByCustomer'
                    checked={formik.values.ticketVisibleByCustomer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </Grid>
            <Grid>
              <FormControlLabel
                label='Add a different description for the customer'
                control={
                  <Checkbox
                    name='addDescriptionForCustomer'
                    id='addDescriptionForCustomer'
                    checked={formik.values.addDescriptionForCustomer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </Grid>
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              fullWidth
              multiline
              name='descriptionForCustomer'
              id='descriptionForCustomer'
              value={formik.values.descriptionForCustomer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descriptionForCustomer && Boolean(formik.errors.descriptionForCustomer)}
              helperText={formik.touched.descriptionForCustomer && formik.errors.descriptionForCustomer}
              minRows={3}
              label='Description for the Customer'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel sx={{ color: '#9155fd', pb: 3 }}>Close ticket due to inactivity after: (min.)</InputLabel>
            <TextField
              type='number'
              fullWidth
              placeholder='0'
              name='closeTicketDueToInactivity'
              id='closeTicketDueToInactivity'
              value={formik.values.closeTicketDueToInactivity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.closeTicketDueToInactivity && Boolean(formik.errors.closeTicketDueToInactivity)}
              helperText={formik.touched.closeTicketDueToInactivity && formik.errors.closeTicketDueToInactivity}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel sx={{ color: '#9155fd', pb: 3 }}>Upload documents</InputLabel>
            <TextField type='file' />
          </Grid>
        </Grid>
      </DialogBox>

      <TicketList handleEdit={handleEdit} setData={setData} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
