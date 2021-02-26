import React from 'react'
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native'
import params from '../params'

import Field from '../components/Field'

export default () => (
  <View style={styles.view}>
    <Text style={styles.welcome}>Starting mines!</Text>
    <Text style={styles.instructions}>
      Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
    </Text>
    <Field />
    <Field opened />
    <Field opened nearMines={1} />
    <Field opened nearMines={2} />
    <Field opened nearMines={3} />
    <Field opened nearMines={4} />
    <Field opened nearMines={5} />
    <Field opened nearMines={6} />
  </View>
)

const styles = StyleSheet.create({
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
