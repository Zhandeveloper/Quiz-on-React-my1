import './index.scss';
import React, { useEffect } from 'react';

const questions = [{
  title:'Привет,это мини-тест про знания IT 👨‍💻 ты хочешь его пройти?',
  variants:["Да"]
},

  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Для чего используется библиотека aiogram?',
    variants: ['создание ИИ', 'создание тг ботов', 'для математических вычислений'],
    correct: 1,
  },
  {
    title: 'Что такое GitHub?',
    variants: [
      'веб-сервис, который использует Git для хранения и управления проектами онлайн',
      'Игровой движок используемый для создания 2д игр',
      'Платформа для обучения программированию',
    ],
    correct: 0,
  },
  {
    title: 'Какой язык программирования используется в Unity?',
    variants: [
      'C++',
      'Python',
      'C#',
    ],               
    correct: 2,
  },
  {
    title: 'Какие из этих протоколов безопасны?',
    variants: [
      'HTTP',
      'FTP',
      'HTTPS',
    ],               
    correct: 2,
  },
  {
    title: 'Что такое while в Python?',
    variants: [
      'Цикл',
      'Функция',
      'Условной оператор',
    ],               
    correct: 0,
  },
  {
    title: 'Как объявить изменяемую переменную в JavaScript?',
    variants: [
      'object',
      'let',
      'const',
    ],               
    correct: 1,
  },
  {
    title: 'Кто изобрёл Интернет?',
    variants: [
      'Тим Бернерс-Ли',
      'Линус Торвальдс',
      'Билл Гейтс',
    ],               
    correct: 0,
  },
  {
    title: 'Какой из этих языков изобрели Apple?',
    variants: [
      'Python',
      'Java',
      'Swift',
    ],               
    correct: 2,
  },
  {
    title: 'На каком языке был разработан Minecraft?',
    variants: [
      'C#',
      'Java',
      'C++',
    ],               
    correct: 1,
  },
];

function Result({ correct, rank }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length-1}</h2>
      <h2>{rank}</h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li key={text} onClick={() => onClickVariant(index)}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [rank, setRank] = React.useState("");

  const question = questions[step];

  useEffect(() => {
    let rank;

    switch (true) {
        case correct === 10:
            rank = "Вы ответили на всё правильно,превосходный результат!😎";
            break;
        case correct >= 7 && correct < 10:
            rank = "Хороший результат😊";
            break;
        case correct <=6 && correct>3:
            rank = "Средний результат😄";
            break;
        case correct <=3 && correct>0:
          rank="Плохой результат😑"
            break;
        // Добавьте другие условия по необходимости
        default:
           rank="Вы набрали 0 баллов,очень плохой результат😠"
            break;
    }
    setRank(rank)
}, [correct]);


  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game question={question} onClickVariant={onClickVariant} step={step} />
      ) : (
        <Result correct={correct} rank={rank} />
      )}
    </div>
  );
}

export default App;

