import { Autocomplete, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/system'
import InventionCalender from './InventionCalender'
import Icon from 'src/@core/components/icon'
import { TrafficTelTypes } from 'src/types/apps/userTypes'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
const hoursInDay = Array.from({ length: 24 }, (_, i) => `${i}:00`)

interface TrafficType {
  id: string
  title: string
}

const index = () => {
  const [selectedOption, setSelectedOption] = useState<TrafficType | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [cardData, setCardData] = useState<TrafficType | null>()
  const [startDay, setStartDay] = useState(new Date())
  const [daysOfWeeks, setDaysOfWeek] = useState([])
  const [monthDate, setMonthDate] = useState(new Date())

  const updateStartDay = increment => {
    const newStartDay = new Date(startDay)
    newStartDay.setDate(newStartDay.getDate() + increment)
    setStartDay(newStartDay)
  }

  const handleOptionChange = (event: React.SyntheticEvent, value: TrafficTelTypes | null) => {
    setSelectedOption(value)
  }

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate)
    prevDay.setDate(prevDay.getDate() - 1)
    setCurrentDate(prevDay)
    const prevMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1)
    setMonthDate(prevMonth)
    updateStartDay(-7)
  }

  const handleNextDay = () => {
    const nextDay = new Date(currentDate)
    nextDay.setDate(nextDay.getDate() + 1)
    setCurrentDate(nextDay)
  
    const nextMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1)
    setMonthDate(nextMonth)
  
    updateStartDay(7)
  }
  

  useEffect(() => {
    const generateDaysOfWeek = () => {
      const newDaysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startDay) 
        date.setDate(startDay.getDate() + i - startDay.getDay() + 1) 

        const dayLabel = date.toLocaleString('en-us', { weekday: 'short' })
        const monthDate = date.toLocaleString('en-us', { month: 'short', day: 'numeric' })
        return { label: dayLabel, date: monthDate }
      })
      setDaysOfWeek(newDaysOfWeek)
    }

    generateDaysOfWeek()
  }, [startDay])

  const handleToday = () => {
    setCurrentDate(new Date())
    setStartDay(new Date())
    setMonthDate(new Date())
  }

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  const formattedMonthDate = monthDate.toLocaleDateString(undefined, {
    month: 'short',
    year: 'numeric'
  })

  const formattedWeekDate = startDay.toLocaleDateString(undefined, {
    year: 'numeric'
  })


  const getDateRange = () => {
    if (daysOfWeeks.length > 0) {
      const start = `${daysOfWeeks[0].date},${formattedWeekDate}`
      const end = `${daysOfWeeks[daysOfWeeks.length - 1].date}, ${formattedWeekDate}`
      return `${start} - ${end}`
    }
    return ''
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Day',
            columns: null,
            row: null
          },
          {
            id: 2,
            title: 'Week',
            columns: null,
            row: null
          },
          {
            id: 3,
            title: 'Month',
            columns: null,
            row: null
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
  }, [])

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Autocomplete
          autoHighlight
          id='add-members'
          options={cardData}
          getOptionLabel={option => option.title || ''}
          disableClearable
          renderInput={params => <TextField {...params} size='small' sx={{ width: '150px' }} />}
          value={selectedOption}
          onChange={handleOptionChange}
        />
        {selectedOption && selectedOption.title === 'Day' ? (
          <Typography variant='h6'>{formattedDate}</Typography>
        ) : selectedOption && selectedOption.title === 'Week' ? (
          <Typography variant='h6'>{getDateRange()}</Typography>
        ) : selectedOption && selectedOption.title === 'Month' ? (
          <Typography variant='h6'>{formattedMonthDate}</Typography>
        ) : null}

        <Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            <IconButton onClick={handlePrevDay} aria-label='previous'>
              <Icon icon='ooui:next-rtl' />
            </IconButton>
            <Button onClick={handleToday}>Today</Button>
            <IconButton onClick={handleNextDay} aria-label='next'>
              <Icon icon='ooui:next-ltr' />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 7 }}>
        {selectedOption && selectedOption.title === 'Day' && (
          <InventionCalender
            monthDate={monthDate}
            currentDate={currentDate}
            type='day'
            daysOfWeeks={daysOfWeeks}
            days={daysOfWeek}
            hours={hoursInDay}
          />
        )}
        {selectedOption && selectedOption.title === 'Week' && (
          <InventionCalender
            monthDate={monthDate}
            currentDate={currentDate}
            type='week'
            daysOfWeeks={daysOfWeeks}
            days={daysOfWeek}
            hours={hoursInDay}
          />
        )}
        {selectedOption && selectedOption.title === 'Month' && (
          <InventionCalender
            currentDate={currentDate}
            monthDate={monthDate}
            type='month'
            daysOfWeeks={daysOfWeeks}
            days={daysOfWeek}
            hours={hoursInDay}
          />
        )}
      </Box>
    </Box>
  )
}

export default index
