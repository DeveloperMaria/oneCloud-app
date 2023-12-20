import { GridColDef } from '@mui/x-data-grid'
import { Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from '@mui/material'
import {  TelevoipTypes } from 'src/types/apps/userTypes'
import { Icon } from '@iconify/react'
import { deleteUser } from 'src/pages/iteminvoiced/api'
import toast from 'react-hot-toast'


interface CellType {
    row: TelevoipTypes
  }

export const TelevoipColumns = ({  setTelevoipData, onEdit1 }) => {

    const handleDelete = async (partnerId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Televoip?')
        if (confirmDelete) {
          try {
            await deleteUser(partnerId)
            setTelevoipData(prevData => prevData.filter(partner => partner.id !== partnerId))
    
            toast.success('Televoip deleted successfully')
          } catch (error) {
            toast.error('Error deleting Televoip')
          }
        } else {
          window.alert('Deletion canceled')
        }
      }

    const columns: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
          field: 'No',
          headerName: 'No.',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.No}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'Customer',
          headerName: 'Customer',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Customer}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'ClientId',
          headerName: 'ClientId',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ClientId}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'Service',
          headerName: 'Service',
          renderCell: ({ row }: CellType) => {
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
            field: 'Period',
            headerName: 'Period',
            renderCell: ({ row }: CellType) => {
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
            field: 'PriceVAT',
            headerName: 'Unit Price Excl. VAT',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.PriceVAT}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'Discount',
            headerName: 'Discount',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Discount}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'Qty',
            headerName: 'Qty',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Qty}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'TotalExclVAT',
            headerName: 'Total Excl. VAT',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.TotalExclVAT}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'VAT',
            headerName: 'VAT',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.VAT}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'Total',
            headerName: 'Total',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Total}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 250,
            field: 'Description',
            headerName: 'Description',
            renderCell: ({ row }: CellType) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Description}
                </Typography>
              )
            }
          },
              {
          flex: 0.1,
          minWidth: 150,
          field: 'Position',
          headerName: 'Pos.',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Position}
              </Typography>
            )
          }
        },   

    
        {
          flex: 0.1,
          minWidth: 110,
          field: 'Sales',
          headerName: 'Sales',
          renderCell: ({ row }: CellType) => {
            return (
              <FormGroup >
                <FormControlLabel label={row.Sales} control={<Checkbox name='basic-unchecked' checked={row.Sales}/>} />
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
                    onEdit1(row)
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
  return columns
}
