import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Icon from 'src/@core/components/icon';
import { CardType1, CardType2, CardType3, CardType4, CardType5 } from 'src/types/apps/userTypes'


interface CellType {
    row: CardType1
  }
  interface CellType1 {
    row: CardType2
  }
  interface CellType2 {
    row: CardType3
  }
  interface CellType3 {
    row: CardType4
  }
  interface CellType4 {
    row: CardType5
  }

export const getIpListColumns = (onEdit1) => {
    const columns: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
          field: 'id',
          headerName: 'No.',
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
          field: 'description',
          headerName: 'Description',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.description}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'network',
          headerName: 'Network',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.network}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'startIp',
          headerName: 'Start Ip',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.startIp}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'reservedIps',
          headerName: 'Reserved Ips',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.reservedIps}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'guy',
          headerName: 'Guy',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.guy}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'active',
          headerName: 'Active',
          renderCell: ({ row }: CellType) => {
            return (
              <FormGroup>
                <FormControlLabel label={row.active} control={<Checkbox checked={row.active} name='basic-unchecked' />} />
              </FormGroup>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'ipsUsed',
          headerName: 'Ips Used',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ipsUsed}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'useableIps',
          headerName: 'Useable Ips',
          renderCell: ({ row }: CellType) => {
            return (
              <Typography variant='body2' noWrap>
                {row.useableIps}
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
          renderCell: ({ row }: CellType) => (
            <>
              <IconButton
                onClick={() => {
                  onEdit1(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
            </>
          )
        }
      ]
      return columns;
    };

export const getAccessPointColumns = (onEdit2) => {
    const columns1: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 200,
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
          minWidth: 250,
          field: 'IPAccessPoint',
          headerName: 'IP AccessPoint',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ipAccessPoint}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 250,
          field: 'firstName',
          headerName: 'First Name',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.firstName}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 250,
          field: 'nas',
          headerName: 'NAS',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.nas}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'node',
          headerName: 'Node',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.node}
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
          renderCell: ({ row }: CellType1) => (
            <>
              <IconButton
                onClick={() => {
                  onEdit2(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
            </>
          )
        }
      ]
      return columns1
    };

export const getCondominiumsColumns = (onEdit3) => {
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
          field: 'ipCpe',
          headerName: 'IP CPE',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ipCpe}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'firstName',
          headerName: 'First name',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.firstName}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'address',
          headerName: 'Address',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.address}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'referent',
          headerName: 'Referent',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.referent}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'ap',
          headerName: 'AP',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ap}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'node',
          headerName: 'Node',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.node}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'client',
          headerName: 'Clients',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.client}
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
                  onEdit3(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
            </>
          )
        }
      ]
      return columns2
    };

export const getKnotsColumns = (onEdit4) => {
    const columns3: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 250,
          field: 'id',
          headerName: 'ID',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.id}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'firstName',
          headerName: 'First name',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.firstName}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'address',
          headerName: 'Address',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.address}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'customers',
          headerName: 'Customers (Via Direct Cable)',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.customers}
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
          renderCell: ({ row }: CellType3) => (
            <>
              <IconButton
                onClick={() => {
                  onEdit4(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
            </>
          )
        }
      ]
      return columns3
    };

export const getNasColumns = (onEdit5) => {
    const columns4: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 250,
          field: 'id',
          headerName: 'ID',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.id}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'ipNas',
          headerName: 'IP NAS',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ipNas}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'node',
          headerName: 'node',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.node}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 300,
          field: 'client',
          headerName: 'Clients',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.client}
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
          renderCell: ({ row }: CellType4) => (
            <>
              <IconButton
                onClick={() => {
                  onEdit5(row)
                }}
              >
                <Icon icon='mdi:edit-outline' />
              </IconButton>
            </>
          )
        }
      ]
      return columns4
    };
