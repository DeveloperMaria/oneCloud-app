import { useEffect, useState } from 'react'
import { CreditNotesType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import AutoComplete from 'src/components/AutoComplete'
import {  getAllCreditNote } from './api'
import CreditNoteList from './CreditNoteList'
import { CreditNoteColumns } from 'src/components/CreditNoteColumns'

interface CreditNoteTypes {
  id: string
  title: string
  columns: string
  row: string
  service: string
}

const index = () => {
  const [cardData, setCardData] = useState<CreditNoteTypes | null>()
  const [selectedOption, setSelectedOption] = useState<CreditNoteTypes | null>(null)
  const [CreditData, setCreditData] = useState<CreditNotesType[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleOptionChange = (event: React.SyntheticEvent, value: CreditNotesType | null) => {
    setSelectedOption(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllCreditNote()
        setCreditData(allData)
      } catch (error) {
        console.error('Error fetching Credit Note:', error)
      }
    }

    fetchData()
  }, [])

  const invoiceColumns = CreditNoteColumns()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
       
          {
            id: 1,
            title: '2023',
            columns: invoiceColumns,
            row: CreditData,
            service: 'No Data 2023',
          },
        ]

        setCardData(newCardData)
      setSelectedOption(newCardData[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [CreditData])

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>

      <AutoComplete
        onChange={handleOptionChange}
        cardData={cardData}
        selectedOption={selectedOption}
        isOptionEqualToValue={(option, value) => option?.id === value?.id && option?.title === value?.title}
      />
      </Box>

      <Box sx={{ mt: 7 }}>
        <CreditNoteList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
