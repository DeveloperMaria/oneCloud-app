import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Icon from 'src/@core/components/icon';
import { EditorType1, EditorType2, EditorType3, EditorType4, EditorType5 } from 'src/types/apps/userTypes'


interface CellType1 {
    row: EditorType1
  }
  interface CellType2 {
    row: EditorType2
  }
  interface CellType3 {
    row: EditorType3
  }
  interface CellType4 {
    row: EditorType4
  }
  interface CellType5 {
    row: EditorType5
  }

export const settingColumns = () => {
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
              <FormGroup row>
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

export const profileColumns = (onEdit1) => {
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
          minWidth: 200,
          field: 'BackendDescription',
          headerName: 'Backend Description	',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.BackendDescription}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Descriptioninvoice',
          headerName: 'Description on the invoice	',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Descriptioninvoice}
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
          field: 'Type',
          headerName: 'Type',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Type}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'LineTechnicalProfile	',
          headerName: 'LineTechnicalProfile	',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.LineTechnicalProfile	}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'BandPeakDown',
          headerName: 'BandPeakDown	',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.BandPeakDown	}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'BandaPiccoUP',
          headerName: 'BandaPiccoUP',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.BandaPiccoUP}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'PriceMonthly',
          headerName: 'PriceMonthly',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.PriceMonthly}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'RadiusServiceId',
          headerName: 'RadiusServiceId',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.RadiusServiceId}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'CommunicationCode',
          headerName: 'Communication Code',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.CommunicationCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'Business',
          headerName: 'Business',
          renderCell: ({ row }: CellType1) => {
            return (
              <FormGroup>
                <FormControlLabel label={row.Business} control={<Checkbox checked={row.Business} name='basic-unchecked' />} />
              </FormGroup>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'Active',
          headerName: 'Active',
          renderCell: ({ row }: CellType1) => {
            return (
              <FormGroup>
                <FormControlLabel label={row.active} control={<Checkbox checked={row.active} name='basic-unchecked' />} />
              </FormGroup>
            )
          }
        },

        {
          flex: 0.1,
          minWidth: 150,
          field: 'NofContracts',
          headerName: 'No. of Contracts',
          renderCell: ({ row }: CellType1) => {
            return (
              <Typography variant='body2' noWrap>
                {row.NofContracts}
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
                  onEdit1(row)
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

export const MORColumns = (onEdit2) => {

  // const handleDelete = async (partnerId: string) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this MorRates?')
  //   if (confirmDelete) {
  //     try {
  //       await deletePartner(partnerId)
  //       setData(prevData => prevData.filter(partner => partner.id !== partnerId))

  //       toast.success('MorRates deleted successfully')
  //     } catch (error) {
  //       toast.error('Error deleting MorRates')
  //     }
  //   } else {
  //     window.alert('Deletion canceled')
  //   }
  // }

    const columns2: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
          field: 'id',
          headerName: 'CRM ID',
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
          field: 'BackendDescription',
          headerName: 'Backend Description',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.BackendDescription}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Descriptioninvoice',
          headerName: 'Description on the invoice',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Descriptioninvoice}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'MORID',
          headerName: 'MOR ID',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.MORID}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'Service',
          headerName: 'Service',
          renderCell: ({ row }: CellType2) => {
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
          field: 'CommunicationCode',
          headerName: 'Communication Code',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.CommunicationCode}
              </Typography>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'Active',
          headerName: 'Active',
          renderCell: ({ row }: CellType2) => {
            return (
              <FormGroup>
              <FormControlLabel label={row.Active} control={<Checkbox checked={row.Active} name='basic-unchecked' />} />
            </FormGroup>
            )
          }
        },
    
        {
          flex: 0.1,
          minWidth: 150,
          field: 'Isnap',
          headerName: '	I snap',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Isnap}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'ITfixed',
          headerName: '	IT fixed',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ITfixed}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'ITfurniture',
          headerName: '	IT furniture',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.ITfurniture}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'FixedEU',
          headerName: '	Fixed EU',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.FixedEU}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'EUfurniture',
          headerName: 'EU furniture',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.EUfurniture}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'FixedWorld',
          headerName: 'Fixed World',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.FixedWorld}
              </Typography>
            )
          }
        },

        {
          flex: 0.1,
          minWidth: 150,
          field: 'WorldFurniture',
          headerName: 'World Furniture',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.WorldFurniture}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 150,
          field: 'NofContracts',
          headerName: 'No. of Contracts',
          renderCell: ({ row }: CellType2) => {
            return (
              <Typography variant='body2' noWrap>
                {row.NofContracts}
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

export const paymentMethodColumns = (onEdit3) => {
    const columns3: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
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
          minWidth: 200,
          field: 'CommunicationCode',
          headerName: 'Communication Code',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.CommunicationCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Description',
          headerName: 'Description',
          renderCell: ({ row }: CellType3) => {
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
          field: 'InvoiceCodeEl',
          headerName: 'Invoice Code El.',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.InvoiceCodeEl}
              </Typography>
            )
          }
        },

        {
          flex: 0.1,
          minWidth: 200,
          field: 'BillingNotes',
          headerName: 'Billing Notes*',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.BillingNotes}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Unpaidtext',
          headerName: 'Unpaid text**',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Unpaidtext}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'NofCustomers',
          headerName: 'No. of Customers',
          renderCell: ({ row }: CellType3) => {
            return (
              <Typography variant='body2' noWrap>
                {row.NofCustomers}
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
                  onEdit3(row)
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

export const billingColumns = (onEdit4) => {
    const columns4: GridColDef[] = [
        {
          flex: 0.1,
          minWidth: 100,
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
          minWidth: 200,
          field: 'firstName',
          headerName: 'First name',
          renderCell: ({ row }: CellType4) => {
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
          field: 'Monthinadvance',
          headerName: 'Months in advance',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Monthinadvance}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Daytoexpiry',
          headerName: 'Days to expiry',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Daytoexpiry}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'TransmitterCode',
          headerName: 'Transmitter Code',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.TransmitterCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Name',
          headerName: 'Name',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Name}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Address',
          headerName: 'Address',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Address}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'PostalCode',
          headerName: 'POSTAL CODE',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.PostalCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Common',
          headerName: 'Common',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Common}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Province',
          headerName: 'Province',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Province}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Telephone',
          headerName: 'Telephone',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Telephone}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'CrimeCode',
          headerName: '	Crime Code',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.CrimeCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Bank',
          headerName: 'Bank',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Bank}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'IBAN',
          headerName: 'IBAN',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.IBAN}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'PostalAccount',
          headerName: 'Postal account',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.PostalAccount}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'Email',
          headerName: 'E-mail',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.Email}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'VATNumber',
          headerName: '	VAT number',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.VATNumber}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'TaxIDCode',
          headerName: 'Tax ID code',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.TaxIDCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'SepaCodeCUC',
          headerName: 'Sepa Code CUC',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.SepaCodeCUC}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'SepaCreditorCode',
          headerName: 'Sepa Creditor Code',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.SepaCreditorCode}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'DD1stUnpaidNotice',
          headerName: 'DD 1st Unpaid Notice',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.DD1stUnpaidNotice}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'DD2stUnpaidNotice',
          headerName: 'DD 2nd Unpaid Notice',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.DD2stUnpaidNotice}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'GGServicesBlock',
          headerName: 'GG Services Block',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.GGServicesBlock}
              </Typography>
            )
          }
        },
        {
          flex: 0.1,
          minWidth: 200,
          field: 'NofCustomers',
          headerName: 'No. of Customers',
          renderCell: ({ row }: CellType4) => {
            return (
              <Typography variant='body2' noWrap>
                {row.NofCustomers}
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
                  onEdit4(row)
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
    export const ratesColumns = (onEdit5) => {
        const columns4: GridColDef[] = [
            {
              flex: 0.1,
              minWidth: 200,
              field: 'id',
              headerName: 'ID',
              renderCell: ({ row }: CellType5) => {
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
              field: 'Rate',
              headerName: '	Rate %',
              renderCell: ({ row }: CellType5) => {
                return (
                  <Typography variant='body2' noWrap>
                    {row.Rate}
                  </Typography>
                )
              }
            },
            {
              flex: 0.1,
              minWidth: 250,
              field: 'Description',
              headerName: 'Description',
              renderCell: ({ row }: CellType5) => {
                return (
                  <Typography variant='body2' noWrap>
                    {row.Description}
                  </Typography>
                )
              }
            },
            {
              flex: 0.1,
              minWidth: 250,
              field: 'Nature',
              headerName: 'Nature',
              renderCell: ({ row }: CellType5) => {
                return (
                  <Typography variant='body2' noWrap>
                    {row.Nature}
                  </Typography>
                )
              }
            },

            {
              flex: 0.1,
              minWidth: 200,
              field: 'Default',
              headerName: 'Default',
              renderCell: ({ row }: CellType5) => {
                return (
                  <FormGroup>
                  <FormControlLabel label={row.Default} control={<Checkbox checked={row.Default} name='basic-unchecked' />} />
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
              renderCell: ({ row }: CellType5) => (
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