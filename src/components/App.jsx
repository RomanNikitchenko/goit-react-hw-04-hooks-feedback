import React from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const sum = good + neutral + bad;
    return Math.round(sum > 0 ? (good * 100) / sum : 0);
  };

  handleChange = key => {
    this.setState(state => ({ [key]: state[key] + 1 }));
  };

  render() {
    const { good, neutral, bad } = this.state;

    const nameButton = Object.keys(this.state);

    return (
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={nameButton}
          onLeaveFeedback={this.handleChange}
        />

        {this.countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    );
  }
}

export default App;
