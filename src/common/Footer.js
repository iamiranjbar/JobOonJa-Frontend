import React, { Component } from 'react';
class Footer extends Component {

	constructor(props){
        super(props);
    }

    render() {
    	return (
            <footer class="footer-copyright text-center py-3 footer_text bg-dark footer_bar text-muted footer-pos">
                © تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد
            </footer>
        );
    }
}

export default Footer;