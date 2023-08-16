import './Login.css';
import { GoogleLogin } from 'react-google-login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



interface LoginInterface {
    handleLogin: React.MouseEventHandler<HTMLButtonElement>
    handleEmailChange: React.ChangeEventHandler<HTMLInputElement> 

    //(event: React.MouseEvent<HTMLInputElement, MouseEvent>, index: number) => void

}
 
 
function Login(prop: LoginInterface ) { 


    return (

    

        <Container>
    <>
        <GoogleLogin
            clientId="778518108708-8davam7kf6okm6c8ggdmu9fcro21qag9.apps.googleusercontent.com"  // Use the client ID from the Google Developer Console
            buttonText="Login with Google"
            //onSuccess={}
            //onFailure={}
            cookiePolicy={'single_host_origin'}
        />
    </>

            
            <Row>
                <Col md="3">
                    <h3>Log In</h3>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={prop.handleEmailChange}
                    /> 
                  
                </Col> 
            </Row> 
            <Row>
                <Col md="3">
                    {
                        <button className="btn btn-primary" onClick={prop.handleLogin} >
                            Login
                        </button>
                    }
                </Col> 
            </Row>


        </Container>
    );
}


export default Login;