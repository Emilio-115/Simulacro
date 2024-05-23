import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { postCategory } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'

export default function CreateCategoryScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState([])
  const [categoryName, setCategoryName] = useState('')

  const createCategory = async () => {
    const category = {
      name: categoryName
    }
    setBackendErrors([])
    try {
      const createdCategory = await postCategory(category)
      showMessage({
        message: `Category ${createdCategory.name} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('CreateRestaurantsScreen', { dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }

  return (

        <>
        <View style={styles.layout}>
        <View style={styles.labelWrapper}>
            <TextRegular>Category name</TextRegular>
        </View>
        <View style={styles.inputWrapper}>
            <TextInput
                name='Category name'
                style={styles.input}
                onChangeText={setCategoryName}
                value={categoryName}
                placeholder='Introduzca un nombre de categoria'
            />
        </View>
        <Pressable
                        onPress={createCategory}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? GlobalStyles.brandSuccessTap
                              : GlobalStyles.brandSuccess
                          },
                          styles.button
                        ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                        <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                        <TextRegular textStyle={styles.text}>
                        Save
                        </TextRegular>
                    </View>
                    </Pressable>
        </View>

</>
  )
}

const styles = StyleSheet.create({

  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  labelWrapper: {
    width: '100%',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5
  },
  inputWrapper: {
    width: '100%'
  },
  input: {
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    padding: 10
  },
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})
