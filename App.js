import React, { Component } from 'react';
import { Platform, Text, StyleSheet, View, SafeAreaView } from 'react-native';
import InputNumberButton from './InputNumberButton';

const buttons = [
  ['C', 'Del'],
  ['7', '8', '8', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']

]

export default class App extends Component {

  constructor() {
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonsIndex) => {
        return <InputNumberButton
          value={buttonItems}
          handleOnPress={this.handlerInput.bind(this, buttonItems)}
          key={'btn-' + buttRowonIndex} />
      });
      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}>
        {rowItem}
      </View>
    });

    return layouts
  }

  handlerInput = (input) => {
    const { displayValue, firstValue, secondValue, operator } = this.state;
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })

        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          operator: input,
          nextValue: true,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;
      case '.':
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
      case '=':
        let result = eval(firstValue + operator + secondValue)
        this.setState({
          displayValue: result%1 === 0? result: result.toFixed(2),
          firstValue: result %1 === 0? result: result.toFixed(2),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;
      case 'C':
        this.setState(this.initialState)
        break;
      case 'Del':
        let string = displayValue.toString();
        let delString = string.substr(0, string.length - 1)
        let length = string.length;
        this.setState({
          displayValue: length == 1 ? '0' : delString,
          firstValue: length == 1? '': delString
        })
        break;
    }


  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer} >
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#121240'
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#3D0075'
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fornWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDiretion: 'row'
  }
});
