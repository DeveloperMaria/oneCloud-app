import { useEffect, useState } from 'react'
import { ExerciseType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import AutoComplete from 'src/components/AutoComplete'
import { getAllExercise } from './api'
import ServicesList from './ServicesList'
import DialogBox from 'src/components/DialogBox'
import { Autocomplete, Button, ButtonGroup, Grid, TextField } from '@mui/material'
import { ExerciseColumns } from 'src/components/ExerciseColumns'

interface ServicesTypes {
  id: string
  title: string
  columns: string
  row: string
  service: string
  button: string
}

const index = () => {
  const [cardData, setCardData] = useState<ServicesTypes | null>()
  const [dataService, setDataService] = useState<ServicesTypes | null>()
  const [selectedOption, setSelectedOption] = useState<ServicesTypes | null>(null)
  const [serviceOption, setServiceOption] = useState<ServicesTypes | null>(null)
  const [ServiceData, setServiceData] = useState<ServicesTypes[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [title, setTitle] = useState('Filter')
  const [or, setOr] = useState<string>('')
  const [toThe, setTothe] = useState<string>('')
  const [activationData, setActivationDate] = useState<string>('')
  const [billingStartDate, setBillingStartDate] = useState<string>('')
  const [exerciseData, setExerciseData] = useState<ExerciseType[] | undefined>(undefined)
  const [selectedButton, setSelectedButton] = useState(null)

  const handleOptionChange = buttonId => {
    setSelectedButton(buttonId)
    const selected = cardData.find(item => item.id === buttonId)
    if (selected) {
      setSelectedOption(selected)
    }
  }

  const handleServiceChange = (event: React.SyntheticEvent, value: ExerciseType | null) => {
    setServiceOption(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllExercise()
        setExerciseData(allData)
      } catch (error) {
        console.error('Error fetching Ticket:', error)
      }
    }

    fetchData()
  }, [])

  const ExerciseColumn = ExerciseColumns()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Supplies',
            columns: null,
            row: null,
            service: 'No Supplies'
          },
          {
            id: 2,
            title: 'Sent',
            columns: null,
            row: null,
            service: 'No Sent'
          },
          {
            id: 3,
            title: 'In Delivery',
            columns: null,
            row: null,
            service: 'No In Delivery'
          },
          {
            id: 4,
            title: 'Get Active',
            columns: null,
            row: null,
            service: 'No Get Active'
          },
          {
            id: 5,
            title: 'Waiting for first billing',
            columns: null,
            row: null,
            service: 'No first billing',
            button: {
              filter: 'filter',
              onClick: () => {
                setShow1(true)
              }
            }
          },
          {
            id: 6,
            title: 'In Exercise',
            columns: exerciseData,
            row: ExerciseColumn,
            service: 'No Exercise',
            button: {
              filter: 'filter',
              onClick: () => {
                setShow2(true)
              }
            }
          },
          {
            id: 7,
            title: 'In operation - No Invoices',
            columns: null,
            row: null,
            service: 'No Invoices'
          },
          {
            id: 8,
            title: 'Closing',
            columns: null,
            row: null,
            service: 'No Closing'
          }
        ]

        setCardData(newCardData)
        if (selectedOption === null || selectedOption.id === newCardData[0].id) {
          setSelectedOption(newCardData[0])
          setSelectedButton(newCardData[0]?.id)
        } else {
          const selectedFromNewData = newCardData.find(item => item.id === selectedOption.id)
          if (selectedFromNewData) {
            setSelectedOption(selectedFromNewData)
            setSelectedButton(selectedFromNewData?.id)
          } else {
            setSelectedOption(newCardData[0])
            setSelectedButton(newCardData[0]?.id)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [exerciseData])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newDataSerices = [
          {
            id: 1,
            title: 'Voice Services',
            service: 'No Voice Services'
          },
          {
            id: 2,
            title: 'Genetic Services',
            service: 'No Genetic Services'
          }
        ]

        setDataService(newDataSerices)
        if (serviceOption === null || serviceOption.id === newDataSerices[0].id) {
          setServiceOption(newDataSerices[0])
        } else {
          const selectedFromNewData = newDataSerices.find(item => item.id === serviceOption.id)
          if (selectedFromNewData) {
            setServiceOption(selectedFromNewData)
          } else {
            setServiceOption(newDataSerices[0])
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [])

  const handleSubmit = () => {}
  const handleButtonClick = () => {
    setShow1(true)
    if ('') {
      setShow1(true)
    }
  }

  const handleSubmit1 = () => {}
  const handleButtonClick1 = () => {
    setShow1(true)
    if ('') {
      setShow1(true)
    }
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Autocomplete
            autoHighlight
            id='add-members'
            options={dataService}
            getOptionLabel={option => option.title || ''}
            disableClearable
            renderInput={params => <TextField {...params} size='small' sx={{ width: '180px' }} />}
            value={serviceOption}
            onChange={handleServiceChange}
          />
        </Box>
        <Box>
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            {cardData &&
              cardData.map(button => (
                <Button
                  key={button.id}
                  variant={selectedButton === button.id ? 'contained' : 'outlined'}
                  onClick={() => handleOptionChange(button.id)}
                  sx={{ px: 3 }}
                >
                  {button.title}
                </Button>
              ))}
          </ButtonGroup>
        </Box>
      </Box>
      <DialogBox
        open={show1}
        onClose={() => setShow1(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              label='Activation date from'
              InputLabelProps={{
                shrink: true
              }}
              value={activationData}
              onChange={e => setActivationDate(e.target.value)}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='to the'
              value={toThe}
              onChange={e => setTothe(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='or' value={or} onChange={e => setOr(e.target.value)} />
          </Grid>
        </Grid>
      </DialogBox>

      <DialogBox
        open={show2}
        onClose={() => setShow2(false)}
        handleSubmit={handleSubmit1}
        handleButtonClick={handleButtonClick1}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='Billing start date from'
              value={billingStartDate}
              onChange={e => setBillingStartDate(e.target.value)}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              label='to the'
              value={toThe}
              onChange={e => setTothe(e.target.value)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='or' value={or} onChange={e => setOr(e.target.value)} />
          </Grid>
        </Grid>
      </DialogBox>

      <Box sx={{ mt: 7 }}>
        <ServicesList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
