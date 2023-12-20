import { GridColDef } from '@mui/x-data-grid';
import {  Checkbox, FormControlLabel, FormGroup, Typography} from '@mui/material';
import { ControlPanelType } from 'src/types/apps/userTypes'


interface CellType1 {
    row: ControlPanelType
  }



export const ServiceColumns = () => {
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
            field: 'CreatedBy',
            headerName: 'Created by',
            renderCell: ({ row }: CellType1) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.CreatedBy}
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
            field: 'Communicall',
            headerName: 'Communicall',
            renderCell: ({ row }: CellType1) => {
              return (
                <FormGroup>
                <FormControlLabel label={row.Communicall} control={<Checkbox checked={row.Communicall} name='basic-unchecked' />} />
              </FormGroup>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 100,
            field: 'Mike',
            headerName: 'Mike',
            renderCell: ({ row }: CellType1) => {
              return (
                <FormGroup>
                <FormControlLabel label={row.Mike} control={<Checkbox checked={row.Mike} name='basic-unchecked' />} />
              </FormGroup>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 100,
            field: 'Radius',
            headerName: 'Radius',
            renderCell: ({ row }: CellType1) => {
              return (
                <FormGroup>
                <FormControlLabel label={row.Radius} control={<Checkbox checked={row.Radius} name='basic-unchecked' />} />
              </FormGroup>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'Info',
            headerName: 'Info',
            renderCell: ({ row }: CellType1) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Info}
                </Typography>
              )
            }
          },
          {
            flex: 0.1,
            minWidth: 150,
            field: 'Note',
            headerName: 'Note',
            renderCell: ({ row }: CellType1) => {
              return (
                <Typography variant='body2' noWrap>
                  {row.Note}
                </Typography>
              )
            }
          },

     
      ]
      return columns1
    };


