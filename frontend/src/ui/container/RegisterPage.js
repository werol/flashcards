import RegisterForm from '../component/forms/RegisterForm';
import {connect} from 'react-redux';
import {register} from '../../reducers/register';

export default connect(
  state => ({errorMessage: state.register.errorMessage}),
  {register}
)(RegisterForm);
