import ListComponent from '../component/Fleshcards';
import {connect} from 'react-redux';
import {fetchFleshcards} from '../../reducers/fleshcards';

export default connect(
  state => ({items: state.fleshcards.items}),
  {fetchFleshcards}
)(ListComponent);
