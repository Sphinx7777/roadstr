
import Layout from 'src/Components/Layout';
import AuthForm from '../login/loginForm'
import { useDispatch, connect } from 'react-redux'
import {setRegistrationAC} from '../../Components/others/utilities/action'

const Login = (props: any) => {
    const { setRegistrationAC } = props
    const dispatch = useDispatch()
    const handleSubmit = (data: any) => {
        dispatch(setRegistrationAC(data))
    }
	return (
		<Layout>
		<div className=''>
            <AuthForm onSubmit={handleSubmit}/>
		</div>
		</Layout>
	)
}

const mapStateToProps = (state: any) => {
    return {

    }
}

export default (connect(mapStateToProps, {setRegistrationAC})(Login));