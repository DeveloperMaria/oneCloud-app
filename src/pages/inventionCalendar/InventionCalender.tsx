import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material'
import styled from '@emotion/styled'
import { Box } from '@mui/system'

const HourRow = styled(TableRow)`
  border-bottom: 1px solid #ccc;
`

const HourCell = styled(TableCell)`
  padding: 8px;
  border: 1px solid #ccc;
  ${({ isCurrentDay }) => (isCurrentDay ? 'background-color: #e6e6e6;' : '')}
`
const HourCell1 = styled(TableCell)`
  width: 1202px;
  border: 1px solid #ccc;
  background-color: ${({ isCurrentDay }) => (isCurrentDay ? '#e6e6e6' : 'transparent')};
`

const StyledTableCell = styled(TableCell)`
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:not(:first-of-type) {
    border-left: none;
    border-right: none;
  }
`

const InventionCalender = ({ type, days, hours, currentDate, daysOfWeeks, monthDate }) => {
  const today = new Date().toLocaleDateString()

  const displayHoursOfDay = date => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      const isCurrentDate = date.toLocaleDateString() === today
      const hour = i % 23 === 0 ? '23' : `${i % 23 || 23}`

      const period = i < 12 ? 'AM' : 'PM'
      const displayHour = `${hour}:00 ${period}`

      if (i !== 0) {
        hours.push(
          <HourRow key={i}>
            <HourCell>{isCurrentDate ? <strong>{displayHour}</strong> : displayHour}</HourCell>
            <HourCell1 isCurrentDay={isCurrentDate}></HourCell1>{' '}
          </HourRow>
        )
      }
    }

    return hours
  }

  const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const displayTable = () => {
    if (type === 'day') {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableBody>{displayHoursOfDay(currentDate)}</TableBody>
          </Table>
        </TableContainer>
      )
    } else if (type === 'week') {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: 30 }}></StyledTableCell>
                {daysOfWeeks.map((day, index) => (
                  <StyledTableCell key={index}>{`${day.label}, ${day.date}`}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {hours.map((hour, hourIndex) => (
                <TableRow key={hourIndex}>
                  <HourCell isHourCell>{hour}</HourCell>
                  {days.map((day, dayIndex) => (
                    <HourCell
                      key={`${dayIndex}-${hourIndex}`}
                      isHourCell
                      isCurrentDay={currentDate.toLocaleDateString() === today && dayIndex + 1 === currentDate.getDay()}
                    ></HourCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else if (type === 'month') {
      const firstDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
      const startingDay = firstDayOfMonth.getDay() - 1
      const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
      const daysInPrevMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 0).getDate()

      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, height: 400 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {dayOfWeek.map((day, index) => (
                  <StyledTableCell key={index}>{day}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: Math.ceil((daysInMonth + startingDay) / 7) }, (_, weekIndex) => (
                <TableRow key={weekIndex}>
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const dayNumber = weekIndex * 7 + dayIndex - startingDay + 1
                    let day = ''

                    if (dayNumber > 0 && dayNumber <= daysInMonth) {
                      day = dayNumber
                    } else if (dayNumber <= 0) {
                      day = daysInPrevMonth + dayNumber
                    } else {
                      day = dayNumber - daysInMonth
                    }

                    const currentDate1 = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)
                    return (
                      <HourCell
                        key={`${weekIndex}-${dayIndex}`}
                        isHourCell
                        isCurrentDay={day > 0 && currentDate1.toDateString() === new Date().toDateString()}
                      >
                        {day > 0 ? day : ''}
                      </HourCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    return null
  }

  return <Box>{displayTable()}</Box>
}

export default InventionCalender
