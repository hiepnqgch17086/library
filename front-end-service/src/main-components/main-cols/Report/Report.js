import React, { Component } from 'react'
// import { Spring } from 'react-spring/renderprops'
import DatePicker from 'react-datepicker'
import TotalOfObjects from './TotalOfObjects'
import ExportToExcel from './ExportToExcel'
import TopObjects from './TopObjects'
import ListOfTicketDetails from './ListOfTicketDetails';

export default class Report extends Component {
  constructor(props){
    super(props)
    let prevMonth = new Date()
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    let today = new Date()
    //inital state
    this.state = {
      startDate: prevMonth,
      endDate: today,
      TotalOfStudents: 0,
      TotalOfTickets: 0,
      TotalOfBooks: 0,
      TotalOfFees: 0,
      TopNStudents: 0,
      TopNBooks: 0,
      TopStudents: [],
      TopBooks: [],
      TicketDetails: []
    }
  }

  onChangeStartDate = async (date) => {

    await this.setState({
      startDate: date
    })
  }

  onChangeEndDate = async (date) => {
    await this.setState({
      endDate: date
    })
  }

  onChangeData = async (key, value, key2, value2) => {
    if(key2){
      await this.setState({
        [key]: value,
        [key2]: value2
      })
    }else{
      await this.setState({
        [key]: value
      })
    }    
  }
  
  SearchDateComponent = () => {
    //onclickoutside: https://github.com/Hacker0x01/react-datepicker/issues/730
    return (
      <div style={{ fontWeight: 'normal', width: '98%'}} id="range-date">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChangeStartDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          timeIntervals={15}
          showTimeSelect
          ref="picker" onClickOutside={this.clickOutside}
        />
        <DatePicker
          selected={this.state.endDate}
          onChange={this.onChangeEndDate}
          dateFormat="dd-MM-YYYY h:mm aa"
          timeIntervals={15}
          showTimeSelect
          closeOnSelect={true}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1 className="page-title">
          <div id="main-title">
            Report
          </div>
          
          {this.SearchDateComponent()}
        </h1>

        

        
        <TotalOfObjects
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-students'}
          title={'Total of students who have borrowed books'}
          identify={'TotalOfStudents'}          
          onChangeData={this.onChangeData}
        />
        <TotalOfObjects
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-books'}
          title={'Total of borrowed books'}
          identify={'TotalOfBooks'}
          onChangeData={this.onChangeData}
        />
        <TotalOfObjects 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-tickets'}
          title={'Total of tickets'}
          identify={'TotalOfTickets'}
          onChangeData={this.onChangeData}
        />
        <TotalOfObjects 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          url={'/report/total-of-fees'}
          title={'Total of fees (VND)'}
          identify={'TotalOfFees'}
          onChangeData={this.onChangeData}
        />


        <TopObjects 
          identify={'TopStudents'}
          identify2={'TopNStudents'}
          url={'/report/top-students'}
          title={'students who have borrowed the most books'}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChangeData={this.onChangeData}
        />
        <TopObjects 
          identify={'TopBooks'}
          identify2={'TopNBooks'}
          url={'/report/top-books'}
          title={'the most borrowed books'}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChangeData={this.onChangeData}
        />


        <center>
          <h2>Fee report<br/>Total of fees (VND): {this.state.TotalOfFees}</h2>
        </center>
        
        <ListOfTicketDetails 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          identify={'TicketDetails'}
          onChangeData={this.onChangeData}
        />

        
        
        <center >
          <button style={{padding: "5px", cursor: "pointer"}} onClick={() => ExportToExcel(this.state)}>
            <i style={{color: "green"}} className="fa fa-file-excel-o fa-2x"/> 
            <span style={{padding: "5px", fontSize: "20px"}}>Export To Excel File</span>
          </button>
        </center>
        <center>
          <a href="#top" style={{color: "#000"}}>
          <i className="fa fa-angle-double-up fa-2x"></i>
          </a>
        </center>
      </div>
      
    )
  }
//   <Spring
//         from={{ opacity: 0 }}
//         to={{ opacity: 1 }}
//       >
//       {
//           props => {
//               return (
//                 <div style={props}>
//                     Demo
//                 </div>
//               )
//           }
//       }
        

//       </Spring>
}


