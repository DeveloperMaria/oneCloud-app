import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { ProviderType } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { deleteProvider } from './api'
import toast from 'react-hot-toast'

interface CellType {
  row: ProviderType
}

interface PartnerListProps {
  handleEdit: (passive: ProviderType) => void
  setData: React.Dispatch<React.SetStateAction<ProviderType[]>>
  filteredData: ProviderType[]
  data: ProviderType[]
}

const ProviderList: React.FC<PartnerListProps> = ({ handleEdit,setData,filteredData, data }) => {
  const handleDelete = async (providerId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Provider?')
    if (confirmDelete) {
      try {
        await deleteProvider(providerId)
        setData(prevData => prevData.filter(provider => provider.id !== providerId))

        toast.success('Provider deleted successfully')
      } catch (error) {
        toast.error('Error deleting provider')
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
      field: 'businessName',
      headerName: 'Business name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.businessName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'taxIdCode',
      headerName: 'CF',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.taxIdCode}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'vatNumber',
      headerName: 'Beer',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.vatNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'pec',
      headerName: 'Pec',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.pec}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'attorney',
      headerName: 'Legal representative',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.attorney}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'street',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.street}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'common',
      headerName: 'City',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.common}
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

export default ProviderList
