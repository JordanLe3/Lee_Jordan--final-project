import React, {useState} from 'react'
import { Container, Form, FormGroup, Input, Button, Card, CardBody, CardText } from 'reactstrap'


const AddUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [valid, setValid] = useState(true)

    const userSubmit = async event => {
        
        event.preventDefault()
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setValid(false)
            alert(`Oops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Congrats! Added user ${payload.name}`)
        }
    }
    return (
        <Container>
            {!valid && 
            <Card className="text-white bg-primary my-5 py-4 text-center">
                <CardBody>
                    <CardText className="text-white m-0">Please enter valid information</CardText>
                </CardBody>
            </Card>
            }
            <h1>ADD USER</h1>
            <Form>
                <FormGroup>
                    <Input type='text' placeholder='Name' id='name' className='contact-input' required value={name} onChange={e => setName(e.target.value)}/>
                    <Input type='email' placeholder='Email' id='email' className='contact-input' required value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input type='text' placeholder='Password' id='password' className='contact-input' required value={password} onChange={e => setPassword(e.target.value)}/>
                </FormGroup>
                <Button color='primary' onClick={userSubmit}>Add User</Button>
            </Form>
        </Container>
    )
}

export default AddUser