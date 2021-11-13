import React from 'react';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      name: '',
      buyerEmail: '',
      phone: '',
      message: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBuyerEmailChange = this.handleBuyerEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     active: this.props.active
  //   });
  // }

  handleClick() {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleBuyerEmailChange(event) {
    this.setState({
      buyerEmail: event.target.value
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    let modal;
    let window;
    // let overlay;
    if (this.state.active === false) {
      modal = 'email-modal-container';
      window = 'navbar-modal-container-full';
      // overlay = '';
    } else {
      modal = 'email-modal-container email-overlay';
      window = 'email-modal-window';
      // overlay = 'email-overlay';
    }
    const href = `#listings?listingId=${this.props.listingId}`;
    return (
      <div className={modal}>
        <div className={window}>
          <form>
            <div className="row row-form row-input-name">
              <input onChange={this.handleNameChange} className="new-listing-form-style"
                required label="name" type="text" placeholder="Name">
              </input>
            </div>
            <div className="row row-form">
              <input onChange={this.handleBuyerEmailChange} className="new-listing-form-style"
                type="email" required placeholder="Email" />
            </div>
            <div className="row row-form row-input-title">
              <input onChange={this.handlePhoneChange} className="new-listing-form-style"
                required label="phone" type="tel" maxLength="14" placeholder="Phone Number">
              </input>
            </div>
            <div className="row row-form">
              <textarea value={this.state.description} onChange={this.handleMessageChange}
                className="new-listing-form-style" required label="message" type="text" rows="7"
                placeholder="Message">
              </textarea>
            </div>
            <div className="row">
              <div className="col-buttons cancel-previous">
                <a href={href} className="create-listing-cancel-button">Cancel</a>
              </div>
              <div className="col-buttons next-submit">
                <button type="submit" className="next-submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmailForm;
