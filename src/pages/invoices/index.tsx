import { useEffect, useState } from 'react'
import { ControlPanelType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import AutoComplete from 'src/components/AutoComplete'
import { getAllArticle } from './api'
import InvoicesList from './InvoicesList'
import { InvoiceColumns } from 'src/components/InvoiceColumns'

interface InvoicesTypes {
  id: string
  title: string
  columns: string
  row: string
  service: string
}

const index = () => {
  const [cardData, setCardData] = useState<InvoicesTypes | null>()
  const [selectedOption, setSelectedOption] = useState<InvoicesTypes | null>(null)
  const [InvoiceData, setInvoiceData] = useState<ControlPanelType[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleOptionChange = (event: React.SyntheticEvent, value: ControlPanelType | null) => {
    setSelectedOption(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllArticle()
        setInvoiceData(allData)
      } catch (error) {
        console.error('Error fetching Article:', error)
      }
    }

    fetchData()
  }, [])

  const invoiceColumns = InvoiceColumns()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
       
          {
            id: 1,
            title: '2023',
            columns: invoiceColumns,
            row: InvoiceData,
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
  }, [InvoiceData])

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
        <InvoicesList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
