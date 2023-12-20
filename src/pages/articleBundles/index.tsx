import { useEffect, useState } from 'react'
import { ArticleType, BundleType } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import AutoComplete from 'src/components/AutoComplete'
import ArticleBundleList from './ArticleBundleList'
import { getAllArticle, getAllBundle } from './api'
import { articleColumns, bundleColumns } from 'src/components/ArticleBundleColumn'
import ArticleComponent from 'src/components/ArticleComponent'
import BundleComponent from 'src/components/BundleComponent'
import { useFormik } from 'formik'
import { articleSchema, bundleSchema } from 'src/schema'

interface ArticleBundleType {
  id: string
  title: string
  columns: string
  row: string
  service: string
  button: string
}

const index = () => {
  const [cardData, setCardData] = useState<ArticleBundleType | null>()
  const [selectedOption, setSelectedOption] = useState<ArticleBundleType | null>(null)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('Add Article')
  const [articleData, setArticleData] = useState<ArticleType[] | undefined>(undefined)
  const [bundleData, setBundleData] = useState<BundleType[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [IPId, setIPId] = useState<string | null>(null)

  const handleOptionChange = (event: React.SyntheticEvent, value: ArticleType | BundleType | null) => {
    setSelectedOption(value)
  }

  const ArticleFormik = useFormik({
    initialValues: {
      Description: '',
      Price: undefined
    },
    validationSchema: articleSchema,
    onSubmit: () => {}
  })

  const BundleFormik = useFormik({
    initialValues: {
      Description: ''
    },
    validationSchema: bundleSchema,
    onSubmit: () => {}
  })

  const onEdit1 = (article: ArticleType) => {
    ArticleFormik.setValues({
      Description: article.Description,
      Price: article.Price
    })
    setIPId(article.id)
    setShow1(true)
    setTitle('Edit Article')
  }
  const onEdit2 = (bundle: BundleType) => {
    BundleFormik.setValues({
      Description: bundle.Description
    })
    setIPId(bundle.id)
    setShow2(true)
    setTitle('Edit Bundle')
  }

  const articleColumn = articleColumns(onEdit1,setArticleData)
  const bundleColumn = bundleColumns(onEdit2,setBundleData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllArticle()
        setArticleData(allData)
      } catch (error) {
        console.error('Error fetching Article:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllBundle()
        setBundleData(allData)
      } catch (error) {
        console.error('Error fetching Bundle:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Article',
            columns: articleColumn,
            row: articleData,
            service: 'No Article',
            button: {
              label: 'Add',
              onClick: () => {
                setShow1(true)
              }
            }
          },
          {
            id: 2,
            title: 'Bundle',
            columns: bundleColumn,
            row: bundleData,
            service: 'No Bundle',
            button: {
              label: 'Add',
              onClick: () => {
                setShow2(true)
              }
            }
          }
        ]

        setCardData(newCardData)
        if (selectedOption === null || selectedOption.id === newCardData[0].id) {
          setSelectedOption(newCardData[0])
        } else {
          const selectedFromNewData = newCardData.find(item => item.id === selectedOption.id)
          if (selectedFromNewData) {
            setSelectedOption(selectedFromNewData)
          } else {
            setSelectedOption(newCardData[0])
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [articleData, bundleData])

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
        <AutoComplete
          onChange={handleOptionChange}
          cardData={cardData}
          selectedOption={selectedOption}
          isOptionEqualToValue={(option, value) => option?.id === value?.id && option?.title === value?.title}
        />
      </Box>

      <ArticleComponent
        IPId={IPId}
        setIPId={setIPId}
        setShow1={setShow1}
        setTitle={setTitle}
        show1={show1}
        title={title}
        setArticleData={setArticleData}
        formik={ArticleFormik}
      />

      <BundleComponent
        setShow2={setShow2}
        setTitle={setTitle}
        show2={show2}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setBundleData={setBundleData}
        formik={BundleFormik}
      />

      <Box>
        <ArticleBundleList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
