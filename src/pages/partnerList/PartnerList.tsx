import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { PartnerType } from 'src/types/apps/userTypes'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { deletePartner } from './api'
import toast from 'react-hot-toast'
import CommonList from 'src/components/CommonList'
import { v4 as uuidv4 } from 'uuid'


interface CellType {
  row: PartnerType
}

interface PartnerListProps {
  onEdit: (partner: PartnerType) => void
  setData: React.Dispatch<React.SetStateAction<PartnerType[]>>
  filteredData: PartnerType[]
  data: PartnerType[]
}

const PartnerList: React.FC<PartnerListProps> = ({ onEdit, loading, setData, filteredData, data }) => {
  const handleDelete = async (partnerId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this partner?')
    if (confirmDelete) {
      try {
        await deletePartner(partnerId)
        setData(prevData => prevData.filter(partner => partner.id !== partnerId))

        toast.success('Partner deleted successfully')
      } catch (error) {
        toast.error('Error deleting partner')
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
      minWidth: 200,
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
      minWidth: 200,
      field: 'contactSurname',
      headerName: 'Contact Surname',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.contactSurname}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'contactName',
      headerName: 'Contact Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.contactName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'landlineTel',
      headerName: 'Landline Tel',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.landlineTel}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'telMobile',
      headerName: 'Tel Mobile',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.telMobile}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'code',
      headerName: 'Code',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.code}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'active',
      headerName: 'Active',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel label={row.active} control={<Checkbox name='basic-unchecked' checked={row.active} />} />
          </FormGroup>
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
          <IconButton
            onClick={() => {
              onEdit(row)
            }}
          >
            <Icon icon='mdi:edit-outline' />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </>
      )
    }
  ]

  function getRowId(row: any) {
    return uuidv4()
  }

  return <CommonList loading={loading} getRowId={getRowId} filteredData={filteredData} data={data} columns={columns} />
}

export default PartnerList
