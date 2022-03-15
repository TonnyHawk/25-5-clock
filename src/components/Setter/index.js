import iconPlus from './plus.svg';
import iconMinus from './minus.svg';

export default function Setter({title, baseVal, inc, dec}){
   return (
   <div class="app__setter setter">
      <p class="setter__title">{title}</p>
      <div class="setter__screen">
         <p class="setter__counter">{baseVal}</p>
      </div>
      <div class="setter__actions">
         <button class="setter__action setter__action_dec btn" onClick={dec}>
            <img src={iconMinus} alt=""/>
         </button>
         <button class="setter__action setter__action_inc btn" onClick={inc}>
            <img src={iconPlus} alt=""/>
         </button>
      </div>
   </div>
   )
}