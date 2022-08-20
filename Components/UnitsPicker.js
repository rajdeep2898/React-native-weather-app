import React,{useState} from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';


export default function UnitsPicker({unitsSystem,setUnitsSystem}) {
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(unitsSystem);
  const [items, setItems] = useState([
    {label: 'C°', value: 'metric'},
    {label: 'F°', value: 'imperial'}

  ]);

    return (
        <View >
             <DropDownPicker
             style={styles.pickerBar}
             itemStyle={{fontStyle:12}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(item) =>
                    setUnitsSystem(item.value)
                }
    />
        </View>
    )
}
const styles = StyleSheet.create({
    pickerBar: {
        // position:'absolute',
        ...Platform.select({
            ios: {
                top: -20
            },
            android: {
                top: -100
            }
        }),
        left: 20,
        height: 50,
        width: 100
    }

})