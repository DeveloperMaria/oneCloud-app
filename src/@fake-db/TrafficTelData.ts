const generateCardData = () => {
    const newCardData = [
      {
        id: 1,
        title: '01/03/2019'
      },
      {
        id: 2,
        title: '02/03/2019'
      },
      {
        id: 3,
        title: '04/03/2019'
      },
      {
        id: 4,
        title: '01/07/2019'
      },
      {
        id: 5,
        title: '01/08/2019'
      }
    ];
  
    return newCardData.map((item) => ({
      id: item.id,
      title: item.title,
      label: `${item.title}`, // You can add a label for displaying in the Autocomplete component
    }));
  };
  
  export default generateCardData;

  
  export const trafficData =[
    {
        id:1,
        ClientId:345,
        MorId:45,
        MorUsername:'thif',
        Customer:'ttyyy',
        Note:'rtyff',
        Traffic:'fghhh',
        TrafficCleared:true,
        Sales:false
    },

    {
        id:2,
        ClientId:375,
        MorId:45,
        MorUsername:'thif',
        Customer:'ttyyy',
        Note:'rtyff',
        Traffic:'fghhh',
        TrafficCleared:true,
        Sales:false
    },
    {
        id:3,
        ClientId:56,
        MorId:45,
        MorUsername:'thif',
        Customer:'ttyyy',
        Note:'rtyff',
        Traffic:'fghhh',
        TrafficCleared:true,
        Sales:false
    },
    {
        id:4,
        ClientId:444,
        MorId:45,
        MorUsername:'thif',
        Customer:'ttyyy',
        Note:'rtyff',
        Traffic:'fghhh',
        TrafficCleared:true,
        Sales:false
    },
    {
        id:5,
        ClientId:44,
        MorId:45,
        MorUsername:'thif',
        Customer:'ttyyy',
        Note:'rtyff',
        Traffic:'fghhh',
        TrafficCleared:true,
        Sales:false
    },
  ]