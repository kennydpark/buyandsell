import React from 'react';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      buyerEmail: '',
      phone: '',
      message: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBuyerEmailChange = this.handleBuyerEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      to: this.props.sellerEmail,
      from: 'buyandsell0821@gmail.com',
      subject: `buyandsell - ${this.state.name} is interested in '${this.props.listingInfo.title}'!`,
      html: `${this.state.name} has reached out to you for your listing, '${this.props.listingInfo.title}':
        <br><strong>${this.state.message}</strong>.
        <br><br><em>Contact information:</em>
        <br>Email: ${this.state.buyerEmail}<br> Phone number: ${this.state.phone}
        <br><br><br>${this.props.listingInfo.title}
        <br> $${this.props.listingInfo.price}
        <br> Condition: ${this.props.listingInfo.condition}
        <br> Description: ${this.props.listingInfo.description}
        <br> ${this.props.listingInfo.location}
        <br><br><br> <em>Do not reply to this email.</em>`
    };
    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        this.close();
      })
      .catch(err => console.error(err));
  }

  close() {
    this.setState({
      name: '',
      buyerEmail: '',
      phone: '',
      message: ''
    });
    this.props.handleCancelButton();
  }

  render() {
    let modal;
    let window;
    if (this.props.formActive === false) {
      modal = 'email-modal-container hidden';
      window = 'navbar-modal-container-full';
    } else {
      modal = 'email-modal-container email-overlay';
      window = 'email-modal-window email-modal-shadow';
    }
    const href = `#listings?listingId=${this.props.listingId}`;
    return (
      <div className={modal}>
        <div className={window}>
          <form onSubmit={this.handleSubmit}>
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
               label="phone" type="tel" maxLength="14" placeholder="Phone Number">
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
                <a href={href} onClick={this.close} className="create-listing-cancel-button">Cancel</a>
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
