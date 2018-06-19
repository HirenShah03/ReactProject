import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactFileReader from 'react-file-reader';
import ZipcodeComponent from './component/ZipCodeComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { database: ''};
  }

   handleFiles = files => {
  if (window.FileReader) {
    var lines=[];
    // FileReader are supported.
    var reader = new FileReader();
    reader.readAsText(files[0]);
    ///On file load
    reader.onload  = function(event) {
      var csv = event.target.result;
      var allTextLines = csv.split(/\r\n|\n/);
      //  lines = [];
      for (var i=0; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
              var row = [];
              for (var j=0; j<data.length; j++) {
                row.push(data[j]);
              }
              lines.push(row);
      }
    
    }
    this.setState({ database: lines });
  } else {
    alert('FileReader are not supported in this browser.');
}

}

  render() {
    
  
    return (
      <div>
        <p>Upload your file:</p>
      <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
        <button className='btn'>Upload</button>
      </ReactFileReader>
      <ZipcodeComponent database={this.state.database}/>
      </div>
    );
  }
}

export default App;
