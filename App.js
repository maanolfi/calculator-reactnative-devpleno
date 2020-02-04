import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState('')

  const col1Buttons = [
    ['7', '8', '9'],
    ['4','5','6'],
    ['1','2', '3'],
    [',','0','=']
  ]
  const col2Buttons = ['C', '/', 'X', '-', '+']

  const handleOp = op => {    
    if(op === 'C'){
      setDisplay('')
      setResult('')
    } else if (op === '=') {
      setDisplay(result)
      setResult('')
    } else {
      const display_ = display + op
      let result_ = result
      try {
        let fixedOperation = display_.split('x').join('*')
        fixedOperation = fixedOperation.split('/').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        
        result_ = new String(eval(fixedOperation)).toString()
      } catch (err) {}

      setDisplay(display_)
      setResult(result_)
    }
    
   
  }

  return (
    <View style={styles.container}>  
    
      <Text style={styles.display}>{display}</Text>
      <Text style={styles.result}>{result}</Text>

      <View style={styles.buttons}>
        <View style={styles.col1}>
        {
          col1Buttons.map((line, ind) => 
            <View key={ind} style={styles.line}>
              {
                line.map((op, id) => 
                <TouchableOpacity key={id} style={styles.btn} 
                onPress={() => handleOp(op)}>
                  <Text style={styles.btnText}>{op}</Text>
                </TouchableOpacity>
                )
              }            
              
            </View>
            )
        }        
        </View>
        <View style={styles.col2}>
        {
          col2Buttons.map((op, id) => 
          <TouchableOpacity key={id} style={styles.btn} 
            onPress={() => handleOp(op)}>
            <Text style={styles.btnText}>{op}</Text>
          </TouchableOpacity>
          )
        } 
        </View>
      </View>
      
        
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#efefef',
    fontSize: 60,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  result : {
    flex: 0.8,
    backgroundColor: '#efefef', 
    fontSize: 40,
    textAlign: 'right',    
    paddingRight: 10

  },
  buttons: {
    flex: 5,
    flexDirection: 'row',       
    
  },
  col1: {
    flex: 3,
    backgroundColor: '#000'
  },
  line: {
    flex: 1,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {    
    textAlign: 'center', 
    fontSize: 50,
    color: '#fff'   
  },
  col2: {
    flex: 1,
    backgroundColor: '#0b0b0b'
  }, 
});

export default App
