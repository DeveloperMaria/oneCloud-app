import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Typography} from '@mui/material';
import Icon from 'src/@core/components/icon';
import { ArticleType, BundleType } from 'src/types/apps/userTypes'


interface CellType1 {
    row: ArticleType
  }
  interface CellType2 {
    row: BundleType
  }



export const DayColumns = () => {
    const columns1: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
          field: 'id',
          headerName: '',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.id}
              </Typography>
            )
          }
        },
    
       
      ]
      return columns1
    };

export const WeekColumns = () => {

    const columns2: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
          field: 'id',
          headerName: 'ID',
          renderCell: ({ row }: CellType2) => {
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
          field: 'Description',
          headerName: 'Description',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Description}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Articles',
          headerName: 'Articles',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Articles}
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
          renderCell: ({ row }: CellType2) => (
            <>
              <IconButton
                onClick={() => {
                  onEdit2(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
              <IconButton >
            <Icon icon='mdi:delete-outline' />
          </IconButton>
            </>
          )
        }
      ]
      return columns2
    };

    export const MonthColumns = () => {

        const columns2: GridColDef[] = [
            {
              flex: 0.1,
              minWidth: 100,
              field: 'id',
              headerName: 'ID',
              renderCell: ({ row }: CellType2) => {
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
              field: 'Description',
              headerName: 'Description',
              renderCell: ({ row }: CellType2) => {
                return (
                  <Typography variant='body2' noWrap>
                    {row.Description}
                  </Typography>
                )
              }
            },
            {
              flex: 0.1,
              minWidth: 200,
              field: 'Articles',
              headerName: 'Articles',
              renderCell: ({ row }: CellType2) => {
                return (
                  <Typography variant='body2' noWrap>
                    {row.Articles}
                  </Typography>
                )
              }
            },
        
        
          ]
          return columns2
        };
