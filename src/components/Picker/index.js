import React from 'react';
import RNPickerSelect from 'react-native-picker-select'

export default function Picker ({ data, onChange }) {
  const placeholder = {
    label: 'XXX',
    value: null,
    color: '#000'
  }

  return (
    <RNPickerSelect
    placeholder={placeholder} 
    items={data}
    onValueChange={(value) => onChange(value) }
    style={{
      inputIOS: {
        fontSize: 20,
      },
      inputAndroid: {
        fontSize: 20
      }
    }}
    />
  );
}