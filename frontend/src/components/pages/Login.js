import React, {useState} from 'react'
import { Container, Form, FormGroup, Input, Button, Card, CardBody, CardText } from 'reactstrap'
import { useHistory, useLocation } from 'react-router-dom'


const Login = () => {

    let history = useHistory();
    let location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState(true)

    const loginSubmit = async event => {
        
        event.preventDefault()
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAuth(false)
        } else {
            sessionStorage.setItem('token', payload.token)

            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);

            alert ('You are logged in')
        }
    }
    
    return (
        <Container>
            {!auth && 
            <Card className="text-white bg-primary my-5 py-4 text-center">
                <CardBody>
                    <CardText className="text-white m-0">Invalid credentials, please try again</CardText>
                </CardBody>
            </Card>
            }
            <h1>LOGIN</h1>
            <Form>
                <FormGroup>
                    <Input type='email' placeholder='Email' id='email' className='contact-input' required value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input type='password' placeholder='Password' id='password' className='contact-input' required value={password} onChange={e => setPassword(e.target.value)}/>
                </FormGroup>
                <Button color='primary' onClick={loginSubmit}>Login</Button>
            </Form>
        </Container>
    )
}

export default Login