import { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return this.state.component ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
