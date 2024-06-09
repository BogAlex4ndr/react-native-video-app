import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'

export const openPicker = async (selectType: string, source: string, setForm, form) => {
    let result;

    if (source === 'library') {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
        });
    } else if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
        });
    }

    if (!result.canceled) {
        if (selectType === 'image') {
            setForm({ ...form, thumbnail: result.assets[0] });
        }
        if (selectType === 'video') {
            setForm({ ...form, video: result.assets[0] });
        }
    } else {
        setTimeout(() => {
            Alert.alert('No Document Selected', JSON.stringify(result, null, 2));
        }, 100);
    }
};