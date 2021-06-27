import React from 'react'
import { Jumbotron, Button, Container } from 'reactstrap'
import { NavLink as RouteLink } from 'react-router-dom'

const Homepage = () => {
    return (
        <div>
            <Container className="jumbo-container">
                <Jumbotron>
                    <h1 className="display-3">Hi, you found me!</h1>
                    <h2>My name is Jordan Lee</h2>
                    <h3>I'm a full stack developer based in Toronto, Ontario focused on helping you solve your web/software needs</h3>
                    <h3>Check out my my work</h3>
                    <Button tag={RouteLink} to="/Portfolio" color='primary'>Portfolio</Button>
                </Jumbotron>
            </Container>
            <Container>
                <h2>Log in Credentials</h2>
                <h2>email: Jordan@Lee.com</h2>
                <h2>password: zxcvasdfqwer</h2>
            </Container>
        </div>
    )
}

export default Homepage