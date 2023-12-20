import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Typography} from '@mui/material';
import Icon from 'src/@core/components/icon';
import { ArticleType, BundleType } from 'src/types/apps/userTypes'
import { deleteArticle, deleteBundle } from 'src/pages/articleBundles/api';
import toast from 'react-hot-toast';


interface CellType1 {
    row: ArticleType
  }
  interface CellType2 {
    row: BundleType
  }



export const articleColumns = (onEdit1,setArticleData) => {

  const handleDelete = async (articleId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Article?')
    if (confirmDelete) {
      try {
        await deleteArticle(articleId)
        setArticleData(prevData => prevData.filter(article => article.id !== articleId))

        toast.success('Article deleted successfully')
      } catch (error) {
        toast.error('Error deleting article')
      }
    } else {
      window.alert('Deletion canceled')
    }
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
          minWidth: 200,
          field: 'Description',
          headerName: 'Description',
          renderCell: ({ row }: CellType1) => {
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
              <IconButton onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
            </>
          )
        }
      ]
      return columns1
    };

export const bundleColumns = (onEdit2,setBundleData) => {

  const handleDelete = async (bundleId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Bundle?')
    if (confirmDelete) {
      try {
        await deleteBundle(bundleId)
        setBundleData(prevData => prevData.filter(bundle => bundle.id !== bundleId))

        toast.success('Bundle deleted successfully')
      } catch (error) {
        toast.error('Error deleting bundle')
      }
    } else {
      window.alert('Deletion canceled')
    }
  }

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
              <IconButton onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
            </>
          )
        }
      ]
      return columns2
    };
