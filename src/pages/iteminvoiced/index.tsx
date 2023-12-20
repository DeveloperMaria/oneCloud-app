import { useEffect, useState } from 'react'
import { TelevoipTypes, BundleType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import { getAllUser, updateUser } from './api'
import DialogBox from 'src/components/DialogBox'
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material'
import ItemInvoicedList from './ItemInvoicedList'
import toast from 'react-hot-toast'
import { TelevoipColumns } from 'src/components/ItemInvoiceColumns'
import { buttons, vatValue } from 'src/@fake-db/ItemInvoicedData'

interface ItemIvoicedType {
  id: string
  title: string
  columns: string
  row: string
  service: string
}

const index = () => {
  const [cardData, setCardData] = useState<ItemIvoicedType | null>()
  const [selectedOption, setSelectedOption] = useState<ItemIvoicedType | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('MUNICIPALITY OF RAIANO')
  const [Description, setDescription] = useState<string>('')
  const [PriceVAT, setPriceVAT] = useState<number>()
  const [Discount, setDiscount] = useState<number>()
  const [Amount, setAmount] = useState<number>()
  const [VAT, setVAT] = useState<string>('')
  const [Position, setPosition] = useState<number>()
  const [BillingFrom, setBillingFrom] = useState<string>('')
  const [TotalExclVAT, setTotalExclVAT] = useState<number>()
  const [Tax, setTax] = useState<number>()
  const [TotalIncludVAT, setTotalIncludVAT] = useState<number>()
  const [televoipData, setTelevoipData] = useState<TelevoipTypes[] | undefined>(undefined)
  const [bundleData, setBundleData] = useState<BundleType[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [invoiceItem, setInvoiceItem] = useState<string | null>(null)
  const [NextInvoice, setNextInvoice] = useState<number>()
  const [BillingStartDate, setBillingStartDate] = useState<number>()
  const [DateOfIssue, setDateOfIssue] = useState<number>()
  const [ExpiryDate, setExpiryDate] = useState<number>()
  const [showFilters2, setShowFilters2] = useState<boolean>(false)

  const theme = useTheme()

  const handleOptionChange = (event: React.SyntheticEvent, value: TelevoipTypes | null) => {
    setSelectedOption(value)
  }

  const onEdit1 = (partner: TelevoipTypes) => {
    setDescription(partner.Description)
    setPriceVAT(partner.PriceVAT)
    setDiscount(partner.Discount)
    setAmount(partner.Amount)
    setPosition(partner.Position)
    setVAT(partner.VAT)
    setBillingFrom(partner.BillingFrom)
    setInvoiceItem(partner.id)
    setShow(true)
    setTitle('MUNICIPALITY OF RAIANO')
  }

  const TelevoipColumn = TelevoipColumns({ setTelevoipData, onEdit1 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllUser()
        setTelevoipData(allData)
      } catch (error) {
        console.error('Error fetching Televoip:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'OneCloud',
            columns: null,
            row: null,
            service: 'No OneCloud'
          },
          {
            id: 2,
            title: 'Televoip',
            columns: TelevoipColumn,
            row: televoipData,
            service: 'No Televoip'
          }
        ]

        setCardData(newCardData)
        if (selectedOption === null || selectedOption.id === newCardData[0].id) {
          setSelectedOption(newCardData[0])
        } else {
          const selectedFromNewData = newCardData.find(item => item.id === selectedOption.id)
          if (selectedFromNewData) {
            setSelectedOption(selectedFromNewData)
          } else {
            setSelectedOption(newCardData[0])
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [televoipData, bundleData])

  const handleSubmit = async (event: React.FormEvent) => {}

  const handleButtonClick = () => {
    if (!invoiceItem) {
      setShow(true)
    }
  }

  const handleFilterButtonClick = buttonId => {
    if (buttonId === 5) {
      setShowFilters2(!showFilters2)
    }
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Autocomplete
          autoHighlight
          id='add-members'
          options={cardData}
          getOptionLabel={option => option.title || ''}
          disableClearable
          renderInput={params => <TextField {...params} size='small' sx={{ mr: 4, width: '200px' }} />}
          value={selectedOption}
          onChange={handleOptionChange}
        />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'right',
            [theme.breakpoints.down('lg')]: { justifyContent: 'left' }
          }}
        >
          {buttons.map((button, index) => (
            <Grid
              item
              sm={2}
              xs={12}
              sx={{
                mr: 4,
                [theme.breakpoints.down('lg')]: {
                  mt: 5
                }
              }}
              key={index}
            >
              <Button variant='contained' onClick={() => handleFilterButtonClick(button.id)}>
                {button.button}
              </Button>
            </Grid>
          ))}
        </Box>
      </Box>
      {showFilters2 && (
        <Box
          sx={{
            pt: 9,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'right',
            transition: 'opacity 0.3s ease-in-out, height 0.3s ease-in-out',
            opacity: 1,
            height: 'auto',
            overflow: 'hidden',
            [theme.breakpoints.down('lg')]: { justifyContent: 'left' }
          }}
        >
          <Grid
            item
            sm={2}
            xs={12}
            sx={{
              mr: 4,
              [theme.breakpoints.down('lg')]: {
                mt: 5
              }
            }}
          >
            <TextField
              fullWidth
              type='number'
              label='Next invoice'
              InputLabelProps={{
                shrink: true
              }}
              value={NextInvoice}
              onChange={e => setNextInvoice(e.target.value)}
            />
          </Grid>
          <Grid
            item
            sm={2}
            xs={12}
            sx={{
              mr: 4,
              [theme.breakpoints.down('lg')]: {
                mt: 5
              }
            }}
          >
            <TextField
              fullWidth
              type='date'
              label='Billing start date'
              InputLabelProps={{
                shrink: true
              }}
              value={BillingStartDate}
              onChange={e => setBillingStartDate(e.target.value)}
            />
          </Grid>
          <Grid
            item
            sm={2}
            xs={12}
            sx={{
              mr: 4,
              [theme.breakpoints.down('lg')]: {
                mt: 5
              }
            }}
          >
            <TextField
              fullWidth
              type='date'
              label='Date of issue'
              InputLabelProps={{
                shrink: true
              }}
              value={DateOfIssue}
              onChange={e => setDateOfIssue(e.target.value)}
            />
          </Grid>
          <Grid
            item
            sm={2}
            xs={12}
            sx={{
              mr: 4,
              [theme.breakpoints.down('lg')]: {
                mt: 5
              }
            }}
          >
            <TextField
              fullWidth
              type='date'
              label='Expiry date'
              InputLabelProps={{
                shrink: true
              }}
              value={ExpiryDate}
              onChange={e => setExpiryDate(e.target.value)}
            />
          </Grid>
        </Box>
      )}

      <DialogBox
        open={show}
        onClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              value={Description}
              onChange={e => setDescription(e.target.value)}
              multiline
              minRows={3}
              label='Description'
              sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Unit Price Excl. VAT'
              value={PriceVAT}
              onChange={e => setPriceVAT(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Discount' value={Discount} onChange={e => setDiscount(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Amount' value={Amount} onChange={e => setAmount(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='vat-select'>VAT</InputLabel>
              <Select fullWidth label='VAT' value={VAT} onChange={e => setVAT(e.target.value)} labelId='vat-select'>
                {vatValue.map((vatname, index) => (
                  <MenuItem key={index} value={vatname}>
                    {vatname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Position' value={Position} onChange={e => setPosition(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='Billing from'
              value={BillingFrom}
              onChange={e => setBillingFrom(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Total Excl. VAT' value={TotalExclVAT} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Tax' value={Tax} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Total including VAT' value={TotalIncludVAT} />
          </Grid>
        </Grid>
      </DialogBox>

      <Box sx={{ mt: 7 }}>
        <ItemInvoicedList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
