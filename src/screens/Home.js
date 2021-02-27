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
  showMines,
  invertFlag,
  flagsUsed
} from '../functions'

import MineField from '../components/MineField'
import Header from '../components/Header'

import LevelSelection from './LevelSelection'

export default () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(rows * cols * params.difficultLevel)
  }

  const createState = () => {
    const rows = params.getRowsAmount()
    const cols = params.getColumnsAmount()
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  const [state, setState] = useState(createState())

  const onOpenField = (row, column) => {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if (lost) {
      showMines(board)
      Alert.alert('You loose!', 'What a shame!')
    }
    if (won) {
      Alert.alert('Win!', 'Congrats!')
    }
    setState({ board, lost, won, showLevelSelection: false })
  }

  const onFlagField = (row, column) => {
    const board = cloneBoard(state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Win!', 'Congrats!')
    }
    setState({ board, won, showLevelSelection: false })
  }

  const onLevelSelected = level => {
    params.difficultLevel = level
    setState(createState())
  }

  return (
    <View style={styles.view}>
      <LevelSelection
        isVisible={state.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() =>
          setState(prev => ({ ...prev, showLevelSelection: false }))
        }
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(state.board)}
        onNewGame={() => setState(createState())}
        onFlagPress={() =>
          setState(prev => ({ ...prev, showLevelSelection: true }))
        }
      />
      <View styles={styles.board}>
        <MineField
          board={state.board}
          onOpenField={onOpenField}
          onFlagField={onFlagField}
        ></MineField>
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
