import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const questions = [
  { text: 'Do you enjoy being in the spotlight?', type: 'sanguine' },
  { text: 'Do you prefer quiet environments?', type: 'melancholic' },
  { text: 'Do you act before you think?', type: 'choleric' },
  { text: 'Do you like routine and stability?', type: 'phlegmatic' }
];

export default function Home() {
  const scores = {
    sanguine: 0,
    melancholic: 0,
    choleric: 0,
    phlegmatic: 0
  };

  const askQuestion = (index: number) => {
    if (index >= questions.length) {
      const result = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      Alert.alert('Result', `Your temperament is: ${result}`);
      return;
    }

    const question = questions[index];
    Alert.alert(
      `Question ${index + 1}`,
      question.text,
      [
        {
          text: 'Yes',
          onPress: () => {
            scores[question.type]++;
            askQuestion(index + 1);
          }
        },
        {
          text: 'No',
          onPress: () => askQuestion(index + 1)
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Start" onPress={() => askQuestion(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
});
