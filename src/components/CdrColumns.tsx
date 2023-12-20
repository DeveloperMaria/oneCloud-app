import { GridColDef } from '@mui/x-data-grid'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { DetailType, TotalType } from 'src/types/apps/userTypes'

interface CellType1 {
  row: DetailType
}
interface CellType2 {
  row: TotalType
}

export const DetailColumns = () => {
  const columns1: GridColDef[] = [
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
      field: 'Minutes',
      headerName: 'Minutes',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Minutes}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Cost',
      headerName: 'Cost',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Cost}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'ISnap',
      headerName: 'I snap',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ISnap}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Price',
      headerName: 'Price',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Price}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'Total',
      headerName: 'Total',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Total}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Margin',
      headerName: 'Margin',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Margin}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Fixed',
      headerName: 'Fixed',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Fixed}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Mobile',
      headerName: 'Mobile',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Mobile}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Nationals',
      headerName: 'Nationals',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Nationals}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Foreign',
      headerName: 'Foreign',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Foreign}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'Sales',
      headerName: 'Sales',
      renderCell: ({ row }: CellType1) => {
        return (
          <FormGroup>
            <FormControlLabel label={row.Sales} control={<Checkbox checked={row.Sales} name='basic-unchecked' />} />
          </FormGroup>
        )
      }
    }
  ]
  return columns1
}

export const TotalColumns = () => {
  const columns1: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Date',
      headerName: 'Date',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Date}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Customer',
      headerName: 'Customer',
      renderCell: ({ row }: CellType2) => {
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
      field: 'Caller',
      headerName: 'Caller',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Caller}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Called',
      headerName: 'Called',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Called}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Minutes',
      headerName: 'Minutes',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Minutes}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'Cost',
      headerName: 'Cost',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Cost}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Village',
      headerName: 'Village',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Village}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'Fixed',
      headerName: 'Fixed',
      renderCell: ({ row }: CellType2) => {
        return (
          <FormGroup>
            <FormControlLabel label={row.Fixed} control={<Checkbox checked={row.Fixed} name='basic-unchecked' />} />
          </FormGroup>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'ISnap',
      headerName: 'I snap',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ISnap}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Price',
      headerName: 'Price',
      renderCell: ({ row }: CellType2) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Price}
          </Typography>
        )
      }
    }
  ]
  return columns1
}
