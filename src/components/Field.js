import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import params from '../params'

import Mine from './Mine'
import Flag from './Flag'

export default ({ mined, opened, nearMines, exploded, flagged }) => {
  const styleField = [styles.field]

  // CONSTRUIR DICIONARIO
  if (opened) styleField.push(styles.openField)
  if (exploded) styleField.push(styles.exploded)
  if (flagged) styleField.push(styles.flagged)
  if (!opened && !exploded) styleField.push(styles.fieldRegular)

  // CONSTRUIR DICIONARIO
  let color = null
  if (nearMines > 0) {
    if (nearMines === 1) color = '#2A28D7'
    if (nearMines === 2) color = '#2b520f'
    if (nearMines > 2 && nearMines < 6) color = '#f9060a'
    if (nearMines >= 6) color = '#f221a9'
  }

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 && (
        <Text style={[styles.label, { color }]}>{nearMines}</Text>
      )}

      {mined && opened && <Mine />}

      {flagged && !opened && <Flag />}
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
  },

  exploded: {
    backgroundColor: 'red',
    borderColor: 'red'
  }
})
