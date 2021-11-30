import React from 'react';
import Redirect from '../components/redirect';

export default class SavedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentDidMount() {
    fetch('/api/listings', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Saved Items</h1>
        </div>
        <div className="row">
        </div>
      </div>
    );
  }
}
