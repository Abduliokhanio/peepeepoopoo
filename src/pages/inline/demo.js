import React from 'react';
import CollectJSSection from './CollectJSSection';
import { Link } from 'react-router-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      amount: '',
      isSubmitting: false,
      alertMessage: '',
    };
    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finishSubmit = this.finishSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      window.CollectJS.configure({
        'paymentSelector': '#customPayButton',
        'fields': {
          'ccnumber': {
            'selector': '#demoCcnumber',
            'title': 'Card Number',
            'placeholder': '0000 0000 0000 0000'
          },
          'ccexp': {
            'selector': '#demoCcexp',
            'title': 'Card Expiration',
            'placeholder': '00 / 00'
          },
          'cvv': {
            'display': 'show',
            'selector': '#demoCvv',
            'title': 'CVV Code',
            'placeholder': '***'
          },
          'checkaccount': {
            'selector': '#demoCheckaccount',
            'title': 'Account Number',
            'placeholder': '0000000000'
          },
          'checkaba': {
            'selector': '#demoCheckaba',
            'title': 'Routing Number',
            'placeholder': '000000000'
          },
          'checkname': {
            'selector': '#demoCheckname',
            'title': 'Name on Checking Account',
            'placeholder': 'Customer McCustomerface'
          },
          'googlePay': {
            'selector': '.googlePayButton',
            'shippingAddressRequired': true,
            'shippingAddressParameters': {
              'phoneNumberRequired': true,
              'allowedCountryCodes': ['US', 'CA']
            },
            'billingAddressRequired': true,
            'billingAddressParameters': {
              'phoneNumberRequired': true,
              'format': 'MIN'
            },
            'emailRequired': true,
            'buttonType': 'buy',
            'buttonColor': 'white',
            'buttonLocale': 'en'
          },
          'applePay': {
            'selector': '.applePayButton',
            'shippingMethods': [
              {
                'label': 'Free Standard Shipping',
                'amount': '0.00',
                'detail': 'Arrives in 5-7 days',
                'identifier': 'standardShipping'
              },
              {
                'label': 'Express Shipping',
                'amount': '10.00',
                'detail': 'Arrives in 2-3 days',
                'identifier': 'expressShipping'
              }
            ],
            'shippingType': 'delivery',
            'requiredBillingContactFields': [
              'postalAddress',
              'name'
            ],
            'requiredShippingContactFields': [
              'postalAddress',
              'name'
            ],
            'contactFields': [
              'phone',
              'email'
            ],
            'contactFieldsMappedTo': 'shipping',
            'lineItems': [
              {
                'label': 'Foobar',
                'amount': '3.00'
              },
              {
                'label': 'Arbitrary Line Item #2',
                'amount': '1.00'
              }
            ],
            'totalLabel': 'foobar',
            'type': 'buy',
            'style': {
              'button-style': 'white-outline',
              'height': '50px',
              'border-radius': '0'
            }
          }
        },
        'price': '1.00',
        'currency': 'USD',
        'country': 'US',
        'variant': 'inline',
        'callback': function (response) {
          alert(response.token);
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'payment_token';
          input.value = response.token;
          var form = document.getElementsByTagName('form')[0];
          form.appendChild(input);
          form.submit();
        }
      });
    });

  }

  finishSubmit(response) {

  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div>
        <table>
          <tr><div className="applePayButton"></div></tr>
          <tr><div className="googlePayButton"></div></tr>
          <tr><div id="applePayButton"></div></tr>
          <tr><div id="googlePayButton"></div></tr>
          <tr>
            <td>First Name</td>
            <td><input size="30" type="text" name="fname" value="Test" /></td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td><input size="30" type="text" name="lname" value="User" /></td>
          </tr>
          <tr>
            <td>Address</td>
            <td><input size="30" type="text" name="address" value="123 Main Street" /></td>
          </tr>
          <tr>
            <td>City</td>
            <td><input size="30" type="text" name="city" value="Beverley Hills" /></td>
          </tr>
          <tr>
            <td>State</td>
            <td><input size="30" type="text" name="state" value="CA" /></td>
          </tr>
          <tr>
            <td>Zip</td>
            <td><input size="30" type="text" name="zip" value="90210" /></td>
          </tr>
          <tr>
            <td>Country</td>
            <td><input size="30" type="text" name="country" value="US" /></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><input size="30" type="text" name="phone" value="5555555555" /></td>
          </tr>
          <tr>
            <td>CC Number</td>
            <td id="demoCcnumber"></td>
          </tr>
          <tr>
            <td>CC Exp</td>
            <td id="demoCcexp"></td>
          </tr>
          <tr>
            <td>CVV</td>
            <td id="demoCvv"></td>
          </tr>
          <tr>
            <td>Account Number</td>
            <td id="demoCheckaccount"></td>
          </tr>
          <tr>
            <td>Routing Number</td>
            <td id="demoCheckaba"></td>
          </tr>
          <tr>
            <td>Name on Account</td>
            <td id="demoCheckname"></td>
          </tr>
          <tr>
            <td></td>
            <td className="googlePayButton"></td>
          </tr>
          <tr>
            <td></td>
            <td className="applePayButton"></td>
          </tr>

        </table>
      </div>
    );
  }
}

export default Demo;