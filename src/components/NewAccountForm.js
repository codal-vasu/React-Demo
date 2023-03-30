import React from 'react'
import { Button, Form, Grid, Header, Image,Message,Segment} from 'semantic-ui-react'
import Logo from '../assets/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NewAccountForm = () => {
    const [inputs, setInputs] = useState({});
    let navigate = useNavigate();
    const[showMessage,setShowMessage]=useState(false);
    const handleChange = (event) => {
      const userEmail = event.target.name;
      const FisrtName = event.target.name;
      const LastName = event.target.name;
      const password = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [userEmail]: value,[password]:value,[FisrtName]:value,[LastName]:value}));
    }
  const submitHandler=()=>{
    setShowMessage(true);
    setTimeout(() => { 
      navigate('/');    
      }, 1500)
    
    
  }
  
    return(
    <>
        {showMessage? <Message
            success
            header='Your Account is Created  Successfully'
            
          />:null}
    <Grid textAlign='center' style={{ height: '100vh'}} verticalAlign='middle'>
      
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src={Logo} /> Create New Account 
      </Header>
    
  
      <Form onSubmit={()=>{submitHandler()}}>
      <Segment stacked>
      <Form.Input fluid icon='user' label='Enter First Name '   iconPosition='left'name="FirstName" placeholder='Fisrt Name' value={inputs.FirstName || ""} 
          onChange={(e)=>{handleChange(e)}}/>
          <Form.Input fluid icon='user' label='Enter Last Name'  iconPosition='left'name="LastName" placeholder='Last Name' value={inputs.LastName || ""} 
          onChange={(e)=>{handleChange(e)}}/>
            
          <Form.Input fluid icon='mail' label='Enter UserEmail'  iconPosition='left'name="userEmail" placeholder='demo@codal.com' value={inputs.userEmail || ""} 
          onChange={(e)=>{handleChange(e)}}/>
        
          <Form.Input
            fluid
            label='Enter Password' 
            icon='lock'
            iconPosition='left'
            placeholder='codal123'
            type='password'
            name="password"
            value={inputs.password || ""} 
            onChange={(e)=>{handleChange(e)}}
          />
  
          <Button color='teal' fluid size='large' >
            Login
          </Button>
          </Segment>
      </Form>
     
    </Grid.Column>
  </Grid>
  </>);
}

export default NewAccountForm