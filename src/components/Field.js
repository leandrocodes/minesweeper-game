import React from 'react'
import { View, StyleSheet } from 'react-native'

import params from '../params'

export default () => {
  const styleField = [styles.field]

  if (styleField.length === 1) styleField.push(styles.fieldRegular)

  return <View style={styleField}></View>
}

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize
  },
  fieldRegular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333'
  }
})
