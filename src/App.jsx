import React, { Component } from "react";
import "./App.css";
import Statistics from "./components/Statistics/Statistics";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Section from "./components/Sections/Sections";
import Notification from "./components/Notification/Notification";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  }

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total;
  }

  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback();
    const positivePercentage =
      total > 0 ? (this.state.good / total) * 100 : total;
    return positivePercentage.toFixed();
  }
  eventIncrement = (option) => {
    if (option === "good") {
      this.setState((prevState) => ({ good: prevState.good + 1 }));
    } else if (option === "neutral") {
      this.setState((prevState) => ({ neutral: prevState.neutral + 1 }));
    } else if (option === "bad") {
      this.setState((prevState) => ({ bad: prevState.bad + 1 }));
    }
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const opt = Object.keys(this.state);
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={opt}
            onLeaveFeedback={this.eventIncrement}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback"></Notification>
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            ></Statistics>
          )}
        </Section>
      </>
    );
  }
}

export default App;
