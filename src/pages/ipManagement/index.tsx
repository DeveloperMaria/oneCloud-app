import { useEffect, useState } from 'react'
import { CardType1, CardType2, CardType3, CardType4, CardType5 } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import IpManagement from './IpManagment'
import IpAddressComponent from 'src/components/IpAddressComponent'
import AccessPointComponent from 'src/components/AccessPointComponent'
import CondominiumsComponent from 'src/components/CondominiumsComponent'
import KnotsComponent from 'src/components/KnotsComponent'
import NasComponent from 'src/components/NasComponent'
import { getAllAccessPoint, getAllCondominiums, getAllIP, getAllKnots, getAllNAS } from './api'
import {
  getAccessPointColumns,
  getCondominiumsColumns,
  getIpListColumns,
  getKnotsColumns,
  getNasColumns
} from 'src/components/IpManagmentColumns'
import { useFormik } from 'formik'
import { accessPointSchema, comondiusSchema, ipAddressSchema, knotsSchema, nasSchema } from 'src/schema'
import { Button, ButtonGroup } from '@mui/material'

interface IpManagementType {
  id: string
  title: string
  columns: string
  row: string
  service: string
  button: string
}

const index = () => {
  const [cardData, setCardData] = useState<IpManagementType | null>()
  const [selectedOption, setSelectedOption] = useState<IpManagementType | null>(null)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)
  const [show4, setShow4] = useState<boolean>(false)
  const [show5, setShow5] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('Edit IP Address')
  const [ipListData, setIpListData] = useState<CardType1[] | undefined>(undefined)
  const [accessPointData, setAccessPointData] = useState<CardType2[] | undefined>(undefined)
  const [condominiums, setCondominiums] = useState<CardType3[] | undefined>(undefined)
  const [knots, setKnots] = useState<CardType4[] | undefined>(undefined)
  const [nasData, setNasData] = useState<CardType5[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [IPId, setIPId] = useState<string | null>(null)
  const [selectedButton, setSelectedButton] = useState(null)

  const initializeFormik = (initialValues, validationSchema, onSubmit) =>
    useFormik({ initialValues, validationSchema, onSubmit })

  const IpAddressformik = initializeFormik(
    {
      description: '',
      startIp: '',
      network: '',
      startIp1: '',
      reservedIps: '',
      active: false
    },
    ipAddressSchema,
    () => {}
  )

  const AccessPointformik = initializeFormik(
    {
      ipAccessPoint: '',
      name: '',
      nas: '',
      node: ''
    },
    accessPointSchema,
    () => {}
  )

  const Condominiusformik = initializeFormik(
    {
      ipCpe: '',
      name: '',
      address: '',
      referent: '',
      accessPoint: ''
    },
    comondiusSchema,
    () => {}
  )

  const Knotsformik = initializeFormik(
    {
      firstName: '',
      address: ''
    },
    knotsSchema,
    () => {}
  )

  const Nasformik = initializeFormik(
    {
      ipNas: '',
      node: ''
    },
    nasSchema,
    () => {}
  )

  const onEdit1 = (ipAddress: CardType1) => {
    IpAddressformik.setValues({
      description: ipAddress.description,
      startIp: ipAddress.startIp,
      network: ipAddress.network,
      startIp1: ipAddress.startIp1,
      reservedIps: ipAddress.reservedIps,
      active: ipAddress.active
    })
    setIPId(ipAddress.id)
    setShow1(true)
    setTitle('Edit IP Address')
  }

  const onEdit2 = (accessPoint: CardType2) => {
    AccessPointformik.setValues({
      ipAccessPoint: accessPoint.ipAccessPoint,
      name: accessPoint.name,
      nas: accessPoint.nas,
      node: accessPoint.node
    })
    setIPId(accessPoint.id)
    setShow2(true)
    setTitle('Edit Access Points')
  }
  const onEdit3 = (condominiums: CardType3) => {
    Condominiusformik.setValues({
      ipCpe: condominiums.ipCpe,
      name: condominiums.name,
      address: condominiums.address,
      referent: condominiums.referent,
      accessPoint: condominiums.accessPoint
    })
    setIPId(condominiums.id)
    setShow3(true)
    setTitle('Edit Condominiums')
  }
  const onEdit4 = (knots: CardType4) => {
    Knotsformik.setValues({
      firstName: knots.firstName,
      address: knots.address
    })
    setIPId(knots.id)
    setShow4(true)
    setTitle('Edit Knots')
  }
  const onEdit5 = (nas: CardType5) => {
    Nasformik.setValues({
      ipNas: nas.ipNas,
      node: nas.node
    })
    setIPId(nas.id)
    setShow5(true)
    setTitle('Edit NAS')
  }

  const ipListColumns = getIpListColumns(onEdit1)
  const accessPointColumns = getAccessPointColumns(onEdit2)
  const condominiumsColumns = getCondominiumsColumns(onEdit3)
  const knotsColumns = getKnotsColumns(onEdit4)
  const nasColumns = getNasColumns(onEdit5)

  const fetchData = async (getDataFunction, setDataFunction) => {
    try {
      const allData = await getDataFunction()
      setDataFunction(allData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(getAllIP, setIpListData)
    fetchData(getAllAccessPoint, setAccessPointData)
    fetchData(getAllCondominiums, setCondominiums)
    fetchData(getAllKnots, setKnots)
    fetchData(getAllNAS, setNasData)
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Ip List',
            columns: ipListColumns,
            row: ipListData,
            service: 'No Ip List',
            button: {
              label: 'Add',
              onClick: () => {
                setShow1(true)
                setTitle('New Ip List')
              }
            }
          },
          {
            id: 2,
            title: 'Access Point',
            columns: accessPointColumns,
            row: accessPointData,
            service: 'No Access Point',
            button: {
              label: 'Add',
              onClick: () => {
                setShow2(true)
                setTitle('New Access Point')
              }
            }
          },
          {
            id: 3,
            title: 'Condominiums',
            columns: condominiumsColumns,
            row: condominiums,
            service: 'No Condominiums',
            button: {
              label: 'Add',
              onClick: () => {
                setShow3(true)
                setTitle('New Condominiums')
              }
            }
          },
          {
            id: 4,
            title: 'Knots',
            columns: knotsColumns,
            row: knots,
            service: 'No Knots',
            button: {
              label: 'Add',
              onClick: () => {
                setShow4(true)
                setTitle('New Knots')
              }
            }
          },
          {
            id: 5,
            title: 'NAS',
            columns: nasColumns,
            row: nasData,
            service: 'No NAS',
            button: {
              label: 'Add',
              onClick: () => {
                setShow5(true)
                setTitle('New NAS')
              }
            }
          }
        ]

        setCardData(newCardData)
        if (selectedOption === null || selectedOption.id === newCardData[0].id) {
          setSelectedOption(newCardData[0])
          setSelectedButton(newCardData[0]?.id)
        } else {
          const selectedFromNewData = newCardData.find(item => item.id === selectedOption.id)
          if (selectedFromNewData) {
            setSelectedOption(selectedFromNewData)
            setSelectedButton(selectedFromNewData?.id)
          } else {
            setSelectedOption(newCardData[0])
            setSelectedButton(newCardData[0]?.id)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [ipListData, accessPointData, condominiums, knots, nasData])

  const handleOptionChange = buttonId => {
    setSelectedButton(buttonId)
    const selected = cardData.find(item => item.id === buttonId)
    if (selected) {
      setSelectedOption(selected)
    }
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          {cardData &&
            cardData.map(button => (
              <Button
                key={button.id}
                variant={selectedButton === button.id ? 'contained' : 'outlined'}
                onClick={() => handleOptionChange(button.id)}
              >
                {button.title}
              </Button>
            ))}
        </ButtonGroup>
      </Box>

      <IpAddressComponent
        IPId={IPId}
        setIPId={setIPId}
        setShow1={setShow1}
        setTitle={setTitle}
        show1={show1}
        title={title}
        setIpListData={setIpListData}
        formik={IpAddressformik}
      />

      <AccessPointComponent
        setShow2={setShow2}
        setTitle={setTitle}
        show2={show2}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setAccessPointData={setAccessPointData}
        formik={AccessPointformik}
      />

      <CondominiumsComponent
        setShow3={setShow3}
        setTitle={setTitle}
        show3={show3}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setCondominiums={setCondominiums}
        formik={Condominiusformik}
      />

      <KnotsComponent
        setShow4={setShow4}
        setTitle={setTitle}
        show4={show4}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setKnots={setKnots}
        formik={Knotsformik}
      />

      <NasComponent
        setShow5={setShow5}
        setTitle={setTitle}
        show5={show5}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setNasData={setNasData}
        formik={Nasformik}
      />
      <Box>
        <IpManagement selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
