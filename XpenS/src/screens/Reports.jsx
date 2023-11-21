import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {registerTranslation} from 'react-native-paper-dates';
import {DatePickerModal} from 'react-native-paper-dates';
import Chart from 'react-google-charts';
import { Icon } from 'react-native-paper';

export const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

export default function Reports() {
  const [value, setValue] = useState(null);
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      setOpen(false);
      setRange({startDate, endDate});
    },
    [setOpen, setRange],
  );

  const stackData = [
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Jan',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Feb',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Apr',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'May',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Jun',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Jul',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Aug',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Sept',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Oct',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Nov',
    },
    {
      stacks: [
        {value: 500, color: '#f54242'},
        {value: 850, color: '#48f542', marginBottom: 2},
      ],
      label: 'Dec',
    },
  ];

  const data = [
    {label: 'Daily', value: '1'},
    {label: 'Weekly', value: '2'},
    {label: 'Monthly', value: '3'},
    {label: 'Yearly', value: '4'},
  ];

  // const pieData = [
  //   ['Spends', 11],
  //   ['Income', 2],
  // ];
  const pieData = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'lightgray'},
  ];


  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        height: '100%',
      }}>
      <Image
        source={require('../assets/images/bg.png')}
        style={{height: '100%', width: '100%', position: 'absolute'}}
        blurRadius={7}
      />
      <View style={{flexDirection:"row", justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Range"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
        <TouchableOpacity onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          <Text style={{fontSize:25,marginTop:10}}><Icon source="calendar-multiple" size={25}/></Text>
        </TouchableOpacity>
        <DatePickerModal
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </View>
      <TouchableOpacity
        style={{
          height: 30,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 40,
          borderRadius: 30,
          backgroundColor: 'green',
        }}>
        <Text style={{color: 'white'}}>Generate Report</Text>
      </TouchableOpacity>
      <View
        style={[
          {
            backgroundColor: '#ffe6fe',
            margin: 15,
            borderRadius: 20,
            padding: 10,
          },
          styles.shadowProp,
        ]}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <PieChart
            donut
            innerRadius={80}
            data={pieData}
            centerLabelComponent={() => {
              return <Text style={{fontSize: 30}}>70%</Text>;
            }}
          />
          {/* <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={pieData}
            options={options}
          /> */}
        </View>
      </View>
      <View style={{backgroundColor:"#ffe6fe",borderRadius:20,padding:20,marginTop: 5, marginLeft: 10}}>
        <BarChart
          width={340}
          rotateLabel
          noOfSections={4}
          stackData={stackData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 50,
    width: 250,
    alignSelf: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    shadowColor: '#52006A',
  },
});
