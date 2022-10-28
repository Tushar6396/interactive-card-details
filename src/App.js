import './App.css';
import image1 from './Images/bg-main-desktop.png'
import image2 from './Images/bg-card-front.png'
import image3 from './Images/bg-card-back.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react';


function App() {

  const schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().min(16).max(16).required(),
    month: yup.number().integer().positive().min(1).max(12).required(),
    year: yup.number().integer().positive().min(1).max(99).required(),
    cvc: yup.number().integer().positive().min(100).max(999).required(),
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  })


  const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');

  const[cardName, setCardName] = useState("Jane Appleseed");

  const[month,setMonth] = useState("00");
  
  const[year,setYear] = useState('00');
  const[cvc, setCvc] = useState('000');

  const[message, setMessage] = useState('')
  const[isClicked, setIsClicked] = useState(false)

  const onSubmit = () => {
    setMessage(
    <div className='message'>
    <svg className='icon' width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>
    <p className='thank-you'>THANK YOU</p>
    <p className='done-msg'>We've added your details</p>
    </div>
    )
    setIsClicked(true)
  }

  return (
    <>
      
      <div className="container">
        <img src={image1} alt="" />
        
        <div className="container-card">
            <img src={image2} alt="" className='image2'/>
            <p className="number-card">{cardNumber}</p>
            <p className="card-name">{cardName}</p>
            <p className="date-end">{month}/{year}</p>
  
        </div>
            <div className="backImage">
            <img src={image3} alt="" className='backImage'/>
            <p className="cvc-card">{cvc}</p>
        </div>
        
      </div>

    
      <form className="form-container">
        
        <div className="input-item">
          <p className='input-title'>CARDHOLDER NAME</p>          
          <input type="text" placeholder="e.g. Jane Appleseed" {...register("name")} 
            onChange={(event) => setCardName(event.target.value)}
          />
          <p className="error-message">{errors.name?.message}</p>
        </div>  
        
        <div className="input-item">
          <p className='input-title'>CARD NUMBER</p>
          <input type="number" placeholder='e.g. 1234 5678 9123 0000' {...register("number")} 
            onChange={(event) => setCardNumber(event.target.value)}
          />
          <p className='error-message'>{errors.number?.message}</p>
        </div>
        
        <div className="input-item">
          <div className="flex">
            <span className="input-title-date">EXP. DATE (MM/YY)</span>
            <span className="input-title-cvc">CVC</span>
          </div>
          <input className='input-card-date mm' type="number" placeholder='MM' {...register("month")} 
            onChange={(event) => setMonth(event.target.value)} />
          <input className='input-card-date yy' type="number" placeholder='YY' {...register("year")} 
            onChange={(event) => setYear(event.target.value)} />
          <input className='input-cvc-number' type="number" placeholder='e.g. 123' {...register("cvc")} onChange={(event) => setCvc(event.target.value)} />
          <p className="error-message">{errors.month?.message}</p>
          <p className="error-message">{errors.year?.message}</p>
          <p className="error-message">{errors.cvc?.message}</p>
        </div>  
        
        
        <div className="submit-btn">
        <button type="submit" className='Submit' onClick={handleSubmit(onSubmit)}>Confirm</button>
        </div>
    
      <h1>{message}</h1>
      </form>
    
    </>
  );
}

export default App;
