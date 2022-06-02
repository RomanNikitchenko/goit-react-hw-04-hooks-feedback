import React from 'react';
import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
  const [options, setOptions] = useState({ good: 0, neutral: 0, bad: 0});

  const handleChange = key => {
    setOptions(options => ({...options, [key]: options[key] + 1}));
  };

  const { good, neutral, bad } = options

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const sum = good + neutral + bad;
    return Math.round(sum > 0 ? (good * 100) / sum : 0);
  };

  const nameButton = Object.keys(options);

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions options={nameButton} onLeaveFeedback={handleChange} />

      {countTotalFeedback() > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};

export default App;
