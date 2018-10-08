import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';
// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer, { startNewGame } from './redux/reducer';
import saga from './redux/saga';
// components
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import HexagonGrid from '../../components/HexagonGrid/HexagonGrid';
import Button from '../../components/Button/Button';
// utils
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
    };
  }

  toggleSidebar = () =>
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));

  generateNew = () => {
    this.props.startNewGame();
  };

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <div>
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={this.toggleSidebar}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <Content pushed={isSidebarOpen}>
          <CentralPanel>
            <Button onClick={this.generateNew}>Generate New</Button>
            <HexagonGrid />
          </CentralPanel>
        </Content>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'game', reducer });
const withSaga = injectSaga({ key: 'game', saga });
const withConnect = connect(
  state => ({
    field: state.getIn('game', 'field'),
  }),
  {
    startNewGame,
  },
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GamePage);

GamePage.propTypes = {
  startNewGame: T.func.isRequired,
};

const Content = styled.div`
  padding: 10px 20px;
  transition: margin 0.3s ease;

  ${props =>
    props.pushed &&
    `
    margin-left: 200px;
  `} p {
    color: #949ba2;
  }
`;

const CentralPanel = styled.div`
  width: 800px;
  margin: 20px auto;
`;
