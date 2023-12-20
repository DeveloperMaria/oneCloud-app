import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Autocomplete,
  Card,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { ClientType } from 'src/types/apps/userTypes'
import ClientList from './ClientList'
import DialogBox from 'src/components/DialogBox'
import { addClient, getAllClient, updateClient } from './api'
import toast from 'react-hot-toast'
import { statusOptions } from 'src/@fake-db/clientData'
import { clientSchema } from 'src/schema'
import { useFormik } from 'formik'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const index = () => {
  const [data, setData] = useState<ClientType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<ClientType[]>([])
  const [title, setTitle] = useState('Add New Clinet')
  const [selectedOption, setSelectedOption] = useState<ClientType | null>(null)
  const [statusOption, setStatusOption] = useState<ClientType | null>(null)
  const [cleintId, setClientId] = useState<string | null>(null)
  const [countryName, setCountryName] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleOptionChange = (event: React.SyntheticEvent, value: ClientType | null) => {
    setSelectedOption(value)
  }
  const handleStatusChange = (event: React.SyntheticEvent, value: ClientType | null) => {
    setStatusOption(value)
  }

  const filterAll: any = [
    {
      id: 1,
      title: 'Every one'
    },
    {
      id: 2,
      title: 'One Cloud'
    },
    {
      id: 3,
      title: 'Televoip'
    },
    {
      id: 4,
      title: 'Voiped wholesale BV'
    },
    {
      id: 5,
      title: 'One Cloud Digital Ltd'
    }
  ]

  const filterStatus: any = [
    {
      id: 1,
      title: 'All'
    },
    {
      id: 2,
      title: 'Waiting for customer'
    },
    {
      id: 3,
      title: 'Waiting for closure invoice'
    },
    {
      id: 4,
      title: 'Waiting for return goods'
    },
    {
      id: 5,
      title: 'Technician wait'
    },
    {
      id: 5,
      title: 'Active'
    }
  ]

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
      customerType: '',
      billingGroup: '',
      surname: '',
      firstName: '',
      taxIDcode: '',
      identityDocument: '',
      technicalDepartmentEmail: '',
      number: undefined,
      email: '',
      pec: '',
      sDICode: undefined,
      mobilePhone: undefined,
      landlinePhone: undefined,
      invoiceViaEmail: false,
      paperInvoice: false,
      note: '',
      street: '',
      civic: '',
      common: '',
      province: '',
      postalCode: '',
      nation: '',
      payment: '',
      iBAN: '',
      bICCode: '',
      differentBillingAddress: false,
      disableUnpaidInvoiceChecking: false,
      status: ''
    },
    validationSchema: clientSchema,
    onSubmit: async values => {
      try {
        const newPartnerData = {
          customerType: values.customerType,
          billingGroup: values.billingGroup,
          surname: values.surname,
          firstName: values.firstName,
          taxIDcode: values.taxIDcode,
          identityDocument: values.identityDocument,
          technicalDepartmentEmail: values.technicalDepartmentEmail,
          number: values.number,
          email: values.email,
          pec: values.pec,
          sDICode: values.sDICode,
          mobilePhone: values.mobilePhone,
          landlinePhone: values.landlinePhone,
          invoiceViaEmail: values.invoiceViaEmail,
          paperInvoice: values.paperInvoice,
          note: values.note,
          street: values.street,
          civic: values.civic,
          common: values.common,
          province: values.province,
          postalCode: values.postalCode,
          nation: values.nation,
          payment: values.payment,
          iBAN: values.iBAN,
          bICCode: values.bICCode,
          differentBillingAddress: values.differentBillingAddress,
          disableUnpaidInvoiceChecking: values.disableUnpaidInvoiceChecking,
          status: values.status
        }

        if (cleintId) {
          const updatedClient = await updateClient(cleintId, newPartnerData)

          setData(prevData => prevData.map(client => (client.id === updatedClient.id ? updatedClient : client)))

          toast.success('Client updated successfully')
        } else {
          const addedPartner = await addClient(newPartnerData)
          setData(prevData => [...prevData, addedPartner])

          toast.success('Client added successfully')
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
    if (!cleintId) {
      setShow(false)
      resetFormFields()
      setEditMode(false)
    } else {
      resetFormFields()
      setClientId(null)
      setShow(false)
      setEditMode(false)
      setTitle('Add New Client')
    }
  }

  const handleEdit = (client: ClientType) => {
    formik.setValues({
      customerType: client.customerType,
      billingGroup: client.billingGroup,
      surname: client.surname,
      firstName: client.firstName,
      taxIDcode: client.taxIDcode,
      identityDocument: client.identityDocument,
      technicalDepartmentEmail: client.technicalDepartmentEmail,
      number: client.number,
      email: client.email,
      pec: client.pec,
      sDICode: client.sDICode,
      mobilePhone: client.mobilePhone,
      landlinePhone: client.landlinePhone,
      invoiceViaEmail: client.invoiceViaEmail,
      paperInvoice: client.paperInvoice,
      note: client.note,
      street: client.street,
      civic: client.civic,
      common: client.common,
      province: client.province,
      postalCode: client.postalCode,
      nation: client.nation,
      payment: client.payment,
      iBAN: client.iBAN,
      bICCode: client.bICCode,
      differentBillingAddress: client.differentBillingAddress,
      disableUnpaidInvoiceChecking: client.disableUnpaidInvoiceChecking,
      status: client.status
    })
    setClientId(client.id)
    setEditMode(true)
    setShow(true)
    setTitle('Update Client')
  }
  const handleButtonClick = () => {
    if (!cleintId) {
      setShow(true)
      setEditMode(false)
    }
    else{
      setEditMode(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllClient()
        setData(allData)
      } catch (error) {
        console.error('Error fetching Client:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setSelectedOption(filterAll[0])
    setStatusOption(filterStatus[0])
  }, [])

  const handleSubmitFormik = (event: React.FormEvent) => {
    event.preventDefault()
    formik.handleSubmit()
  }

  const checkCountry = countryCode => {
    const validCountryCodes = ['US', 'UK', 'CA']
    return validCountryCodes.includes(countryCode)
  }

  const getCountryName = countryCode => {
    const countryNames = {
      US: 'United States',
      UK: 'United Kingdom',
      CA: 'Canada'
    }
    return countryNames[countryCode] || 'Nation not found'
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' onClick={() => setShow(true)}>
            New Client
          </Button>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormControlLabel sx={{ pl: 5 }} label='Basket' control={<Checkbox name='basic-unchecked' />} />

          <Autocomplete
            autoHighlight
            id='status'
            options={filterStatus}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} size='small' sx={{ width: '200px' }} />}
            value={statusOption}
            onChange={handleStatusChange}
          />
          <Autocomplete
            autoHighlight
            sx={{ pl: 5 }}
            id='add-members'
            options={filterAll}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} size='small' sx={{ width: '200px' }} />}
            value={selectedOption}
            onChange={handleOptionChange}
          />

          <Box sx={{ width: '230px', pl: 5 }}>
            <QuickSearchToolbar
              value={searchText}
              clearSearch={() => handleSearch('')}
              onChange={event => handleSearch(event.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <DialogBox
        open={show}
        onClose={handleCloseDialog}
        handleSubmit={handleSubmitFormik}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Card>
          <Box
            sx={{
              py: 4,
              pl: 5,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: '#9155FD',
              color: '#fff'
            }}
          >
            Personal Data
          </Box>
          <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='customer-select' >Customer Type</InputLabel>
                <Select
                  label='Customer Type'
                  name='customerType'
                  id='customerType'
                  value={formik.values.customerType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.customerType && Boolean(formik.errors.customerType)}
                  labelId='customer-select'
                  disabled={editMode}
                >
                  <MenuItem value='Private'>Private</MenuItem>
                  <MenuItem value='Society'>Society</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='billing-select'>Billing Group</InputLabel>
                <Select
                  fullWidth
                  label='Billing Group'
                  name='billingGroup'
                  id='billingGroup'
                  value={formik.values.billingGroup}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.billingGroup && Boolean(formik.errors.billingGroup)}
                  labelId='billing-select'
                >
                  <MenuItem value='Test'>Test</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='SurName'
                name='surname'
                id='surname'
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='First Name'
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
                label='Tax ID Code'
                name='taxIDcode'
                id='taxIDcode'
                value={formik.values.taxIDcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.taxIDcode && Boolean(formik.errors.taxIDcode)}
                helperText={formik.touched.taxIDcode && formik.errors.taxIDcode}
              />
            </Grid>

            <Grid item sm={3} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='identity-select'>Identity Doc</InputLabel>
                <Select
                  fullWidth
                  label='Identity Document'
                  name='identityDocument'
                  id='identityDocument'
                  value={formik.values.identityDocument}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.identityDocument && Boolean(formik.errors.identityDocument)}
                  labelId='identity-select'
                >
                  <MenuItem value='There'>There</MenuItem>
                  <MenuItem value='Driving License'>Driving License</MenuItem>
                  <MenuItem value='Passport'>Passport</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
              <TextField
                type='number'
                fullWidth
                label='Number'
                name='number'
                id='number'
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                type='email'
                fullWidth
                label='Email'
                name='email'
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Pec'
                name='pec'
                id='pec'
                value={formik.values.pec}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pec && Boolean(formik.errors.pec)}
                helperText={formik.touched.pec && formik.errors.pec}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Technical department email'
                name='technicalDepartmentEmail'
                id='technicalDepartmentEmail'
                value={formik.values.technicalDepartmentEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.technicalDepartmentEmail && Boolean(formik.errors.technicalDepartmentEmail)}
                helperText={formik.touched.technicalDepartmentEmail && formik.errors.technicalDepartmentEmail}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type='number'
                label='SDI Code'
                name='sDICode'
                id='sDICode'
                value={formik.values.sDICode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sDICode && Boolean(formik.errors.sDICode)}
                helperText={formik.touched.sDICode && formik.errors.sDICode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Mobile Phone'
                name='mobilePhone'
                id='mobilePhone'
                value={formik.values.mobilePhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)}
                helperText={formik.touched.mobilePhone && formik.errors.mobilePhone}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Landline phone'
                name='landlinePhone'
                id='landlinePhone'
                value={formik.values.landlinePhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.landlinePhone && Boolean(formik.errors.landlinePhone)}
                helperText={formik.touched.landlinePhone && formik.errors.landlinePhone}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControlLabel
                label='Invoice via email'
                control={
                  <Checkbox
                    name='invoiceViaEmail'
                    id='invoiceViaEmail'
                    checked={formik.values.invoiceViaEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
              <FormControlLabel
                label='Paper invoice'
                control={
                  <Checkbox
                    name='paperInvoice'
                    id='paperInvoice'
                    checked={formik.values.paperInvoice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name='note'
                id='note'
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
                multiline
                minRows={3}
                label='Note'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              py: 4,
              pl: 5,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: '#9155FD',
              color: '#fff'
            }}
          >
            Holder Address
          </Box>
          <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
            <Grid item sm={4} xs={12}>
              <TextField
                fullWidth
                label='Street'
                name='street'
                id='street'
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                fullWidth
                label='Civic'
                name='civic'
                id='civic'
                value={formik.values.civic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.civic && Boolean(formik.errors.civic)}
                helperText={formik.touched.civic && formik.errors.civic}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Common'
                name='common'
                id='common'
                value={formik.values.common}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.common && Boolean(formik.errors.common)}
                helperText={formik.touched.common && formik.errors.common}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='province-select'>Province</InputLabel>
                <Select
                  fullWidth
                  label='Province'
                  name='province'
                  id='province'
                  value={formik.values.province}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.province && Boolean(formik.errors.province)}
                  labelId='province-select'
                >
                  <MenuItem value='Agrigento'>Agrigento</MenuItem>
                  <MenuItem value='Alexandria'>Alexandria</MenuItem>
                  <MenuItem value='Ancona'>Ancona</MenuItem>
                  <MenuItem value='Aosta'>Aosta</MenuItem>
                  <MenuItem value='Arezzo'>Arezzo</MenuItem>
                  <MenuItem value='Ascoli Piceno'>Ascoli Piceno</MenuItem>
                  <MenuItem value='Asti'>Asti</MenuItem>
                  <MenuItem value='Avellino'>Avellino</MenuItem>
                  <MenuItem value='Bari'>Bari</MenuItem>
                  <MenuItem value='Barletta Andria Trani'>Barletta Andria Trani</MenuItem>
                  <MenuItem value='Belluno'>Belluno</MenuItem>
                  <MenuItem value='Benevento'>Benevento</MenuItem>
                  <MenuItem value='Bergamo'>Bergamo</MenuItem>
                  <MenuItem value='Biella'>Biella</MenuItem>
                  <MenuItem value='Bologna'>Bologna</MenuItem>
                  <MenuItem value='Bolzano'>Bolzano</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                fullWidth
                label='Postal Code'
                name='postalCode'
                id='postalCode'
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                fullWidth
                label='Nation'
                name='nation'
                id='nation'
                value={formik.values.nation}
                onChange={event => {
                  const enteredCountry = event.target.value.toUpperCase().slice(0, 2)
                  const countryExists = checkCountry(enteredCountry)
                  formik.setFieldValue('nation', enteredCountry)
                  const countryName = countryExists ? getCountryName(enteredCountry) : 'Nation not found'
                  setCountryName(countryName)
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.nation && Boolean(formik.errors.nation)}
                helperText={formik.touched.nation && formik.errors.nation}
              />
              {countryName && countryName !== '' && (
                <Typography variant='body2' color='textSecondary'>
                  {countryName}
                </Typography>
              )}
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControlLabel
                label='Different billing address'
                control={
                  <Checkbox
                    name='differentBillingAddress'
                    id='differentBillingAddress'
                    checked={formik.values.differentBillingAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              py: 4,
              pl: 5,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: '#9155FD',
              color: '#fff'
            }}
          >
            Payment Method
          </Box>
          <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='payment-select'>Pyment</InputLabel>
                <Select
                  fullWidth
                  label='Payment'
                  name='payment'
                  id='payment'
                  value={formik.values.payment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.payment && Boolean(formik.errors.payment)}
                  labelId='payment-select'
                >
                  <MenuItem value='Bank Check'>Bank Check</MenuItem>
                  <MenuItem value='Postal'>Postal</MenuItem>
                  <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                  <MenuItem value='Postal Transfer'>Postal Transfer</MenuItem>
                  <MenuItem value='Cash'>Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                fullWidth
                label='IBAN'
                name='iBAN'
                id='iBAN'
                value={formik.values.iBAN}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.iBAN && Boolean(formik.errors.iBAN)}
                helperText={formik.touched.iBAN && formik.errors.iBAN}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                fullWidth
                label='BIC code (SWIFT)'
                name='bICCode'
                id='bICCode'
                value={formik.values.bICCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bICCode && Boolean(formik.errors.bICCode)}
                helperText={formik.touched.bICCode && formik.errors.bICCode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControlLabel
                label='Disable unpaid invoice checking'
                control={
                  <Checkbox
                    name='disableUnpaidInvoiceChecking'
                    id='disableUnpaidInvoiceChecking'
                    checked={formik.values.disableUnpaidInvoiceChecking}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='status-select'>Status</InputLabel>
                <Select
                  fullWidth
                  label='Status'
                  name='status'
                  id='status'
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  labelId='status-select'
                >
                  {statusOptions.map((option, index) => (
                    <MenuItem key={index} value={option.status}>
                      {option.status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </DialogBox>
      <ClientList handleEdit={handleEdit} setData={setData} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
