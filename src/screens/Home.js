import React from 'react'
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native'

export default () => (
  <View style={styles.view}>
    <Text>Eaí</Text>
  </View>
)

const styles = StyleSheet.create({
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
