import './style.scss';
import { PageTopInfo } from '../../components/PageTopInfo/pageTopInfo';
import { FaPinterest, FaFacebookF, FaTwitter, FaDribbble, FaBehance } from 'react-icons/fa';
import { useState } from 'react';

export const Contact = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const onChangeHandler = (e,id) => {
        data[id] = e.target.value;
    }

    return (
        <>
        <PageTopInfo pageName='Contact' title='Contact' />
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 contact-info">
                        <h3>Get in touch</h3>
                        <p>Main Str, no 23, New York</p>
                        <p>+546 990221 123</p>
                        <p>hosting@contact.com</p>
                        <div className="contact-social">
                            <a href="#"><FaPinterest/></a>
                            <a href="#"><FaFacebookF/></a>
                            <a href="#"><FaTwitter/></a>
                            <a href="#"><FaDribbble/></a>
                            <a href="#"><FaBehance/></a>
                        </div>
                        <form className="contact-form" onChange={(e) => onChangeHandler(e, e.target.id)}>
                            <input type="text" placeholder="Your name" id='name'/>
                            <input type="text" placeholder="Your e-mail" id='email' />
                            <input type="text" placeholder="Subject" id='subject' />
                            <textarea placeholder="Message" id='message'></textarea>
                            <button className="site-btn">SEND NOW</button>
                        </form>
                    </div>
                    <div className="map col-lg-6  "><iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d48684.12831841774!2d44.5814064!3d40.3033315!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1662551551930!5m2!1sru!2s" style={{border:0}} allowFullScreen ></iframe></div>
                </div>
            </div>
		    
        </section>
        <div className='white-line'></div>
        </>
    )
}
