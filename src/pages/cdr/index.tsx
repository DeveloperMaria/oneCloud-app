import { useEffect, useState } from 'react'
import { DetailType,TotalType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import {  getAllDetail, getAllTotal } from './api'
import { Autocomplete, Button, Checkbox, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import CdrList from './CdrList'
import DialogBox from 'src/components/DialogBox'
import {  DetailColumns, TotalColumns } from 'src/components/CdrColumns'

interface ServicesTypes {
  id: string
  title: string
  columns: string
  row: string
  service: string
}

const fetchData = async (getDataFunction, setDataFunction) => {
    try {
      const allData = await getDataFunction();
      setDataFunction(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const index = () => {
  const [MonthData, setMonthData] = useState<ServicesTypes | null>()
  const [dataYear, setDataYear] = useState<ServicesTypes | null>()
  const [DetailData, setDetailData] = useState<ServicesTypes | null>()
  const [DetailColumnData, setDetailColumnData] = useState<DetailType[] | undefined>(undefined)
  const [TotalColumnData, setTotalColumnData] = useState<TotalType[] | undefined>(undefined)
  const [selectedOption, setSelectedOption] = useState<ServicesTypes | null>(null)
  const [DetailOption, setDetailOption] = useState<ServicesTypes | null>(null)
  const [yearOption, setYearOption] = useState<ServicesTypes | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [showExportModal, setShowExportModal] = useState<boolean>(false)
  const [loadCdr, setLoadCdr] = useState<boolean>(false)
  const [openTicket, setOpenTicket] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [title, setTitle] = useState<string>('Export CDR')





  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllDetail()
        setDetailColumnData(allData)
      } catch (error) {
        console.error('Error fetching CDR Detail', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllTotal()
        setTotalColumnData(allData)
      } catch (error) {
        console.error('Error fetching CDR Total', error)
      }
    }

    fetchData()
  }, [])

  const DetailColumn = DetailColumns()
  const TotalColumn = TotalColumns()

  useEffect(() => {
    fetchData(getAllDetail, setDetailColumnData)
    fetchData(getAllTotal, setTotalColumnData)

    const fetchAllData = async () => {
      try {
        const newMonthData = [
            {
              id: 1,
              title: '1st',
              service: 'No 1st Month Data'
            },
            {
              id: 2,
              title: '2nd',
              service: 'No 2st Month Data'
            },
            {
              id: 3,
              title: '3rd',
              service: 'No 3rd Month Data'
            },
            {
              id: 4,
              title: '4th',
              service: 'No 4th Month Data'
            },
            {
              id: 5,
              title: '5th',
              service: 'No 5th Month Data',
            },
            {
              id: 6,
              title: '6th',
              service: 'No 6th Month Data',
            },
            {
              id: 7,
              title: '7th',
              service: 'No 7th Month Data'
            },
            {
              id: 8,
              title: '8th',
              service: 'No 8th Month Data'
            },
            {
              id: 9,
              title: '9th',
              service: 'No 9th Month Data'
            },
            {
              id: 10,
              title: '10th',
              service: 'No 10th Month Data'
            },
            {
              id: 11,
              title: '11th',
              service: 'No 11th Month Data'
            },
            {
              id: 12,
              title: '12th',
              service: 'No 12th Month Data'
            },
          ]
          setMonthData(newMonthData)
          if (selectedOption === null || selectedOption.id === newMonthData[0].id) {
            setSelectedOption(newMonthData[0])
          } else {
            const selectedFromNewData = newMonthData.find(item => item.id === selectedOption.id)
            if (selectedFromNewData) {
              setSelectedOption(selectedFromNewData)
            } else {
              setSelectedOption(newMonthData[0])
            }
          }

       const newYearData = [
            {
              id: 1,
              title: '2019',
              service: 'No Data 2019'
            },
            {
              id: 2,
              title: '2020',
              service: 'No Data 2020'
            },
            {
              id: 3,
              title: '2021',
              service: 'No Data 2021'
            },
            {
              id: 4,
              title: '2022',
              service: 'No Data 2022'
            },
            {
              id: 5,
              title: '2023',
              service: 'No Data 2023'
            }
          ]
          setDataYear(newYearData)
          if (yearOption === null || yearOption.id === newYearData[0].id) {
            setYearOption(newYearData[0])
          } else {
            const selectedFromNewData = newYearData.find(item => item.id === yearOption.id)
            if (selectedFromNewData) {
              setYearOption(selectedFromNewData)
            } else {
              setYearOption(newYearData[0])
            }
          }

        const newDetailData = [
            {
              id: 1,
              title: 'Detail',
              columns:DetailColumn,
              row:DetailColumnData,
              service: 'No Detail Data'
            },
            {
              id: 2,
              title: 'Total',
              columns:TotalColumn,
              row:TotalColumnData,
              service: 'No Total Data'
            },
            {
              id: 3,
              title: 'Grid Months',
              service: 'No Grid Months'
            },
          
          ]
          setDetailData(newDetailData)
        if (DetailOption === null || DetailOption.id === newDetailData[0].id) {
          setDetailOption(newDetailData[0])
        } else {
          const selectedFromNewData = newDetailData.find(item => item.id === DetailOption.id)
          if (selectedFromNewData) {
            setDetailOption(selectedFromNewData)
          } else {
            setDetailOption(newDetailData[0])
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [])

  const handleYearOptionChange = (event, value) => {
    setYearOption(value);
  };
  
  const handleMonthOptionChange = (event, value) => {
    setSelectedOption(value);
  };
  
  const handleDetailOptionChange = (event, value) => {
    setDetailOption(value);
  };

  const handleSubmit =()=>{}
  const handleButtonClick =()=>{}


  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{display:'flex',alignItems:'center'}}>
          <Autocomplete
            autoHighlight
            id='add-members'
            options={dataYear}
            getOptionLabel={option => option.title || ''}
            disableClearable
            renderInput={params => <TextField {...params} size='small' sx={{mr:5, width: '100px' }} />}
            value={yearOption}
            onChange={handleYearOptionChange}
            />
            <Typography sx={{pr:2}}>Months: </Typography>
          <Autocomplete
            autoHighlight
            id='add-members'
            options={MonthData}
            getOptionLabel={option => option.title || ''}
            disableClearable
            renderInput={params => <TextField {...params} size='small' sx={{mr:5, width: '100px' }} />}
            value={selectedOption}
            onChange={handleMonthOptionChange}
            />
              <Button variant='contained' sx={{ mr: 5 }} onClick={() => setLoadCdr(true)}>
           Load CDR
          </Button>
             <Button variant='contained' sx={{ mr: 5 }} onClick={() => setShowExportModal(true)}>
            Export
          </Button>
      
          <Button variant='contained' >
            Generate Article
          </Button>
        </Box>
        <Autocomplete
            autoHighlight
            id='add-members'
            options={DetailData}
            getOptionLabel={option => option.title || ''}
            disableClearable
            renderInput={params => <TextField {...params} size='small' sx={{ width: '200px' }} />}
            value={DetailOption}
            onChange={handleDetailOptionChange}
            />

      </Box>
      <DialogBox
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='Customer Name'
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField fullWidth type='date'   InputLabelProps={{
                shrink: true
              }} label='Start Date' value={startDate} onChange={e => setStartDate(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth type='date'   InputLabelProps={{
                shrink: true
              }} label='End Date' value={endDate} onChange={e => setEndDate(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
              <FormControlLabel
                label='Open ticket and send to customer'
                control={
                  <Checkbox
                    name='basic-unchecked'
                    checked={openTicket}
                    onChange={e => setOpenTicket(e.target.checked)}
                  />
                }
              />
            </Grid>
        </Grid>
      </DialogBox>

      <DialogBox
        open={loadCdr}
        onClose={() => setLoadCdr(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6} sx={{display:'flex',alignItems:'center'}}>
        <Grid item sm={6} xs={12}>
            <InputLabel sx={{ color: '#9155fd', pb: 3 }}>Import monthly CDR</InputLabel>
            <TextField type='file' />
          </Grid>      
          <Grid item sm={6} xs={12}>
            <Button variant='contained'>Import from FTP</Button>
        </Grid>
        </Grid>
       
      </DialogBox>

      <Box sx={{ mt: 7 }}>
        <CdrList selectedCard={DetailOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
