import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import {  GridColDef } from '@mui/x-data-grid'
import { rows } from 'src/@fake-db/card-data'
import { CardType1,CardType2,CardType3,CardType4 } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import HomeCard from './HomeCard'
import { Autocomplete,  Checkbox,  FormControlLabel,  FormGroup,  TextField } from '@mui/material'

interface CellType {
  row: CardType1
}
interface CellType1 {
  row: CardType2
}interface CellType2 {
  row: CardType3
}interface CellType3 {
  row: CardType4
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

interface TicketData {
  id: number
  title: string
  columns: string
  row: string
  service: string
}


const index = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<rows[] | CardType1[] | CardType2[]|CardType3[] |CardType4[] >([])
  const [selectedOption, setSelectedOption] = useState<CardType1 | CardType2|CardType3|CardType4 | null>(null);

 

  const handleOptionChange = (event: React.SyntheticEvent, value: CardType1 | CardType2|CardType3|CardType4 |null) => {
    setSelectedOption(value);
  };


  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'service',
      headerName: 'Service',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.service}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'customer',
      headerName: 'Customer',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.customer}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'address',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.address}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'billing',
      headerName: 'Billing',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.billing}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'activationDate',
      headerName: 'Activation Date',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.activationDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'issue',
      headerName: 'Issue of 1st Invoice',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.issue}
          </Typography>
        )
      }
    }
  ]

  const columns1: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'state',
      headerName: 'State',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.state}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'client',
      headerName: 'Client',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.client}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'lastUpdate',
      headerName: 'Last Update',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.lastUpdate}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'ticketType',
      headerName: 'Ticket Type',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ticketType}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'description',
      headerName: 'Description',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.description}
          </Typography>
        )
      }
    },

  ]

  const columns2: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'service',
      headerName: 'Service',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.service}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'client',
      headerName: 'Client',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.client}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'address',
      headerName: 'Address',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.address}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'inDeliveryDate',
      headerName: 'In Delivery Date',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.inDeliveryDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dac',
      headerName: 'DAC',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.dac}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'configuredDevice',
      headerName: 'Configured Device',
      renderCell: ({ row }: CellType2) => {
        return (
          <FormGroup row>
          <FormControlLabel
            label={row.configuredDevice}
            control={<Checkbox name='basic-unchecked' checked={row.configuredDevice} />}
          />
        </FormGroup>
        )
      }
    },

  ]

  const columns3: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'number',
      headerName: 'Number',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.number}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'client',
      headerName: 'Client',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.client}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'dateOfIssue',
      headerName: 'Date of Issue',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.dateOfIssue}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'expiryDate',
      headerName: 'Expiry Date',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.expiryDate}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'amountDue',
      headerName: 'Amount Due',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.amountDue}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'payment',
      headerName: 'Payment',
      renderCell: ({ row }: CellType3) => {
        return (
          <Typography variant='body2' noWrap>
            {row.payment}
          </Typography>
        )
      }
    },

  ]

  const cardData = [
    {
      id: 1,
      title: 'TICKET NR. 0',
      columns: columns1,
      row: null,
      service: 'No new tickets'
    },
    {
      id: 2,
      title: 'SERVICES IN THE DELIVERY PHASE NO. 0',
      columns: columns2,
      row: null,
      service: 'No delivery service!'
    },
    {
      id: 3,
      title: 'SERVIZI IN MONITORING NR. 0',
      columns: null,
      row: null,
      service: 'No services selected to be monitored!'
    },
    {
      id: 4,
      title: 'INSOLVENCY WITH BLOCKED SERVICES NO. 0 - €0.00',
      columns: columns3,
      row: null,
      service: 'There are no invoices for bulk services'
    },
    {
      id: 5,
      title: 'SERVICES PENDING BILLING NO. 1',
      columns: columns,
      row: rows.slice(0, 10),
      service:'There are no billing'

    }
  ]
  const [data] = useState<TicketData[] |  CardType1[] | CardType2[]|CardType3[] |CardType4[]>(rows)

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        if (row[field] !== null && row[field] !== undefined) {
          return searchRegex.test(row[field].toString())
        }
        return false
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  const filteredCardData = cardData.filter((card) => {
    if (selectedOption) {
      return card.title === selectedOption.title;
    }
    return true;
  });

  useEffect(() => {
    setSelectedOption(cardData[0]);
  }, []);

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Autocomplete
        autoHighlight
        id='add-members'
        options={cardData}
        getOptionLabel={(option) => option.title || ''}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} size='small' sx={{ width: '300px' }} />
        )}
        value={selectedOption}
        onChange={handleOptionChange}
      />
      <QuickSearchToolbar
        value={searchText}
        clearSearch={() => handleSearch('')}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </Box>
    <Box sx={{ marginTop: '1.8em' }}>
      <HomeCard filteredData={filteredCardData} filterData={filteredData}  data={data}  selectedCard={selectedOption} />
    </Box>
  </Box>
  )
}

export default index
