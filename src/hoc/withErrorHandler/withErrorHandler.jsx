import React,{Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";

const withErrorHandler = (Wrappedcomponent, axios) =>{
return class extends Component {
    state ={
        error:null,
    }
    componentWillMount(){
        this.reqInterceptor = axios.interceptors.request.use(req =>{
           this.setState({error:null})//clearing error  
           return req;
        })
        this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
           this.setState({error:error})
        })
    }
    componentWillUnmount(){
        // console.log('willU UNMOUNT',this.reqInterceptor,this.resInterceptor)
        axios.interceptors.request.eject(this.reqInterceptor)
        axios.interceptors.response.eject(this.resInterceptor)
    }
    errorConfirmedHandler = () =>{
        this.setState({error:null})
    }

        render (){
            return (
         <Auxiliary>
            <Modal show={this.state.error}
              modalClosed={this.errorConfirmedHandler} >
                {this.state.error ? this.state.error.message :null}  
                Something didn't work
            </Modal>
            <Wrappedcomponent {...this.props} />
          </Auxiliary>   
            )   
        }
    }
}

export default withErrorHandler;