import { GridColDef } from '@mui/x-data-grid'
import { IconButton, Typography } from '@mui/material'
import { CreditNotesType } from 'src/types/apps/userTypes'
import { Icon } from '@iconify/react'

interface CellType1 {
  row: CreditNotesType
}

export const CreditNoteColumns = () => {
  const columns1: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Period',
      headerName: 'Period',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Period}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'NoNotes',
      headerName: 'No Notes',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.NoNotes}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Taxable',
      headerName: 'Taxable',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Taxable}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Free',
      headerName: 'Free',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Free}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Tax',
      headerName: 'Tax',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Tax}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'Amount',
      headerName: 'Amount',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Amount}
          </Typography>
        )
      }
    },
    {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'detail',
        headerName: '',
        renderCell: ({ row }: CellType1) => (
          <>
            <IconButton>
              <Icon icon='majesticons:checkbox-list-detail-line' />
            </IconButton>
          </>
        )
      },
  ]
  return columns1
}
