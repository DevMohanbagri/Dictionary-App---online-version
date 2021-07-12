import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            text: '',
            displayText: ''
        }
    }
    getWord=(word)=>{
      var searchKeyword = word.toLowerCase()
      var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
      return fetch(url)
      .then((data)=>{
        if(data.status===200){
          return data.json()
        }
        else{
          return null
        }
      })
      .then((response)=>{
        var responseObject = response

        if(responseObject){
          var wordData = responseObject.definitions[0]
          var definition = wordData.description
          var lexicalCategory = wordData.wordtype

          this.setState({
            "word" : this.state.text,
            "definition": definition,
            "lexicalCategory": lexicalCategory
          })
        }
        else{
          this.setState({
            "word": this.state.text,
            "definition": "Not found"
          })
        }
      })
    }

    render(){
      return(
        <SafeAreaProvider>
         <View style = {styles.container}>
           <Header
             centerComponent = {{text:'Dictionary App', style:{color: 'black', fontSize: 22}              }}
             backgroundColor = '#3e52ed'
           />

           <TextInput style= {styles.inputBox}
              onChangeText={(text)=>{
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading..." ,
                    lexicalCategory: '',
                    examples: [],
                    definition: ""
                })
              }}
           />

            <TouchableOpacity onPress={()=>{
                this.setState({isSearchPressed: true})
                this.getWord(this.state.text)
            }} 
            style = {styles.searchButton}>
                <Text style ={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            <View>
              <Text>
                {this.state.isSearchPressed && this.state.word==="Loading..."
                ?this.state.word
                :""
                }
              </Text>
              
            </View>

            <Text style={styles.textStyle}>Word:{""}</Text>
            <Text style = {styles.outputText}>{this.state.word}</Text>
           
            <Text style={styles.textStyle}>Type:{""}</Text>
            <Text style = {styles.outputText}>{this.state.lexicalCategory}</Text>
           
            <Text style={styles.textStyle}>Definition:{""}</Text>
            <Text style = {styles.outputText}>{this.state.definition}</Text>
            </View>

        </SafeAreaProvider>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none'
  },
  searchButton: {
    width: '35%',
    height: 40,
    alignSelf: 'center',
    padding: 3,
    margin: 20,
    backgroundColor: '#8fb3ef'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textStyle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 10
  },
  outputText:{
    fontSize: 18,
    marginLeft: 10
  }
});
