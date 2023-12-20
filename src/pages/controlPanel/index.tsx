import { useEffect, useState } from 'react'
import { ControlPanelType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import AutoComplete from 'src/components/AutoComplete'
import { getAllArticle } from './api'
import ControlPanelList from './ControlPanelList'
import { ServiceColumns } from 'src/components/ControlPanelColumns'

interface ControlPanelTypes {
  id: string
  title: string
  columns: string
  row: string
  service: string
  dropDown: string
}

const index = () => {
  const [cardData, setCardData] = useState<ControlPanelTypes | null>()
  const [selectedOption, setSelectedOption] = useState<ControlPanelTypes | null>(null)
  const [ControlPanelData, setControlPanelData] = useState<ControlPanelType[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleOptionChange = (event: React.SyntheticEvent, value: ControlPanelType | null) => {
    setSelectedOption(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllArticle()
        setControlPanelData(allData)
      } catch (error) {
        console.error('Error fetching Control Panel:', error)
      }
    }

    fetchData()
  }, [])

  const serviceColumns = ServiceColumns()

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Client',
            columns: null,
            row: null,
            service: 'No Client'
          },
          {
            id: 2,
            title: 'Data Service',
            columns: serviceColumns,
            row: ControlPanelData,
            service: 'No Data Service',
            dropDown: {
              name1: 'Generate XML',
              name2: 'Generate CSV',
              name3: 'Comunicall',
              name4: 'Radius',
              name5: 'Mikrotik',
              name6: 'Finish Configration',
              name7: 'Delete',
              name8: 'File Browser'
            }
          },
          {
            id: 3,
            title: 'Voice Service',
            columns: null,
            row: null,
            service: 'No Voice Service'
          },
          {
            id: 4,
            title: 'Generic Service',
            columns: null,
            row: null,
            service: 'No Generic Service'
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
  }, [ControlPanelData])

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
        <ControlPanelList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
