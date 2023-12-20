import { useEffect, useState } from 'react'
import { EditorType1, EditorType2, EditorType3, EditorType4, EditorType5 } from 'src/types/apps/userTypes'
import Box from '@mui/material/Box'
import { getAllBillingGroup, getAllEditorProfile, getAllMorRates, getAllPaymentMethod, getAllRate } from './api'
import EditorList from './EditorList'
import {
  MORColumns,
  billingColumns,
  paymentMethodColumns,
  profileColumns,
  ratesColumns,
  settingColumns
} from 'src/components/EditorColumns'
import ProfileComponent from 'src/components/ProfileComponent'
import MORRatesComponent from 'src/components/MORRatesComponent'
import PaymentMethodComponent from 'src/components/PaymentMethodComponent'
import BillingGroupComponent from 'src/components/BillingGroupComponent'
import RateComponent from 'src/components/RateComponent'
import { useFormik } from 'formik'
import { billingGroupSchema, morSchema, paymentMethodSchema, profileSchema, rateSchema } from 'src/schema'
import { Button, ButtonGroup } from '@mui/material'

interface EditorManagmentType {
  id: string
  title: string
  columns: string
  row: string
  service: string
  button: string
}

const index = () => {
  const [cardData, setCardData] = useState<EditorManagmentType[]>([])
  const [selectedOption, setSelectedOption] = useState<EditorManagmentType | null>(null)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)
  const [show4, setShow4] = useState<boolean>(false)
  const [show5, setShow5] = useState<boolean>(false)
  const [show6, setShow6] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('Add Setting')
  const [settingData, setSettingData] = useState<EditorType1[] | undefined>(undefined)
  const [profileData, setProfileData] = useState<EditorType2[] | undefined>(undefined)
  const [MORRateData, setMORRateData] = useState<EditorType3[] | undefined>(undefined)
  const [paymentmethodData, setPaymentMethodData] = useState<EditorType4[] | undefined>(undefined)
  const [billingGroupData, setBillingGroupData] = useState<EditorType5[] | undefined>(undefined)
  const [rateData, setRateData] = useState<EditorType5[] | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [IPId, setIPId] = useState<string | null>(null)
  const [selectedButton, setSelectedButton] = useState(null)



  const initializeFormik = (initialValues, validationSchema, onSubmit) => {
    return useFormik({ initialValues, validationSchema, onSubmit })
  }

  const profileFormik = initializeFormik(
    {
      BackendDescription: '',
      Descriptioninvoice: '',
      Service: '',
      Type: '',
      LineTechnicalProfile: '',
      BandPeakDown: '',
      BandaPiccoUP: '',
      PriceMonthly: undefined,
      RadiusServiceId: undefined,
      CommunicationCode: '',
      Partner: '',
      Business: false,
      active: false
    },
    profileSchema,
    () => {}
  )

  const morFormik = initializeFormik(
    {
      BackendDescription: '',
      Descriptioninvoice: '',
      MORID: undefined,
      Service: '',
      CommunicationCode: '',
      Isnap: undefined,
      ITfixed: undefined,
      ITfurniture: undefined,
      FixedEU: undefined,
      EUfurniture: undefined,
      FixedWorld: undefined,
      WorldFurniture: undefined
    },
    morSchema,
    () => {}
  )

  const paymentFormik = initializeFormik(
    {
      CommunicationCode: '',
      Description: '',
      InvoiceCodeEl: '',
      BillingNotes: '',
      Unpaidtext: ''
    },
    paymentMethodSchema,
    () => {}
  )

  const billingFormik = initializeFormik(
    {
      firstName: '',
      Monthinadvance: undefined,
      Daytoexpiry: undefined,
      TransmitterCode: undefined,
      Name: '',
      Address: '',
      PostalCode: undefined,
      Common: '',
      Province: '',
      Telephone: undefined,
      CrimeCode: '',
      Bank: '',
      IBAN: '',
      PostalAccount: undefined,
      Email: '',
      VATNumber: undefined,
      TaxIDCode: undefined,
      SepaCodeCUC: '',
      SepaCreditorCode: undefined,
      DD1stUnpaidNotice: undefined,
      DD2stUnpaidNotice: undefined,
      GGServicesBlock: undefined,
      Nation: undefined
    },
    billingGroupSchema,
    () => {}
  )

  const rateFormik = initializeFormik(
    {
      Rate: '',
      Description: '',
      Nature: '',
      Default: false
    },
    rateSchema,
    () => {}
  )

  const onEdit1 = (profile: EditorType1) => {
    profileFormik.setValues({
      BackendDescription: profile.BackendDescription,
      Descriptioninvoice: profile.Descriptioninvoice,
      Service: profile.Service,
      Type: profile.Type,
      LineTechnicalProfile: profile.LineTechnicalProfile,
      BandPeakDown: profile.BandPeakDown,
      BandaPiccoUP: profile.BandaPiccoUP,
      PriceMonthly: profile.PriceMonthly,
      RadiusServiceId: profile.RadiusServiceId,
      CommunicationCode: profile.CommunicationCode,
      Partner: profile.Partner,
      Business: profile.Business,
      active: profile.active
    })
    setIPId(profile.id)
    setShow2(true)
    setTitle('Edit Data Profile')
  }
  const onEdit2 = (mor: EditorType2) => {
    morFormik.setValues({
      BackendDescription: mor.BackendDescription,
      Descriptioninvoice: mor.Descriptioninvoice,
      MORID: mor.MORID,
      Service: mor.Service,
      CommunicationCode: mor.CommunicationCode,
      Isnap: mor.Isnap,
      ITfixed: mor.ITfixed,
      ITfurniture: mor.ITfurniture,
      FixedEU: mor.FixedEU,
      EUfurniture: mor.EUfurniture,
      FixedWorld: mor.FixedWorld,
      WorldFurniture: mor.WorldFurniture
    })
    setIPId(mor.id)
    setShow3(true)
    setTitle('Edit Telephone Tariff')
  }
  const onEdit3 = (payment: EditorType3) => {
    paymentFormik.setValues({
      CommunicationCode: payment.CommunicationCode,
      Description: payment.Description,
      InvoiceCodeEl: payment.InvoiceCodeEl,
      BillingNotes: payment.BillingNotes,
      Unpaidtext: payment.Unpaidtext
    })
    setIPId(payment.id)
    setShow4(true)
    setTitle('Edit Payment Method')
  }
  const onEdit4 = (billing: EditorType4) => {
    billingFormik.setValues({
      firstName: billing.firstName,
      Monthinadvance: billing.Monthinadvance,
      Daytoexpiry: billing.Daytoexpiry,
      TransmitterCode: billing.TransmitterCode,
      Name: billing.Name,
      Address: billing.Address,
      PostalCode: billing.PostalCode,
      Common: billing.Common,
      Province: billing.Province,
      Telephone: billing.Telephone,
      CrimeCode: billing.CrimeCode,
      Bank: billing.Bank,
      IBAN: billing.IBAN,
      PostalAccount: billing.PostalAccount,
      Email: billing.Email,
      VATNumber: billing.VATNumber,
      TaxIDCode: billing.TaxIDCode,
      SepaCodeCUC: billing.SepaCodeCUC,
      SepaCreditorCode: billing.SepaCreditorCode,
      DD1stUnpaidNotice: billing.DD1stUnpaidNotice,
      DD2stUnpaidNotice: billing.DD2stUnpaidNotice,
      GGServicesBlock: billing.GGServicesBlock,
      Nation: billing.Nation
    })
    setIPId(billing.id)
    setShow5(true)
    setTitle('Edit Billing Group')
  }
  const onEdit5 = (rate: EditorType5) => {
    rateFormik.setValues({
      Rate: rate.Rate,
      Description: rate.Description,
      Nature: rate.Nature,
      Default: rate.Default
    })
    setIPId(rate.id)
    setShow6(true)
    setTitle('Edit Rate')
  }

  const settingColumn = settingColumns()
  const profileColumn = profileColumns(onEdit1)
  const morColumns = MORColumns(onEdit2)
  const paymentMethodColumn = paymentMethodColumns(onEdit3)
  const billingsColumn = billingColumns(onEdit4)
  const ratesColumn = ratesColumns(onEdit5)

  const fetchData = async (getDataFunction, setDataFunction) => {
    try {
      const allData = await getDataFunction();
      setDataFunction(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData(getAllEditorProfile, setProfileData);
    fetchData(getAllMorRates, setMORRateData);
    fetchData(getAllPaymentMethod, setPaymentMethodData);
    fetchData(getAllBillingGroup, setBillingGroupData);
    fetchData(getAllRate, setRateData);
  }, []);
  

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const newCardData = [
          {
            id: 1,
            title: 'Settings',
            columns: settingColumn,
            row: null || [],
            service: 'NO Settings',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow1(true)
                setTitle('Add Setting')
              }
            }
          },
          {
            id: 2,
            title: 'Profiles',
            columns: profileColumn,
            row: profileData,
            service: 'No Profiles',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow2(true)
                setTitle('New Data Profile')
              }
            }
          },
          {
            id: 3,
            title: 'MOR Rates',
            columns: morColumns,
            row: MORRateData,
            service: 'No MOR Rates',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow3(true)
                setTitle('New Telephone Tariff')
              }
            }
          },
          {
            id: 4,
            title: 'Payment Methods',
            columns: paymentMethodColumn,
            row: paymentmethodData,
            service: 'No Payment Methods',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow4(true)
                setTitle('New Payment Method')
              }
            }
          },
          {
            id: 5,
            title: 'Billing Groups',
            columns: billingsColumn,
            row: billingGroupData,
            service: 'No Billing Groups',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow5(true)
                setTitle('New Billing Group')
              }
            }
          },
          {
            id: 6,
            title: 'Rates',
            columns: ratesColumn,
            row: rateData,
            service: 'No Rates',
            button: {
              label: 'Add',
              filter: 'filter',
              onClick: () => {
                setShow6(true)
                setTitle('New Rate')
              }
            }
          }
        ]

        setCardData(newCardData)
        if (selectedOption === null || selectedOption.id === newCardData[0].id) {
          setSelectedOption(newCardData[0]);
          setSelectedButton(newCardData[0]?.id);
        } else {
          const selectedFromNewData = newCardData.find((item) => item.id === selectedOption.id);
          if (selectedFromNewData) {
            setSelectedOption(selectedFromNewData);
            setSelectedButton(selectedFromNewData?.id);
          } else {
            setSelectedOption(newCardData[0]);
            setSelectedButton(newCardData[0]?.id);
          }
        }
        
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllData()
  }, [profileData, MORRateData, paymentmethodData, billingGroupData, rateData])


  const handleOptionChange = (buttonId) => {
    const selected = cardData.find((item) => item.id === buttonId);
  
    if (selected) {
      setSelectedOption(selected);
      setSelectedButton(buttonId);
    } else if (selectedOption) {
      setSelectedButton(selectedOption.id);
    }
  };
  
  
  
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

      <ProfileComponent
        setTitle={setTitle}
        show2={show2}
        title={title}
        setProfileData={setProfileData}
        setShow2={setShow2}
        IPId={IPId}
        setIPId={setIPId}
        formik={profileFormik}
      />

      <MORRatesComponent
        setShow3={setShow3}
        setTitle={setTitle}
        show3={show3}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setMORRateData={setMORRateData}
        formik={morFormik}
      />

      <PaymentMethodComponent
        show4={show4}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setPaymentMethodData={setPaymentMethodData}
        setShow4={setShow4}
        setTitle={setTitle}
        formik={paymentFormik}
      />

      <BillingGroupComponent
        setShow5={setShow5}
        setTitle={setTitle}
        show5={show5}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setBillingGroupData={setBillingGroupData}
        formik={billingFormik}
      />

      <RateComponent
        setShow6={setShow6}
        setTitle={setTitle}
        show6={show6}
        title={title}
        IPId={IPId}
        setIPId={setIPId}
        setRateData={setRateData}
        formik={rateFormik}
      />

      <Box>
        <EditorList selectedCard={selectedOption} loading={!isLoaded} />
      </Box>
    </Box>
  )
}

export default index
