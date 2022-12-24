import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_FOR_LS } from '../../assets';
import Style from './Style.module.scss';

export const Footer = ({setFiltredProducts}) => {

const navigate = useNavigate();
useEffect(()=> stocksProductsFunc,[])

async function stocksProductsFunc(){
    const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: JSON.parse(localStorage.getItem(TOKEN_FOR_LS))
        }
})
let result = await response.json()
    console.log(result)
    if(response.status === 400 || response.status === 401 ){
        console.log(`error: ${result.message}`)
    }else if(response.status === 200){
        setFiltredProducts(result.products.filter(prdct => prdct.discount > 0))
        return result
    }
}
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
                <div href='#'
                    onClick={() => navigate('/stocks')}
                >Акции</div>
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
                <p >8 (999) 999 99 99</p>
                <p >dogfood@gmail.com</p>
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