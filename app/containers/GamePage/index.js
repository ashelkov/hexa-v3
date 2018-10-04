import React from 'react';
import styled from 'styled-components';
// components
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

/* eslint-disable react/prefer-stateless-function */
export default class GamePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: true,
    };
  }

  toggleSidebar = () =>
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));

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
          <h2>This is the GamePage!</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
            sequi quis sapiente esse necessitatibus dignissimos natus suscipit
            hic quos, illo ipsam accusamus veniam debitis repellat, laudantium,
            fugit repudiandae nam! Doloribus!
          </p>
        </Content>
      </div>
    );
  }
}

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
