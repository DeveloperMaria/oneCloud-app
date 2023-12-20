import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { PassiveType } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import toast from 'react-hot-toast'

interface CellType {
  row: PassiveType
}

interface PassiveProps {
  setData: React.Dispatch<React.SetStateAction<PassiveType[]>>
  filteredData: PassiveType[]
  data: PassiveType[]
}

const InvoiceSummaryList: React.FC<PassiveProps> = ({setData, filteredData, data }) => {
 
  
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
      flex: 0.2,
      minWidth: 180,
      field: 'supplierCompanyName',
      headerName: 'Supplier Company Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.supplierCompanyName}
          </Typography>
        )
      }
    },

    {
      flex: 0.2,
      minWidth: 100,
      field: 'crediteNote',
      headerName: 'Credit note',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.crediteNote}
              control={<Checkbox name='basic-unchecked' checked={row.crediteNote === true} />}
            />
          </FormGroup>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'number',
      headerName: 'Number',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.number}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'issueDate',
      headerName: 'Date of issue',
      renderCell: ({ row }: CellType) => {

        return <Typography noWrap>{row.issueDate}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'expireDate',
      headerName: 'Expiry Date',
      renderCell: ({ row }: CellType) => {

        return (
          <Typography variant='body2' noWrap>
            {row.expireDate}
          </Typography>
        )
      }
    },

   

    {
      flex: 0.1,
      minWidth: 150,
      field: 'totalDocument',
      headerName: 'Total document',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalDocument}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'payment',
      headerName: 'Payment mode',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.payment}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'note',
      headerName: 'Note',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.note}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 80,
      sortable: false,
      field: 'status',
      headerName: '',
      renderCell: ({ row }: CellType) => (
        <>
          <IconButton  >
            <Icon icon='mdi:edit-outline' />
          </IconButton>
          <IconButton>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </>
      )
    }
  ]

  return  <CommonList
  setData={setData}
  filteredData={filteredData}
  data={data}
  columns={columns}
/>
}

export default InvoiceSummaryList
