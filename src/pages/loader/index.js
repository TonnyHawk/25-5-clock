import './styles.css';
import logoImg from './logo-img.svg';

export default function LoaderPage(){
   return (
   <div class="loader">
      <div class="loader__logo">
         <div class="logo">
            <div class="logo__img">
               <img src={logoImg} alt=""/>
            </div>
            <div class="logo__text">
               <p class="logo__title">Clock</p>
               <p class="logo__subtitle">25 + 5</p>
            </div>
         </div>
      </div>
   </div>
   )
}