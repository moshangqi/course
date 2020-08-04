import React,{lazy,Suspense} from 'react';
import {Redirect,Route,Switch,HashRouter} from 'react-router-dom';


const SuspenseComponent = (Component) => (props) => {
    return(
        <Suspense fallback={null}>
            <Component {...props}/>
        </Suspense>
    )
}


const LoginComponent = lazy(()=>import('../login/index'))
const SignComponent = lazy(()=>import('../sign/index'))

const Root= props => {
    return(
        <HashRouter>
            <Switch>
                <Route path='/login' component={SuspenseComponent(LoginComponent)} />
                <Route path='/sign' component={SuspenseComponent(SignComponent)} />
                <Redirect to='/login'/>
            </Switch>
        </HashRouter>
    )
}


export default Root