import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { PartnerType } from 'src/types/apps/userTypes'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'



interface CellType {
  row: PartnerType
}

interface UserListProps {
  setShow: (show: boolean) => void
  onChangeTitle: (title: string) => void 
  filteredData: PartnerType[] 
  data: PartnerType[] 
}


const Push: React.FC<UserListProps> = ({ setShow, filteredData, data }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

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
              <FormControlLabel
                label={row.active}
                control={<Checkbox name='basic-unchecked' checked={row.active === true} />}
              />
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
      renderCell: () => (
        <>
          <IconButton
          >
            <Icon icon='mdi:edit-outline' />
          </IconButton>
          <IconButton>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </>
      )
    }
  ]
  console.log('filterdData by user', filteredData.length)

  return (
    <Grid container spacing={6} sx={{ marginTop: '0.4em' }}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rows={filteredData.length ? filteredData : data}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Push
