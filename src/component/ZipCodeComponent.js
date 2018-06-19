import React, { Component } from 'react';

class ZipcodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { zip1: '' };
    this.state = { zip2: '' };
    this.state = { distance: 0 };

    this.handleZip1 = this.handleZip1.bind(this);
    this.handleZip2 = this.handleZip2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleZip1(event) {
    this.setState({ zip1: event.target.value });
  }
  handleZip2(event) {
    this.setState({ zip2: event.target.value });
  }

  handleSubmit(event) {
    const zip1 = this.state.zip1;
    const zip2 = this.state.zip2;
    const data = this.props.database;
    if(data!=""){
    console.log(data);
    event.preventDefault();
    const latLong1=this.searchLatLong(data, zip1);
    const latLong2=this.searchLatLong(data, zip2);
    console.log(data[0]);
    let check = data[0].toString().split(',');
    let indexLat=this.getIndex(check,"LAT");
    let indexLong=this.getIndex(check,"LONG"); //getIndex(data,key)
    console.log(indexLat);
    console.log(indexLong);
    
    let lat1=+this.getCordinates(latLong1,indexLat);
    let lat2=+this.getCordinates(latLong2,indexLat);
    let long1=+this.getCordinates(latLong1,indexLong);
    let long2=+this.getCordinates(latLong2,indexLong); 
    this.calculateDistance(lat1,long1,lat2,long2);
  }else{
    alert("upload a file first");
  }
  }

  
  getIndex(data,key){
    console.log(data.length)
        for(var i=0;i<data.length;i++){
          console.log(this.getCordinates(data,i).toUpperCase().replace(/['"]+/g, '') + " or"+ key);
          if(this.getCordinates(data,i).toUpperCase().replace(/['"]+/g, '') === key){
        return i;
      }
     
    }
    return -1;
  }
  ///haversine formulae imlemented to find distance
  calculateDistance(lat1,long1,lat2,long2){
    var R = 6371; // metres
    var p1 = this.toRadians(lat1);
    var p2 = this.toRadians(lat2);
    var Δp = this.toRadians(lat2-lat1);
    var Δl = this.toRadians(long2-long1);
    
    var a = Math.sin(Δp/2) * Math.sin(Δp/2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(Δl/2) * Math.sin(Δl/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;
    console.log(d);
    this.setState({distance:d});
  }
  getCordinates(data,index){
    return data.toString().split(',')[index];
  }
  toRadians(degrees)
  {
    var pi = Math.PI;
    return degrees * (pi/180);
  }
   Comparator(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }
   
  ///binary search for particular zipcode
  searchLatLong(data, zip) {
    var minIndex = 0;
    var maxIndex = data.length - 1;
    var currentIndex;
    var currentElement=[];

    let res=Array.from(data);
    res.sort(this.Comparator);
    console.log(res);
    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = res[currentIndex];

      if (+currentElement.toString().split(',')[0] < +zip) {
        minIndex = currentIndex + 1;
      }
      else if (+currentElement.toString().split(',')[0] > +zip) {
        maxIndex = currentIndex - 1;
      }
      else {
        return currentElement;
      }
    }

    return -1;

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Zipcode 1:
          <input type="text" value={this.state.value} onChange={this.handleZip1} required />{'\n'}
          Zipcode 2:
          <input type="text" value={this.state.value} onChange={this.handleZip2} required />
        </label>
        <input type="submit" value="Calculate Distance" />
        <p>Distance is: {this.state.distance} km</p>
      </form>
    );
  }
}
export default ZipcodeComponent;