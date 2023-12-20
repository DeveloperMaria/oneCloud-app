import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { TrafficTelTypes } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import { getAllTrafficTell } from './api'
import TraficTelllList from './TraficTelllList'
import AutoComplete from 'src/components/AutoComplete'
import generateCardData from 'src/@fake-db/TrafficTelData'

interface TrafficType {
  id: string
  title: string
}

const index = () => {
  // ** States
  const [data, setData] = useState<TrafficTelTypes[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [billingMonth, setBillingMonth] = useState<string>('')
  const [title, setTitle] = useState('Import telephone traffic from MOR')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [filteredData, setFilteredData] = useState<TrafficTelTypes[]>([])
  const [cardData, setCardData] = useState<TrafficType | null>()
  const [selectedOption, setSelectedOption] = useState<TrafficType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllTrafficTell()
        setData(allData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Traffic Tel:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleOptionChange = (event: React.SyntheticEvent, value: TrafficTelTypes | null) => {
    setSelectedOption(value)
  }

  const handleButtonClick = () => {
    setShow(true)
    if (!userId) {
      setShow(true)
    }
  }

  const handleSubmit = () => {}

  useEffect(() => {
    const fetchAllData = async () => {
        try {
          const newCardData = generateCardData();
          setCardData(newCardData);
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
  }, [])

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Import Traffic
          </Button>
          <Button variant='contained'>Rest More Balance</Button>
        </Box>
        <AutoComplete
          onChange={handleOptionChange}
          cardData={cardData}
          selectedOption={selectedOption}
          isOptionEqualToValue={(option, value) => option?.id === value?.id && option?.title === value?.title}
        />
      </Box>

      <DialogBox
        open={show}
        onClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={12} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='Billing month'
              value={billingMonth}
              onChange={e => setBillingMonth(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogBox>

      <TraficTelllList filteredData={filteredData} setData={setData} loading={loading} data={data} />
    </Box>
  )
}

export default index
