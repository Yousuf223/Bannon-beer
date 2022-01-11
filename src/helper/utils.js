import * as ImagePicker from 'react-native-image-crop-picker';


export const imagePicker = async ({multiple=true, }) => {
   try {
    const result = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        multiple: multiple,
    })
    console.log('result',result);
    return result
   } catch (error) {
       console.log('imagePicker error', error)
   }
}