import { GridColDef } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { ExerciseType } from 'src/types/apps/userTypes'

interface CellType1 {
  row: ExerciseType
}

export const ExerciseColumns = () => {
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
      minWidth: 150,
      field: 'Service',
      headerName: 'Service',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Service}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Customer',
      headerName: 'Customer',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Customer}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Address',
      headerName: 'Address',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Address}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'ModifiedBy',
      headerName: 'Modified by',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ModifiedBy}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'LastEdit',
      headerName: 'Last edit',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.LastEdit}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'DeliveredFrom',
      headerName: 'Delivered from',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.DeliveredFrom}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'ActivationDate',
      headerName: 'Activation Date',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ActivationDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'IssueInvoice',
      headerName: 'Issue of 1st invoice',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.IssueInvoice}
          </Typography>
        )
      }
    }
  ]
  return columns1
}
