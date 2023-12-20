import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { ProviderType } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import ProviderList from './ProviderList'
import { Card, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import { addProvider, getAllProvider, updateProvider } from './api'
import toast from 'react-hot-toast'
import { provincesData } from 'src/@fake-db/providerData'
import { providerSchema } from 'src/schema'
import { useFormik } from 'formik'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Index: React.FC = () => {
  const [data, setData] = useState<ProviderType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<ProviderType[]>([])
  const [title, setTitle] = useState<string>('Add New Supplier')
  const [providerId, setProviderId] = useState<string | null>(null)

  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      businessName: '',
      email: '',
      pec: '',
      supplierType: '',
      vatNumber: undefined,
      attorney: '',
      representativeTaxCode: '',
      taxIdCode: '',
      identityDocument: '',
      number: undefined,
      mobilePhone: undefined,
      landlinePhone: undefined,
      emailNOC: '',
      enableTicketSending: false,
      street: '',
      civic: '',
      common: '',
      province: '',
      postalCode: '',
      payment: '',
      iBAN: ''
    },
    validationSchema: providerSchema,
    onSubmit: async values => {
      try {
        const {
          businessName,
          email,
          pec,
          supplierType,
          vatNumber,
          attorney,
          representativeTaxCode,
          taxIdCode,
          identityDocument,
          number,
          mobilePhone,
          landlinePhone,
          emailNOC,
          enableTicketSending,
          street,
          civic,
          common,
          province,
          postalCode,
          payment,
          iBAN
        } = values
        const newProvider = {
          businessName,
          email,
          pec,
          supplierType,
          vatNumber,
          attorney,
          representativeTaxCode,
          taxIdCode,
          identityDocument,
          number,
          mobilePhone,
          landlinePhone,
          emailNOC,
          enableTicketSending,
          street,
          civic,
          common,
          province,
          postalCode,
          payment,
          iBAN
        }

        if (providerId) {
          const updatedProvider = await updateProvider(providerId, newProvider)

          setData(prevData =>
            prevData.map(provider => (provider.id === updatedProvider.id ? updatedProvider : provider))
          )

          toast.success('Provider updated successfully')
        } else {
          const addedProvider = await addProvider(newProvider)
          setData(prevData => [...prevData, addedProvider])

          toast.success('Provider added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

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

  const handleCloseDialog = () => {
    if (!providerId) {
      setShow(false)
      resetFormFields()
    } else {
      resetFormFields()
      setProviderId(null)
      setShow(false)
      setTitle('Add New Supplier')
    }
  }

  const handleEdit = (provider: ProviderType) => {
    formik.setValues({
      businessName: provider.businessName,
      email: provider.email,
      pec: provider.pec,
      supplierType: provider.supplierType,
      vatNumber: provider.vatNumber,
      attorney: provider.attorney,
      representativeTaxCode: provider.representativeTaxCode,
      taxIdCode: provider.taxIdCode,
      identityDocument: provider.identityDocument,
      number: provider.number,
      mobilePhone: provider.mobilePhone,
      landlinePhone: provider.landlinePhone,
      emailNOC: provider.emailNOC,
      enableTicketSending: provider.enableTicketSending,
      street: provider.street,
      civic: provider.civic,
      common: provider.common,
      province: provider.province,
      postalCode: provider.postalCode,
      payment: provider.payment,
      iBAN: provider.iBAN
    })
    setProviderId(provider.id)
    setShow(true)
    setTitle('Update Supplier')
  }

  const handleButtonClick = () => {
    if (!providerId) {
      setShow(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllProvider()
        setData(allData)
      } catch (error) {
        console.error('Error fetching partners:', error)
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
            New Supplier
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
                <InputLabel id='supplier-select'>Supplier Type</InputLabel>
                <Select
                  fullWidth
                  label='Supplier Type'
                  name='supplierType'
                  id='supplierType'
                  value={formik.values.supplierType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.supplierType && Boolean(formik.errors.supplierType)}
                  labelId='supplier-select'
                >
                  <MenuItem value='Private'>Private</MenuItem>
                  <MenuItem value='Society'>Society</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Business name'
                name='businessName'
                id='businessName'
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                helperText={formik.touched.businessName && formik.errors.businessName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type='number'
                label='VAT number'
                name='vatNumber'
                id='vatNumber'
                value={formik.values.vatNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vatNumber && Boolean(formik.errors.vatNumber)}
                helperText={formik.touched.vatNumber && formik.errors.vatNumber}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Attorney'
                name='attorney'
                id='attorney'
                value={formik.values.attorney}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.attorney && Boolean(formik.errors.attorney)}
                helperText={formik.touched.attorney && formik.errors.attorney}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Representative Tax Code'
                name='representativeTaxCode'
                id='representativeTaxCode'
                value={formik.values.representativeTaxCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.representativeTaxCode && Boolean(formik.errors.representativeTaxCode)}
                helperText={formik.touched.representativeTaxCode && formik.errors.representativeTaxCode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Tax ID code'
                name='taxIdCode'
                id='taxIdCode'
                value={formik.values.taxIdCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.taxIdCode && Boolean(formik.errors.taxIdCode)}
                helperText={formik.touched.taxIdCode && formik.errors.taxIdCode}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
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
            <Grid item sm={6} xs={12}>
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
              <TextField
                fullWidth
                type='email'
                label='Email NOC'
                name='emailNOC'
                id='emailNOC'
                value={formik.values.emailNOC}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailNOC && Boolean(formik.errors.emailNOC)}
                helperText={formik.touched.emailNOC && formik.errors.emailNOC}
              />
            </Grid>

            <Grid item sm={6} xs={12} sx={{ marginTop: '6px' }}>
              <FormControlLabel
                label='Enable ticket sending'
                control={
                  <Checkbox
                    name='enableTicketSending'
                    id='enableTicketSending'
                    checked={formik.values.enableTicketSending}
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
            Address
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
                  {provincesData.provinces.map((prov, index) => (
                    <MenuItem key={index} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
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
                  label='Pyment'
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

            <Grid item sm={6} xs={12}>
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
          </Grid>
        </Card>
      </DialogBox>

      <ProviderList handleEdit={handleEdit} setData={setData} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default Index
