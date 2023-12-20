import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Card, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Typography } from '@mui/material'
import { ModelType, UsersType } from 'src/types/apps/userTypes'
import { useState } from 'react'
import DialogBox from './DialogBox'

interface CellType {
  row: ModelType
}

export const PermissionColumns = ({show1,setShow1}) => {
  const [reseller, setReseller] = useState<boolean>(true)
  const [administrator, setAdministrator] = useState<boolean>(true)
  const [administration, setAdministration] = useState<boolean>(true)
  const [assistance, setAssistance] = useState<boolean>(true)
  const [provisioning, setProvisioning] = useState<boolean>(true)
  const [sales, setSales] = useState<boolean>(true)
  const [technician, setTechnician] = useState<boolean>(true)
  const [technical, setTechnical] = useState<boolean>(true)
  const [permissionData, setPermissionData] = useState<UsersType[]>([])

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'company',
      headerName: 'Company',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.company}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'reseller',
      headerName: 'Reseller',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.reseller}
              control={
                <Checkbox name='basic-unchecked' checked={reseller} onChange={e => setReseller(e.target.checked)} />
              }
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'administrator',
      headerName: 'Administrator',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.administrator}
              control={
                <Checkbox
                  name='basic-unchecked'
                  checked={administrator}
                  onChange={e => setAdministrator(e.target.checked)}
                />
              }
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'administration',
      headerName: 'Administration',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.administration}
              control={
                <Checkbox
                  name='basic-unchecked'
                  checked={administration}
                  onChange={e => setAdministration(e.target.checked)}
                />
              }
            />
          </FormGroup>
        )
      }
    },

    {
      flex: 0.2,
      minWidth: 120,
      field: 'assistance',
      headerName: 'Assistance',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.assistance}
              control={
                <Checkbox name='basic-unchecked' checked={assistance} onChange={e => setAssistance(e.target.checked)} />
              }
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'provisioning',
      headerName: 'Provisioning',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.provisioning}
              control={
                <Checkbox
                  name='basic-unchecked'
                  checked={provisioning}
                  onChange={e => setProvisioning(e.target.checked)}
                />
              }
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'sales',
      headerName: 'Sales',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.sales}
              control={<Checkbox name='basic-unchecked' checked={sales} onChange={e => setSales(e.target.checked)} />}
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'technician',
      headerName: 'Technician',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.technician}
              control={
                <Checkbox name='basic-unchecked' checked={technician} onChange={e => setTechnician(e.target.checked)} />
              }
            />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'technical',
      headerName: '	Technical Supervisor',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.technical}
              control={
                <Checkbox name='basic-unchecked' checked={technical} onChange={e => setTechnical(e.target.checked)} />
              }
            />
          </FormGroup>
        )
      }
    }
  ]

  const handleSubmit1 = () => {}

  const handleButtonClick1 = () => {
    setShow1(true)
    if ('') {
      setShow1(true)
    }
  }

  return (
    <>
    
    
    <DialogBox
        open={show1}
        onClose={() => setShow1(false)}
        handleSubmit={handleSubmit1}
        handleButtonClick={handleButtonClick1}
        title='Add Permission'
      >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ height: '20rem' }}>
              <DataGrid rows={permissionData} columns={columns} hideFooter />
            </Card>
          </Grid>
        </Grid>
      </DialogBox>
    </>
  )
}
