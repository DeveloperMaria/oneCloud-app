import { GridColDef } from '@mui/x-data-grid'
import { IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material'
import { InvoiceType } from 'src/types/apps/userTypes'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

interface CellType1 {
  row: InvoiceType
}

export const InvoiceColumns = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const showMenu = event => {
    console.log('Clicked IconButton')
    console.log('Before state update, anchorEl:', anchorEl) // Log before state update
    setAnchorEl(event.currentTarget)
    console.log('After state update, anchorEl:', anchorEl) // Log after state update
  }

  const handleCloseMenu = () => {
    console.log('Closed Menu')
    setAnchorEl(null)
  }
  useEffect(() => {
    console.log('Current state of anchorEl:', anchorEl)
  }, [anchorEl])

  const handleMenuItemClick = action => {
    handleCloseMenu()
    console.log('Clicked action:', action)
  }
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
      field: 'NoInvoices',
      headerName: 'No. Invoices',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.NoInvoices}
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
      field: 'AmountCollected',
      headerName: 'Amount Collected',
      renderCell: ({ row }: CellType1) => {
        return (
          <Typography variant='body2' noWrap>
            {row.AmountCollected}
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
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'generateFile',
      headerName: '',
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={showMenu}>
            <Icon icon='icon-park-solid:setting' />
          </IconButton>

          <Menu
            id='menu-id'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} // Ensure the Menu is open when anchorEl is truthy
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleMenuItemClick('Generate PDF')}>Generate PDF</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Generate FE')}>Generate FE</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Download PDF')}>Download PDF</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Download PDF Post')}>Download PDF Post</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Download FE')}>Download FE</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('SEFA DownloadS')}>SEFA DownloadS</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Send Email')}>Send Email</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Send to Stripe')}>Send to Stripe</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Send to Cardless')}>Send to Cardless</MenuItem>{' '}
          </Menu>
        </>
      )
    }
  ]
  return columns1
}
