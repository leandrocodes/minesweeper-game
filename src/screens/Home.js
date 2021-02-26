import React, { Component, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Alert
} from 'react-native'
import params from '../params'

import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
} from '../functions'

import MineField from '../components/MineField'
import Flag from '../components/Flag'

export default () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(rows * cols * params.difficultLevel)
  }

  const cols = params.getColumnsAmount()
  const rows = params.getRowsAmount()

  const [state, setState] = useState({
    board: createMinedBoard(rows, cols, minesAmount()),
    won: false,
    lost: false
  })

  onOpenField = (row, column) => {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if (lost) {
      showMines(board)
      Alert.alert('Perdeu!', 'Que buuuurrooo!')
    }
    if (won) {
      Alert.alert('Ganhou!', 'Parabéns!')
    }
    setState({ board, lost, won })
  }

  return (
    <View style={styles.view}>
      <Text style={styles.welcome}>Starting mines!</Text>
      <Text style={styles.instructions}>
        Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View styles={styles.board}>
        <MineField board={state.board} onOpenField={onOpenField}></MineField>
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
