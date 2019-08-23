import React,{Component} from 'react';
import {Row,Col,Table} from 'react-bootstrap';
import './ReportCard.css';

class ReportCard extends Component{
    style={
        report_data:{
            position:'absolute',
            top:'35%',
            left:'20%',
            zIndex:2,
            width:'60%',
            height:'70%',
            backgroundColor:'rgba(204, 41, 54, 0.66)',
            padding:'2em',
            borderRadius:'2em',
            
        },
        quiz_image: {
            height:'6em',
            width : '6em',
            objectFit:'cover',
            borderRadius:'50%',
            display:'block',
            margin:'auto',
        }
    }
    render=()=>{
        const {report_data,quiz_image} = this.style;
        const {Report,prodAjaxUrl} = this.props;
        const {quiz} = Report;
        return(
            <div className='report-card'>
                <img src='https://ik.imagekit.io/zcpzsm6qt/galaxyguide/IMG-20190726-WA0004_C81SsuVBmL.jpg' alt='galaxyguide' className='hero-image'/>
                <div className='report-data' style={report_data}>
                    <Row>
                        <Col lg={12}>
                            <img src={quiz.cover_image_url} alt={quiz.name}  style={quiz_image} />
                            
                            <h2 className='text-center' style={{color:'#fff'}}><i className="fa fa-database" aria-hidden="true"></i> {quiz.name}</h2>
                            
                            <h4 className='text-center' style={{color:'#fff'}}><i className="fa fa-calendar-check-o" aria-hidden="true"></i> {Report.submission_date}</h4>
                            <h4 className='text-center' style={{color:'#fff'}}><i className="fa fa-clock-o" aria-hidden="true"></i> {Report.submission_time}</h4>
                            <Table striped bordered hover className='text-center' style={{color:'#fff'}}>
                                <thead>
                                    <tr>
                                        
                                        <th>Answered</th>
                                        <th>Correct</th>
                                        <th>Gained Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        
                                        <td>{Report.answered}</td>
                                        <td>{Report.correct}</td>
                                        <td>{Report.gained_marks}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <a href={`${prodAjaxUrl}/accounts/profile/`} className='btn btn-warning' style={{margin:'auto',display:'block',width:'10em'}}><i className="fa fa-user-circle-o" aria-hidden="true"></i> Profile</a>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ReportCard;