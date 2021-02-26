import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native'
import params from '../params'

import { createMinedBoard } from '../functions'

import MineField from '../components/MineField'
import Flag from '../components/Flag'

export default () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(rows * cols * params.difficultLevel)
  }

  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return {
      board: createMinedBoard(rows, cols, minesAmount())
    }
  }

  const [state, setState] = useState(createState())

  return (
    <View style={styles.view}>
      <Text style={styles.welcome}>Starting mines!</Text>
      <Text style={styles.instructions}>
        Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View styles={styles.board}>
        <MineField board={state.board}></MineField>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa'
  }
})
