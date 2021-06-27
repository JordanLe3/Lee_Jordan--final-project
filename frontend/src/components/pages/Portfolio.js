import React from 'react'
import { Container } from 'reactstrap'
import webimage from '../images/website-image.JPG'


const Portfolio = () => {
    return (
        <div>
            <Container>
                <h1 className="Page-Header">PORTFOLIO</h1>
                <div className='project'>
                    <img src={webimage} className='webimage' alt=''/>
                    <div className='overlay'>
                        <div className='overlay-text'>
                            <div className='image-title'>Nature Gallery</div>
                            <div className='image-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </div>
                    </div>
                </div>
                <div className='project'>
                    <img src={webimage} className='webimage' alt=''/>
                    <div className='overlay'>
                        <div className='overlay-text'>
                            <div className='image-title'>Nature Gallery</div>
                            <div className='image-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Portfolio