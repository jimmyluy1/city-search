import React, { Component } from 'react';
import './App.css';



function City(props) {
  return (
  <div>
    <ul>
      <li>ZipCode:{props.data}</li>
    </ul>
</div>
  );
}

function CitySearchField(props) {
  return ( 
  <div>
    Type in a city:
    <input type="text" onChange={ (e) => props.cityChanged(e)} value={props.value}/>
    <p>The city entered is: {props.value} </p>
    </div>
    );
}



class App extends Component {
  state = {
      userInputValue: "",
      zipCodes: [],
  };


 
  

  handleCityChange(event){
    this.setState({
      userInputValue: event.target.userInputValue,
    })

    
    fetch("http://ctp-zip-api.herokuapp.com/city/" + event.target.value)
    .then(res => res.json())
    .then(jsonData => {
      this.setState({
        zipCodes: jsonData
      });
    })
    .catch(err => this.setState({cities: [] }))
  
}

  render() {
    console.log(this.state.cities);
    return (
      <div className="App">
        <div className="App-header">
          <h2> City Search</h2>
        </div >
        
        <CitySearchField class="uppercase" cityChanged ={(e)=> this.handleCityChange(e)} value={this.state.onChange}/>
        
        <div>
          { this.state.zipCodes.map((zipCode) => {
            return <City data={zipCode}/>;
           }) }
        </div>
      </div>
    );
  }
}


export default App;
