import React, { ChangeEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { PassiveType } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import PassiveInvoicesList from './PassiveInvoicesList'
import { addPassiveInvoice, getAllPassiveInvoice, updatePassiveInvoice } from './api'
import toast from 'react-hot-toast'
import { paymentOptions } from 'src/@fake-db/ItemInvoicedData'
import { passiveSchema } from 'src/schema'
import { useFormik } from 'formik'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Index: React.FC = () => {
  const [data, setData] = useState<PassiveType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<PassiveType[]>([])
  const [title, setTitle] = useState<string>('Add New Passive Invoices')
  const [invoice, setinvoice] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [paymentFilter, setPaymentFilter] = useState<string>('')
  const [state, setState] = useState<string>('')
const [passiveId, setPassiveId] = useState<string | null>(null)

  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      supplierCompanyName: '',
      crediteNote: false,
      number: undefined,
      issueDate: '',
      expireDate: '',
      totalExcluding: undefined,
      totalNotSubject: undefined,
      totalNonTaxable:undefined,
      totalExempt: undefined,
      totalNotShown: undefined,
      totalReverseCharge: undefined,
      totalEUCountry: undefined,
      totalTaxableAmount: undefined,
      totalVAT: undefined,
      totalDocument: undefined,
      payment: '',
      note: ''
    },
    validationSchema: passiveSchema,
    onSubmit: async values => {
      try {
        const {
          supplierCompanyName,
          crediteNote,
          number,
          issueDate,
          expireDate,
          totalExcluding,
          totalNotSubject,
          totalNonTaxable,
          totalExempt,
          totalNotShown,
          totalReverseCharge,
          totalEUCountry,
          totalTaxableAmount,
          totalVAT,
          totalDocument,
          payment,
          note
        } = values

        const newPassiveInvoice = {
          supplierCompanyName,
          crediteNote,
          number,
          issueDate,
          expireDate,
          totalExcluding,
          totalNotSubject,
          totalNonTaxable,
          totalExempt,
          totalNotShown,
          totalReverseCharge,
          totalEUCountry,
          totalTaxableAmount,
          totalVAT,
          totalDocument,
          payment,
          note
        }

        if (passiveId) {
          const updatedPassiveInvoice = await updatePassiveInvoice(passiveId, newPassiveInvoice)

          setData(prevData =>
            prevData.map(passive => (passive.id === updatedPassiveInvoice.id ? updatedPassiveInvoice : passive))
          )

          toast.success('Passive Invoice updated successfully')
        } else {
          const addedPassiveInvoice = await addPassiveInvoice(newPassiveInvoice)
          setData(prevData => [...prevData, addedPassiveInvoice])

          toast.success('Passive Invoice added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinvoice(e.target.value)
  }
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentFilter(e.target.value)
  }
  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

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
    if (!passiveId) {
      setShow(false)
      resetFormFields()
    } else {
      resetFormFields()
      setPassiveId(null)
      setShow(false)
      setTitle('Add New Passive Invoice')
    }
  }

  const handleEdit = (passive: PassiveType) => {
    formik.setValues({
      supplierCompanyName:passive.supplierCompanyName,
      crediteNote:passive.crediteNote,
      number:passive.number,
      issueDate:passive.issueDate,
      expireDate:passive.expireDate,
      totalExcluding:passive.totalExcluding,
      totalNotSubject:passive.totalNotSubject,
      totalNonTaxable:passive.totalNonTaxable,
      totalExempt:passive.totalExempt,
      totalNotShown:passive.totalNotShown,
      totalReverseCharge:passive.totalReverseCharge,
      totalEUCountry:passive.totalEUCountry,
      totalTaxableAmount:passive.totalTaxableAmount,
      totalVAT:passive.totalVAT,
      totalDocument:passive.totalDocument,
      payment:passive.payment,
      note:passive.note
    })
    setPassiveId(passive.id)
    setShow(true)
    setTitle('Update Passive Invoice')
  }

  const handleButtonClick = () => {
    if (!passiveId) {
      setShow(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPassiveInvoice()
        setData(allData)
      } catch (error) {
        console.error('Error fetching Passive Invoice:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmitFormik = (event: React.FormEvent) => {
    event.preventDefault()
    formik.handleSubmit()
  }

  const handleSubmit =()=>{}

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Add Invoice
          </Button>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow1(true)}>
            Filter
          </Button>

          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow2(true)}>
            Import
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
            <TextField
              fullWidth
              label='Supplier Company Name'
              name='supplierCompanyName'
              id='supplierCompanyName'
              value={formik.values.supplierCompanyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.supplierCompanyName && Boolean(formik.errors.supplierCompanyName)}
              helperText={formik.touched.supplierCompanyName && formik.errors.supplierCompanyName}
            />
          </Grid>
          <Grid item sm={6} xs={12} sx={{ marginTop: '6px' }}>
            <FormControlLabel
              label='Credit note'
              control={
                <Checkbox
                name='crediteNote'
              id='crediteNote'
              checked={formik.values.crediteNote}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
       
                />
              }
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
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
              type='date'
              fullWidth
              label='Date of issue'
              InputLabelProps={{
                shrink: true
              }}
              name='issueDate'
              id='issueDate'
              value={formik.values.issueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
              helperText={formik.touched.issueDate && formik.errors.issueDate}
             
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              type='date'
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label='Expiry Date'
              name='expireDate'
              id='expireDate'
              value={formik.values.expireDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.expireDate && Boolean(formik.errors.expireDate)}
              helperText={formik.touched.expireDate && formik.errors.expireDate}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total excluding VAT (N1)'
              name='totalExcluding'
              id='totalExcluding'
              value={formik.values.totalExcluding}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalExcluding && Boolean(formik.errors.totalExcluding)}
              helperText={formik.touched.totalExcluding && formik.errors.totalExcluding}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total not subject to VAT (N2)'
              name='totalNotSubject'
              id='totalNotSubject'
              value={formik.values.totalNotSubject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalNotSubject && Boolean(formik.errors.totalNotSubject)}
              helperText={formik.touched.totalNotSubject && formik.errors.totalNotSubject}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total non-taxable VAT (N3)'
              name='totalNonTaxable'
              id='totalNonTaxable'
              value={formik.values.totalNonTaxable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalNonTaxable && Boolean(formik.errors.totalNonTaxable)}
              helperText={formik.touched.totalNonTaxable && formik.errors.totalNonTaxable}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total VAT exempt (N4)'
              name='totalExempt'
              id='totalExempt'
              value={formik.values.totalExempt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalExempt && Boolean(formik.errors.totalExempt)}
              helperText={formik.touched.totalExempt && formik.errors.totalExempt}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total VAT not shown (N5)'
              name='totalNotShown'
              id='totalNotShown'
              value={formik.values.totalNotShown}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalNotShown && Boolean(formik.errors.totalNotShown)}
              helperText={formik.touched.totalNotShown && formik.errors.totalNotShown}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total reverse charge (N6)'
              name='totalReverseCharge'
              id='totalReverseCharge'
              value={formik.values.totalReverseCharge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalReverseCharge && Boolean(formik.errors.totalReverseCharge)}
              helperText={formik.touched.totalReverseCharge && formik.errors.totalReverseCharge}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total VAT other EU country (N7)'
              name='totalEUCountry'
              id='totalEUCountry'
              value={formik.values.totalEUCountry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalEUCountry && Boolean(formik.errors.totalEUCountry)}
              helperText={formik.touched.totalEUCountry && formik.errors.totalEUCountry}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total taxable amount'
              name='totalTaxableAmount'
              id='totalTaxableAmount'
              value={formik.values.totalTaxableAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalTaxableAmount && Boolean(formik.errors.totalTaxableAmount)}
              helperText={formik.touched.totalTaxableAmount && formik.errors.totalTaxableAmount}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total VAT'
              name='totalVAT'
              id='totalVAT'
              value={formik.values.totalVAT}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalVAT && Boolean(formik.errors.totalVAT)}
              helperText={formik.touched.totalVAT && formik.errors.totalVAT}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Total document'
              name='totalDocument'
              id='totalDocument'
              value={formik.values.totalDocument}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.totalDocument && Boolean(formik.errors.totalDocument)}
              helperText={formik.touched.totalDocument && formik.errors.totalDocument}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='payment-select'>Payment mode</InputLabel>
              <Select fullWidth label='Payment mode'      
              name='payment'
              id='payment'
              value={formik.values.payment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.payment && Boolean(formik.errors.payment)}
     labelId='payment-select'>
                {paymentOptions.map((payment, index) => (
                  <MenuItem key={index} value={payment}>
                    {payment}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name='note'
              id='note'
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note && Boolean(formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note} 
              label='Note'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>
        </Grid>
      </DialogBox>

      <DialogBox
        open={show1}
        onClose={() => setShow1(false)}
        handleSubmit={handleSearch}
        handleButtonClick={handleButtonClick}
        title='Filter Passive Invoice'
      >
        <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Supplier' />
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='invoice-select'>Invoices</InputLabel>
              <Select fullWidth label='Invoices' value={invoice} onChange={handleInvoiceChange} labelId='invoice-select'>
                <MenuItem value='Invoices'>Invoices</MenuItem>
                <MenuItem value='Credite Notes'>Credite Notes</MenuItem>
                <MenuItem value='All'>All</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='filter-select'>Filter By</InputLabel>
              <Select fullWidth label='Filter By' value={filter} onChange={handleFilterChange} labelId='filter-select'>
                <MenuItem value='Date of Issue'>Date of Issue</MenuItem>
                <MenuItem value='Payment Date'>Payment Date</MenuItem>
                <MenuItem value='Expiry Date'>Expiry Date</MenuItem>
                <MenuItem value='Receipt Date'>Receipt Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField type='date'   InputLabelProps={{
                shrink: true
              }} fullWidth label='From the' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField type='date'   InputLabelProps={{
                shrink: true
              }} fullWidth label='To the' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='payment-select'>Payment</InputLabel>
              <Select
                fullWidth
                label='Payment'
                value={paymentFilter}
                onChange={handlePaymentChange}
                labelId='payment-select'
              >
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Bank Check'>Bank Check</MenuItem>
                <MenuItem value='Postel'>Postel</MenuItem>
                <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='state-select'>State</InputLabel>
              <Select fullWidth label='State' value={state} onChange={handleStateChange} labelId='state-select'>
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='To pay'>To pay</MenuItem>
                <MenuItem value='Paid'>Paid</MenuItem>
                <MenuItem value='Partially paid'>Partially paid</MenuItem>
                <MenuItem value='offset with credite note'>offset with credite note</MenuItem>
                <MenuItem value='Partially compensated with credite note'>
                  Partially compensated with credite note
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Invoice Number' />
          </Grid>
        </Grid>
      </DialogBox>

      <DialogBox
        open={show2}
        onClose={() => setShow2(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title='Upload File'
      >
        <Grid container spacing={6} sx={{ py: 8, px: 5 }}>
          <Grid item sm={6} xs={12}>
            <InputLabel sx={{ color: '#9155fd', pb: 3 }}>Upload Aruba XLS invoice list:</InputLabel>
            <TextField type='file' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel sx={{ color: '#9155fd', pb: 3 }}>Upload XML invoice file:</InputLabel>
            <TextField type='file' />
          </Grid>
        </Grid>
      </DialogBox>

      <PassiveInvoicesList setData={setData} handleEdit={handleEdit} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default Index
