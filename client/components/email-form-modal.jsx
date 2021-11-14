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
    this.handleSubmitted = this.handleSubmitted.bind(this);
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

  handleSubmitted(event) {
    event.preventDefault();
    const data = {
      to: this.props.sellerEmail,
      from: 'buyandsell0821@gmail.com',
      subject: `buyandsell - ${this.state.name} is interested in '${this.props.listingInfo.title}'!`,
      text: `${this.state.name} has reached out to you for your listing, '${this.props.listingInfo.title}': ${this.state.message}. Contact information: Email: ${this.state.buyerEmail}. Phone number: ${this.state.phone} ${this.props.listingInfo.title} ${this.props.listingInfo.price} Condition: ${this.props.listingInfo.condition} Description: ${this.props.listingInfo.description} ${this.props.listingInfo.location}`,
      html: `${this.state.name} has reached out to you for your listing, '${this.props.listingInfo.title}': <br><strong>${this.state.message}</strong>. <br><br><em>Contact information:</em> <br>Email: ${this.state.buyerEmail}<br> Phone number: ${this.state.phone} <br><br><br>${this.props.listingInfo.title} <br> $${this.props.listingInfo.price} <br> Condition: ${this.props.listingInfo.condition} <br> Description: ${this.props.listingInfo.description} <br> ${this.props.listingInfo.location}`
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
        this.setState({
          name: '',
          buyerEmail: '',
          phone: '',
          message: ''
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let modal;
    let window;
    // let overlay;
    if (this.props.formActive === false) {
      modal = 'email-modal-container hidden';
      window = 'navbar-modal-container-full';
      // overlay = '';
    } else {
      modal = 'email-modal-container email-overlay';
      window = 'email-modal-window email-modal-shadow';
      // overlay = 'email-overlay';
    }
    const href = `#listings?listingId=${this.props.listingId}`;
    return (
      <div className={modal}>
        <div className={window}>
          <form onSubmit={this.handleSubmitted}>
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
                <a href={href} onClick={this.props.handleCancelButton} className="create-listing-cancel-button">Cancel</a>
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
