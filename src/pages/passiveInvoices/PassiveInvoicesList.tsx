import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { PassiveType } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { deletePassiveInvoice } from './api'
import toast from 'react-hot-toast'

interface CellType {
  row: PassiveType
}

interface PassiveProps {
  handleEdit: (passive: PassiveType) => void
  setData: React.Dispatch<React.SetStateAction<PassiveType[]>>
  filteredData: PassiveType[]
  data: PassiveType[]
}

const PassiveInvoicesList: React.FC<PassiveProps> = ({handleEdit,setData, filteredData, data }) => {
  
  const handleDelete = async (passiveId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this passiveInvoice?')
    if (confirmDelete) {
      try {
        await deletePassiveInvoice(passiveId)
        setData(prevData => prevData.filter(passive => passive.id !== passiveId))

        toast.success('PassiveInvoice deleted successfully')
      } catch (error) {
        toast.error('Error deleting passiveInvoice')
      }
    } else {
      window.alert('Deletion canceled')
    }
  }
  
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
      minWidth: 100,
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
      flex: 0.1,
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
      minWidth: 100,
      field: 'issueDate',
      headerName: 'Date of issue',
      renderCell: ({ row }: CellType) => {

        return <Typography noWrap>{row.issueDate}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
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
      minWidth: 100,
      field: 'totalExcluding',
      headerName: 'Total excluding VAT (N1)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalExcluding}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalNotSubject',
      headerName: 'Total not subject to VAT (N2)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalNotSubject}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalNonTaxable',
      headerName: 'Total non-taxable VAT (N3)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalNonTaxable}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalExempt',
      headerName: 'Total VAT exempt (N4)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalExempt}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalNotShown',
      headerName: 'Total VAT not shown (N5)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalNotShown}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalReverseCharge',
      headerName: 'Total reverse charge (N6)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalReverseCharge}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalEUCountry',
      headerName: 'Total VAT other EU country (N7)',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalEUCountry}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalTaxableAmount',
      headerName: 'Total taxable amount',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalTaxableAmount}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalVAT',
      headerName: 'Total VAT',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.totalVAT}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
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
      minWidth: 100,
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
      minWidth: 100,
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
      minWidth: 100,
      sortable: false,
      field: 'status',
      headerName: '',
      renderCell: ({ row }: CellType) => (
        <>
          <IconButton  onClick={() => {
              handleEdit(row)
            }}>
            <Icon icon='mdi:edit-outline' />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </>
      )
    }
  ]

  return  <CommonList
  handleEdit={handleEdit}
  onDelete={handleDelete}
  setData={setData}
  filteredData={filteredData}
  data={data}
  columns={columns}
/>
}

export default PassiveInvoicesList
