import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
       
            <div>
             <footer style={{marginTop:'20%'}}>
    <div className="footer" id="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-9 col-md-6 col-sm-6 col-xs-6 text-left">
                    <h4> Work Manage </h4>
                </div>
                <div className="col-lg-3 text-right col-sm-2 col-xs-3">
                    <h3> Contact </h3>
                    <ul>
                    <a href="https://github.com/msaid-a" target="blank">
                        <li>
                            <h6> Github </h6>
                        </li>
                    </a>
                    <a href="https://www.facebook.com/m.said.arrafi" target="blank">
                        <li>
                            <h6> Facebook </h6>
                        </li>
                    </a>
                    <a href="https://www.instagram.com/msaid_a" target="blank">
                        <li>
                            <h6> Instagram </h6>
                        </li>
                    </a>
                        
                    </ul>
                </div>
                                {/*/.row*/}
            </div>
            {/*/.container*/}
        </div>
        {/*/.footer*/}
        <div className="footer-bottom">
            <div className="container">
                <p className="pull-left copyright"> Copyright © Work Manage 2019. All right reserved. </p>
            </div>
        </div>
    </div>


</footer>

            </div>

        )
    }
}

export default Footer
