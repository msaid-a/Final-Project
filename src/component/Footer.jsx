import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            // <div>
            //         <div className="sticky-footer my-5 ">
            //             <div className="copyright text-center my-auto">
            //                 <span>Copyright © Your Website 2019</span>
            //             </div>
            //         </div>
            // </div>
            <div className="footer mt-auto">
              <footer  style={{paddingTop:'25.5%'}} >
                  <div className="container-fluid">

                  <div className="footer-copyright text-center py-3 w-100 bg-dark text-white" style={{marginTop:'16vh'}}>© 2018 Copyright:
                      Your
                      Website 2019
                  </div>
                  </div>
              </footer>

            </div>

        )
    }
}

export default Footer
