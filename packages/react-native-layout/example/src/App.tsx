import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Spacing, Padding, Line, Margin } from '@bothrs/react-native-layout'

export default function App() {
  return (
    <View style={styles.container}>
      <Padding backgroundColor="red" horizontal={30} vertical={20} />
      <Spacing height={20} />
      <Padding backgroundColor="red" horizontal={30} vertical={20}>
        <Margin backgroundColor="blue" horizontal="30%" vertical={10}>
          <Text>Hello</Text>
        </Margin>
      </Padding>
      <Line color="orange" direction="vertical" thickness={1} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
