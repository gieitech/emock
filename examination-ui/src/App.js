import React,{Component} from 'react';
import Fullscreen from "react-full-screen";
import axios from 'axios';
import './App.css';

// importing components
import Examspace from './components/Examspace/Examspace';
import ReportCard from './components/ReportCard/ReportCard';

class App extends Component {
  state = {
    Student : false,
    deviceError:false,
    loading:false,
    devAjaxUrl : 'http://127.0.0.1:8000',
    prodAjaxUrl : `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
    agencyName : 'Galaxy Guide Center',
    fullScreenActive : false,
    Quiz:{},
    Questions:[],
    Report : {
          "id": 45,
          "quiz": {
              "id": 2,
              "no_of_questions": 2,
              "full_marks": 4,
              "name": "Japanese Language 101",
              "syllabus": "Dummie stuff",
              "allotted_time_in_minutes": 10,
              "negative_marking": true,
              "cover_image_url": "https://images.unsplash.com/photo-1492998680170-81f8863d8d2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225",
              "isActive": true,
              "pub_date": "2019-05-31"
          },
          "answered": 2,
          "correct": 0,
          "gained_marks": 0,
          "submission_date": "2019-08-05",
          "submission_time": "12:33:34.010086",
          "student": 14
      }
  }
  style ={
    quiz_image:{
        width:'100%',
    },
    quiz_info:{
        position:'absolute',
        top:'50%',
        left:'20%',
        zIndex:2,
        width:'60%',
        height:'70%',
        backgroundColor:'rgba(251, 255, 185, 0.6)',
        padding:'2em',
        borderRadius:'2em',
        
    },
    thumbnail_quiz:{
        height:'10em',
        width:'10em',
        objectFit:'cover',
        borderRadius:'50%',
        margin:'1em',
    },
    quiz_name:{
        color:'#FBFFB9 !important',
    }
  }
  componentWillMount = ()=>{ 
    const {devAjaxUrl} = this.state;
    console.log(this.getQuizId());
    Promise.all([
      axios.get(`${devAjaxUrl}/quiz/${this.getQuizId()}/details/`),
      axios.get(`${devAjaxUrl}/quiz/${this.getQuizId()}/questions/`)
    ])
    .then(axios.spread((details , questions)=>{
      
        this.setState({
          Quiz:details.data,
          Questions:questions.data,
        })
    
    }))
    .catch((e,res)=>{
      console.log(e);
      alert(res.message)
    })
    this.setState({Student:this.getCookie('student')})
  }
  setReport = (report)=>{
    this.setState({Report:report})
  }
  getCookie = (cname)=> {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  componentDidMount = ()=>{
    window.addEventListener('keydown', this.disableKeyBoard , false);
  }
  componentWillUnmount = ()=>{
    window.removeEventListener('keydown',this.disableKeyBoard , false);
  }
  getQuizId = ()=>{
    return parseInt(window.location.pathname.substr(6).slice(0 , -13)) || 1;
  }
  goFullScreen = ()=>{
    this.setState({
      fullScreenActive : true,
    })
  }

  exitFullScreen = ()=>{
    this.setState({
      fullScreenActive : false,
    })
  }
  beginTest = ()=>{
    this.goFullScreen();
  }
  disableKeyBoard = (e)=>{
    if(e.key === "F11") e.preventDefault();
    if(e.key === "ESC") e.preventDefault();
    return false;
  }
  fetchStudent = ()=>{
    return new Promise((resolve,reject)=>{

    })
  }
  render = ()=>{
    const {
      agencyName,
      fullScreenActive,
      deviceError,
      loading,
      devAjaxUrl,
      prodAjaxUrl,
      Quiz,
      Questions,
      Student,
      Report,
    } = this.state;
    const {
        quiz_image,
        quiz_info,
        thumbnail_quiz,
        quiz_name,

    } = this.style;
    if(Report){
      return(
        <ReportCard Report={Report} prodAjaxUrl={prodAjaxUrl}/>
      )
    }else{
      return (
        <Fullscreen
          enabled={fullScreenActive}
          onChange={fullScreenActive => this.setState({fullScreenActive})}
        > 
        <div className='App' onKeyUp={this.disableKeyBoard}>
          
          {
            fullScreenActive 
            ? <Examspace 
                Quiz={Quiz}
                Questions={Questions}
                agencyName={agencyName}
                exitFullScreen={this.exitFullScreen}
                devAjaxUrl={devAjaxUrl}
                Student={Student}
                setReport={this.setReport}
              />
            : <div >
                <img src={Quiz.cover_image_url} alt={Quiz.name} style={quiz_image}/>
                <div style={quiz_info}>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <img src={Quiz.cover_image_url} style={thumbnail_quiz} alt='{Quiz.name}'/>
                        </div>
                        <div className='col-lg-8'>
                            <h2 style={quiz_name}><i className="fa fa-list-alt" aria-hidden="true"></i> {Quiz.name}</h2>
                            <hr/>
                            <h4><i className="fa fa-file-text" aria-hidden="true"></i> {Quiz.syllabus}</h4>
                            <h5><i className="fa fa-check-square-o" aria-hidden="true"></i> {Quiz.full_marks} Marks</h5>
                            <h5><i class="fa fa-database" aria-hidden="true"></i> {Quiz.no_of_questions} Questions</h5>
                            {Quiz.negative_marking && <h5><i className="fa fa-minus-circle" aria-hidden="true"></i>  Negative Marking</h5>}
                            <br/>
                            <button type="button" value="Begin" className="btn btn-primary py-3 px-5" onClick={this.beginTest}><i className="fa fa-terminal" aria-hidden="true"></i> Begin</button>
                        </div>

                    </div>
                    
                    
                </div>
                
            </div>
        }
        </div>
        </Fullscreen>
    
     
    );

    }
    
  }
  
}

export default App;
