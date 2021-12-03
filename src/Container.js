import { connect } from 'react-redux';
import * as actionCreators from './actions/action.js';
import Log from './Log';

const mapStateToProps = state => {
  return state;
};

export const Container = connect(mapStateToProps, actionCreators)(Log);