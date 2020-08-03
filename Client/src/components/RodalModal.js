import React from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

//import images
import fb from '../assets/facebook.svg'
import google from '../assets/google.svg'

class RodalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.show.bind(this)}>Login</button>

        <Rodal height="100vh" width="100vw" customStyles={{backgroundColor:"#F7C6C5"}} showCloseButton={true} visible={this.state.visible} onClose={this.hide.bind(this)}>
          <div
            style={{
              backgroundColor:"#F7C6C5"
            }}
            className="flex justify-center items-center">
            <div className="max-w-md">
              <div className = "flex flex-col justify-center items-center h-screen">
              <p className="text-4xl text-bold text-center">Sign-Up</p>
              <p className="text-2xl text-bold mb-20">Already a member? Log in</p>
                <button style={{backgroundColor:"#3b5998",width:"40vw", maxWidth:"350px"}}class="flex items-center  text-white font-bold py-2 px-4 rounded">
                  <img style={{width:"60px", height:"60px", padding:"0px 10px",marginRight:"10px"}}src={fb} alt = "" /> Sign Up With Facebook
              </button>
              <button style={{backgroundColor:"#4285f4",width:"40vw", maxWidth:"350px"}} class="flex items-center bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
              <img style={{width:"60px", height:"60px", padding:"0px 10px",marginRight:"10px"}}src={google} alt = "" /> Sign Up With Google
              </button>
                <p style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "1px solid #000",
                  lineHeight: "0.1em",
                  margin:"20px 0 20px"
                }}><span
                    style={{
                      backgroundColor: "#F7C6C5",
                      padding: "10px 10px",
                      
                }}
                  > or </span></p>
                <button style={{width:"40vw", maxWidth:"350px"}} class="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-6 px-4 rounded">
                  Sign Up With Email
              </button>
              </div>
              
            </div>
            
          </div>
                
            </Rodal>
      </div>
    );
  }
}

export default RodalModal;