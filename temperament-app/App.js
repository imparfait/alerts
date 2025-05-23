import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';

const questions = [
  {
    question: "Як ви реагуєте на стресові ситуації?",
    options: [
      { text: "Спокійно і зважено", type: "флегматик" },
      { text: "Починаю нервувати", type: "меланхолік" },
      { text: "Різко і емоційно", type: "холерик" },
      { text: "З гумором", type: "сангвінік" }
    ]
  },
  {
    question: "Як ви проводите вільний час?",
    options: [
      { text: "Активно і весело", type: "сангвінік" },
      { text: "Обдумую життя", type: "меланхолік" },
      { text: "Спокійно вдома", type: "флегматик" },
      { text: "Пробую нове, ризиковано", type: "холерик" }
    ]
  },
  {
    question: "Як ви поводитесь у новій компанії?",
    options: [
      { text: "Відкрито і впевнено", type: "сангвінік" },
      { text: "Спостерігаю спочатку", type: "флегматик" },
      { text: "Соромлюсь і мовчу", type: "меланхолік" },
      { text: "Швидко починаю діяти", type: "холерик" }
    ]
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [results, setResults] = useState({
    сангвінік: 0,
    меланхолік: 0,
    холерик: 0,
    флегматик: 0
  });

  const [questionIndex, setQuestionIndex] = useState(0);

  const startTest = () => {
    setQuestionIndex(0);
    setResults({
      сангвінік: 0,
      меланхолік: 0,
      холерик: 0,
      флегматик: 0
    });
    askQuestion(0);
  };

  const askQuestion = (index) => {
    const q = questions[index];
    Alert.alert(
      `Питання ${index + 1}`,
      q.question,
      q.options.map((option) => ({
        text: option.text,
        onPress: () => handleAnswer(option.type)
      })),
      { cancelable: false }
    );
  };

  const handleAnswer = (type) => {
    setResults(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    if (nextIndex < questions.length) {
      askQuestion(nextIndex);
    } else {
      showResult();
    }
  };

  const showResult = () => {
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    const [topType, count] = sorted[0];

    Alert.alert(
      "Результат",
      `Ваш темперамент: ${topType}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Тест на темперамент</Text>
      <Button title="Старт" onPress={startTest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});
