import React from 'react';
import { Link } from 'react-router-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <table>
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