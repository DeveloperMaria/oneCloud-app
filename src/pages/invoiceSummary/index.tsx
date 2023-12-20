import React, { ChangeEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { PassiveType } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAllInvoiceSummary } from './api'
import toast from 'react-hot-toast'
import InvoiceSummaryList from './InvoiceSummaryList'
import { paymentData, stateData } from 'src/@fake-db/payment'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Index: React.FC = () => {
  // ** States
  const [data, setData] = useState<PassiveType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<PassiveType[]>([])
  const [invoice, setinvoice] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [paymentFilter, setPaymentFilter] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [passiveId, setPassiveId] = useState<string | null>(null)

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

  const handleButtonClick = () => {
    setShow(true)
    if (!passiveId) {
      setShow(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllInvoiceSummary()
        setData(allData)
      } catch (error) {
        console.error('Error fetching Invoice Summary:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Filter
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
        onClose={() => setShow(false)}
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
              <InputLabel id='invoice-select'>Invoice Group</InputLabel>
              <Select
                fullWidth
                label='Invoice Group'
                value={invoice}
                onChange={handleInvoiceChange}
                labelId='invoice-select'
              >
                <MenuItem value='Everyone'>Everyone</MenuItem>
                <MenuItem value='OneCloud'>OneCloud</MenuItem>
                <MenuItem value='Televoip'>Televoip</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='filter-select'>Filter By</InputLabel>
              <Select fullWidth label='Filter By' value={filter} onChange={handleFilterChange} labelId='filter-select'>
                <MenuItem value='Date of Issue'>Date of Issue</MenuItem>
                <MenuItem value='Collection Date'>Collection Date</MenuItem>
                <MenuItem value='Expiry Date'>Expiry Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label='From the'
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label='To the'
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='payment-select'>Payment</InputLabel>
              <Select
                fullWidth
                label='Payment'
                onChange={handlePaymentChange}
                labelId='payment-select'
                value={paymentFilter}
              >
                {paymentData.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='state-select'>State</InputLabel>
              <Select fullWidth label='State' onChange={handleStateChange} labelId='state-select' value={state}>
                {stateData.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Invoice Number' />
          </Grid>
        </Grid>
      </DialogBox>

      <InvoiceSummaryList setData={setData} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default Index
