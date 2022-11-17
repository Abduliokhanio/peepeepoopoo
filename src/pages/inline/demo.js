import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <div id="googlePayButton"></div>
              <td className="googlePayButton"></td>
            </tr>
            <tr>
              <td>APPLE</td>
              <div id="applepaybutton"></div>
              <td className="applePayButton"></td>
            </tr>
          </tbody>

        </table>
      </div >
    );
  }
}

export default Demo;