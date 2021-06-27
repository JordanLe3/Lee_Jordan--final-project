import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import puzzle_svg from '../images/puzzle.svg'
import search_svg from '../images/search.svg'
import handshake_svg from '../images/handshake.svg'
import cogs_svg from '../images/cogs.svg'
import ResumePDF from '../images/Resume.pdf'
import profilepic from '../images/ProfilePic.jpg'

const Resume = () => {
    return (
        <Container>
            <h1 className="Page-Header">RESUME</h1>
            <Row>
                <Col>
                    <div className='skills'>
                        <img src={puzzle_svg} alt=''/>
                        <p>Problem Solver</p>
                    </div>
                </Col>
                <Col>
                    <div className='skills'>
                        <img src={search_svg} alt=''/>
                        <p>Detailed Oriented</p>
                    </div>
                </Col>
                <Col>
                    <div className='skills'>
                        <img src={handshake_svg} alt=''/>
                        <p>Team Player</p>
                    </div>
                </Col>
                <Col>
                    <div className='skills'>
                        <img src={cogs_svg} alt=''/>
                        <p>Efficient</p>
                    </div>
                </Col>
            </Row>
            <div className='about-container'>
                <div className='about-text'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button href={ResumePDF} target='_blank' color='primary'>Resume</Button>
                </div>
                <img src={profilepic} alt=''/>
            </div>
        </Container>
    )
}

export default Resume