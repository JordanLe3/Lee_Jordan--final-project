import React, {useState} from 'react'
import { Container, Form, FormGroup, Input, Button } from 'reactstrap'


const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [content, setContent] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/contact_form/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, phoneNumber, content})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            alert(`Oops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Congrats! Submission submitted`)
        }
    }

    return (
        <Container>
            <h1>CONTACT</h1>
            <Form>
                <FormGroup>
                    <Input type='text' placeholder='Name' id='name' className='contact-input' required value={name} onChange={e => setName(e.target.value)}/>
                    <Input type='email' placeholder='Email' id='email' className='contact-input' required value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input type='text' placeholder='Phone' id='phonenumber' className='contact-input' required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    <Input type='textarea' placeholder='Message' id='content' className='contact-textarea' required value={content} onChange={e => setContent(e.target.value)}/>
                </FormGroup>
                <Button color='primary' onClick={formSubmit}>Submit</Button>
            </Form>
        </Container>
    )
}

export default Contact