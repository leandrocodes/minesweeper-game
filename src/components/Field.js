import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import params from '../params'

export default ({ mined, opened, nearMines }) => {
  const styleField = [styles.field]

  if (opened) styleField.push(styles.openField)
  if (styleField.length === 1) styleField.push(styles.fieldRegular)

  let color = null
  if (nearMines > 0) {
    if (nearMines === 1) color = '#2A28D7'
    if (nearMines === 2) color = '#2b520f'
    if (nearMines > 2 && nearMines < 6) color = '#f9060a'
    if (nearMines >= 6) color = '#f221a9'
  }

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? (
        <Text style={[styles.label, { color }]}>{nearMines}</Text>
      ) : (
        false
      )}
    </View>
  )
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
  },

  openField: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center'
  },

  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize
  }
})
