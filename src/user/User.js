import React, { Component } from 'react';
import './user_profile.css'

class User extends Component {
  render() {
    return (
        <div class="white_bar">
        <header>
            <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light header_bar shadow-sm">
                <div class="container-fluid">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="active"><a class="navbar-brand" href="#"><img class="logo" src="./assets/logo/logo%20v1.png"></img></a></li>
                    </ul>
                    <ul class="nav navbar-nav">
                        <li><a class="header_text" href="#">حساب کاربری</a></li>
                        <li><a class="header_text" href="#">خروج</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <main class="white_bar">
            <div class="container-fluid blue blue_bar">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <div>
                            <img class="img-thumbnail user_image_profile" src="./assets/3.bmp"></img>
                            <div class="border_on_profile_pic"></div>
                            <div class="border_on_profile_pic_2"></div>
                        </div>
                    </div>
                    <div class="col-9">
                        <ul class="name_text font">
                            <li class="full_name">
                                محمدرضاکیانی
                            </li>
                            <li class="nickname">
                                اعلی حضرت
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <ul class="description font">
                            <li class="description_text col-md-12">
                                یادگیری این نوع تایپ به عنوان عامل تایپیست شدن شما، مستلزم گذراندن دو مرحله است که مرحله اول بسیار ساده و گذراست
                                ولی مرحله دوم نیاز به گذراندن زمان، حوصله و پیوستگی تمارین دارد. مرحله اول، «یادگیری قواعد» است پس از گذراندن این مرحله شما می‌توانید بدون نگاه کردن به صفحه‌کلید با سرعتی بیش از
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row font float-left ml-4">
                    <div class="col-auto">
                        <div class="bg-white shadow-sm px-1 font rounded-top rounded-bottom">
                            <span class="badge blue ml-1 my-0 font py-1 text-info">2</span> TypeScript
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="bg-white shadow-sm  px-1 font rounded-top rounded-bottom">
                            <span class="badge blue ml-1 my-0 font py-1 text-info">16</span> JavaScript
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="bg-white shadow-sm  px-1 font rounded-top rounded-bottom">
                            <span class="badge badge-success ml-1 my-0 font py-1">3</span> CSS
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="bg-white shadow-sm  px-1 font rounded-top rounded-bottom">
                            <span class="badge badge-success ml-1 my-0 font py-1">+</span> HTML
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer-copyright text-center py-3 footer_text bg-dark footer_bar text-muted">
        © تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد
        </footer>
        </div>
    );
  }
}

export default User;
