import Style from './Style.module.scss';

export const Footer = () => {



    return(
        <footer className={Style.footer}>
            <div className={Style.footerDivFirstColumn}>
            <i className={`fa-solid fa-paw ${Style.footerLogo}`}></i>
            <br/>

            <span>
            <i className="fa-regular fa-copyright"></i>    
            {' '}Интернет-магазин DogFood
            </span> 
            </div>
            <div className={Style.secondColumn}>
                <a>Каталог</a>
                <a>Акции</a>
                <a>Новости</a>
                <a>Отзывы</a>
            </div>
            <div className={Style.thirdColumn}>
                <a>Оплата и доставка</a>
                <a>Часто спрашивают</a>
                <a>Обратная связь</a>
                <a>Контакты</a>
            </div>
            <div className={Style.fourthColumn} >
                <h3>Мы на связи</h3>
                <p type="phone">8 (999) 999 99 99</p>
                <p type="email">dogfood@gmail.com</p>
                <div className={Style.footer_social}>
                    <span className={Style.footer_social_margin}><i className="fa-brands fa-telegram"></i></span>
                    <span className={Style.footer_social_margin}><i className="fa-brands fa-whatsapp"></i></span>
                    <span className={Style.footer_social_margin}><i className="fa-brands fa-viber"></i></span>
                    <span className={Style.footer_social_margin}><i className="fa-brands fa-instagram"></i></span>
                    <span className={Style.vk}><i className="fa-brands fa-vk"></i></span>
                </div>
            </div>
        </footer>
    )
}