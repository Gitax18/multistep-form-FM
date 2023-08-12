// Design form 4

localStorage.clear()

// form header 
const form_title = document.getElementById('form-title');
const form_subtitle = document.getElementById('form-subtitle');
const sidebar_counter = [...document.getElementsByClassName('active-form-counter')];

// form container 
const form_container = document.getElementsByClassName('form-container')[0];

// form dynamic container 
const dynamic_container = document.getElementById('dynamic-container');

// forms
const forms = [...document.getElementsByClassName('form')];

// ************************** FORM 1 COMPONENTS
// const form-personal-info input and error(empty fields)
const user_name = document.getElementById('name');
const user_email = document.getElementById('email');
const user_mob = document.getElementById('mobile-number');

const error_no_name = document.getElementById('error-name'); 
const error_no_email = document.getElementById('error-email'); 
const error_no_mobile = document.getElementById('error-phone'); 

// ************************** FORM 2 COMPONENTS
const cards = [...document.getElementsByClassName('card')];
const sub_price = [...document.getElementsByClassName('sub-type')]; // common in form 2 and 3
const yearly_offer = [...document.getElementsByClassName('yearly-offer')];
const subs_type = document.getElementsByClassName('subs-type'); 

// ************************** FORM 3 COMPONENTS
const addons = [...document.getElementsByClassName('addon')];

// ************************** FORM 4 COMPONENTS
const summary_container = document.getElementsByClassName('plan-summary')[0]; // this will used to add service row -> use insertAdjacentHtml

const choosen_card = document.getElementById('choosen-card');
const choosen_period = document.getElementById('choosen-period');
const change_card_btn = document.getElementById('change-card');
const choosen_card_price = document.getElementById('choosen-card-price');

const total_amount = document.getElementById('total-amount');
const choosen_period_2 = document.getElementById('choosen-period-format-2');
const period = document.getElementById('period');


// Final section
const confirm_screen = document.getElementById('confirm-purchase')

// next and back buttons
const btn_next = document.getElementById('btn-next');
const btn_back = document.getElementById('btn-back');

// active form counter
localStorage.setItem('current_form', 0);




// continuoisly checking for form number bcz on form first go back button must be disable.
setInterval(()=>{
    current_form = localStorage.getItem('current_form');
    if( current_form !== '0') btn_back.classList.remove('disable') ;
},250);

// functions
// function to load fourth form
function loadFourthForm(){
    console.log('fourth form loaded');
    summary_container.innerHTML = ''

    const sub_type =  localStorage.getItem('subs_type');

    summary_container.innerHTML = `
    <div class="card-choice">
        <div>
            <h3 class="choosen-card"> <span id="choosen-card">${localStorage.getItem('card_type')}</span> (<span id="choosen-period">${sub_type == 'mo' ? 'Monthly' : 'Yearly'}</span>) </h3>
            <small class="change-card" id="change-card">Change</small>
        </div>
        <p class="choosen-card-price"> ₹<span id="choosen-card-price">${localStorage.getItem('card_type-price')}</span> /${sub_type}</p>
    </div>
    `

    form_title.textContent = 'finishing up';
    form_subtitle.textContent = 'double-check everything looks OK before confirming.';

    sidebar_counter.forEach(e=> e.classList.remove('counter-active'));
    sidebar_counter.at(3).classList.add('counter-active');

    forms[2].classList.add('hidden');
    forms[3].classList.remove('hidden');

    btn_next.textContent = 'Confirm';
    btn_next.style.backgroundColor = 'var(--Purplish-blue)';


    let amount = [];

    if (localStorage.hasOwnProperty('addon-online-service')){
        summary_container.insertAdjacentHTML('beforeend',
        `
        <div class="choosen-addon-container">
              <p class="choosen-addon-title">Online service</p>
              <p class="choosen-addon-price">+₹${localStorage.getItem('addon-online-service')}/${sub_type}</p>
        </div>
        `
        )

        amount.push(Number(localStorage.getItem('addon-online-service')))
    }
    
    
    if (localStorage.hasOwnProperty('addon-extra-storage')){
        summary_container.insertAdjacentHTML('beforeend',
        `
        <div class="choosen-addon-container">
        <p class="choosen-addon-title">Extra Storage</p>
        <p class="choosen-addon-price">+₹${localStorage.getItem('addon-extra-storage')}/${sub_type}</p>
        </div>
        `
        )

        amount.push(Number(localStorage.getItem('addon-extra-storage')))
    };
    
    if (localStorage.hasOwnProperty('addon-custom-pro')){
        summary_container.insertAdjacentHTML('beforeend',
        `
        <div class="choosen-addon-container">
        <p class="choosen-addon-title">Customizable profile </p>
        <p class="choosen-addon-price">+₹${localStorage.getItem('addon-custom-pro')}/${sub_type}</p>
        </div>
        `
        )


        amount.push(Number(localStorage.getItem('addon-custom-pro')))
    };

    
    sub_type == 'mo' ? choosen_period_2.textContent = 'per month' : choosen_period_2.textContent = 'per year';

    sub_type == 'mo' ? period.textContent = '/mo' : period.textContent = '/yr';



    if (amount.length != 0){
        total_amount.textContent = amount.reduce((e,a)=> e + a, Number(localStorage.getItem('card_type-price')));
    } else total_amount.textContent = localStorage.getItem('card_type-price');
    


}


// function to load third form
function loadThirdForm(){
    console.log('third form loaded')

    form_title.textContent = 'pick add-ons';
    form_subtitle.textContent = 'add-ons helps enhance your gaming experience.'

    sidebar_counter.forEach(e=> e.classList.remove('counter-active'));
    sidebar_counter.at(2).classList.add('counter-active');

    forms[1].classList.add('hidden');
    forms[2].classList.remove('hidden');

    return true
}

// function to load second form 
function loadSecondForm(){
    form_title.textContent = 'select your plan';
    form_subtitle.textContent = 'you have the option of monthly or yearly billing.'

    sidebar_counter.forEach(e=> e.classList.remove('counter-active'));
    sidebar_counter.at(1).classList.add('counter-active');

    // checking which subscription type user has chosen
    const btn_toggle = document.getElementById('toggle-btn');
    let w = window.innerWidth;

    setInterval(()=>{
        if (btn_toggle.checked){
            btn_toggle.checked = true;

            if(w <= 540 ){
                cards.forEach(c => c.style.height = '8rem');
            } else cards.forEach(c => c.style.height = '14rem');
            
            sub_price.forEach(c => c.textContent = '0/yr');
            yearly_offer.forEach(o => o.classList.remove('hidden'));
            subs_type[1].classList.add('type-active');
            subs_type[0].classList.remove('type-active');
            
            localStorage.setItem('subs_type', 'yr');
            
            cards.forEach(card =>{
                if(card.id == 'card-arcade' && card.classList.contains('card-active')) localStorage.setItem('card_type-price', 90);
                if(card.id == 'card-advanced' && card.classList.contains('card-active')) localStorage.setItem('card_type-price', 120);
                if(card.id == 'card-pro' && card.classList.contains('card-active')) localStorage.setItem('card_type-price', 150);
            })
            
        } else{
            btn_toggle.checked = false;

            // cards.forEach(c => c.style.height = '13rem');

            if(w <= 540 ){
                cards.forEach(c => c.style.height = '7rem');
            } else cards.forEach(c => c.style.height = '13rem');

            sub_price.forEach(c => c.textContent = '/mo');
            yearly_offer.forEach(o => o.classList.add('hidden'));
            subs_type[0].classList.add('type-active');
            subs_type[1].classList.remove('type-active');
            localStorage.setItem('subs_type', 'mo');

            cards.forEach(card =>{
                if(card.id == 'card-arcade' && card.classList.contains('card-active') ) localStorage.setItem('card_type-price', 9);
                if(card.id == 'card-advanced' && card.classList.contains('card-active')) localStorage.setItem('card_type-price', 12);
                if(card.id == 'card-pro' && card.classList.contains('card-active')) localStorage.setItem('card_type-price', 15);
            })
        }
        
    }, 250);

    

    console.log('second form loaded');
    forms[1].classList.remove('hidden');

    return true
}

// function to check form first input (is empty or not)
function loadFirstForm(){
    forms[0].classList.remove('hidden');


    form_title.textContent = 'Personal Info';
    form_subtitle.textContent = 'Please provide your name, email address and phone number.'

    let name_validate, email_validate, mobile_validate = false;

    if (user_name.value.trim() === ''){
        error_no_name.classList.remove('hidden');
    } else {
        error_no_name.classList.add('hidden');
        name_validate = true;
    }

    if (user_email.value.trim() === ''){
        error_no_email.classList.remove('hidden');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email.value.trim())){
        error_no_email.textContent = 'Invalid email';
        error_no_email.classList.remove('hidden');
    } else {
        error_no_email.classList.add('hidden');
        email_validate = true;
    }

    if (user_mob.value.trim() === ''){
        error_no_mobile.classList.remove('hidden');
    } else if (!/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(user_mob.value.trim())){
        error_no_mobile.textContent = 'Invalid mobile number';
        error_no_mobile.classList.remove('hidden');
    } else {
        error_no_mobile.classList.add('hidden');
        mobile_validate = true;
    }

    const form_validate = name_validate && email_validate && mobile_validate;

    sidebar_counter.forEach(e=> e.classList.remove('counter-active'));
    sidebar_counter.at(0).classList.add('counter-active');

    
    if (form_validate) {
        console.log('details correct');
        localStorage.setItem('current_form', 1);


    } else console.log('incorrect details');

    return form_validate;

}


// Event listerners and function calls 
// selecting cards
localStorage.setItem('card_type', 'Arcade')
cards.forEach(card => {
    card.addEventListener('click',()=>{
        cards.forEach(card => card.classList.remove('card-active'));
        
        card.classList.add('card-active');

        if(card.id == 'card-arcade') localStorage.setItem('card_type', 'Arcade');
        if(card.id == 'card-advanced') localStorage.setItem('card_type', 'Advanced');
        if(card.id == 'card-pro') localStorage.setItem('card_type', 'Pro');

    })
})

// checking add-on services 
addons.forEach(addon =>{
    setInterval(()=>{
        // if addon is checked than add addon-active class to it
        if (addon.childNodes[1].checked) addon.classList.add('addon-active');
        else  addon.classList.remove('addon-active');
    
        // storing addon details in localstorage
        if(addon.childNodes[1].checked && addon.id == 'addon-online-service' && localStorage.getItem('subs_type') == 'mo') localStorage.setItem('addon-online-service', 1);
        if(addon.childNodes[1].checked && addon.id == 'addon-online-service' && localStorage.getItem('subs_type') == 'yr') localStorage.setItem('addon-online-service', 10);
        if(addon.childNodes[1].checked == false && addon.id == 'addon-online-service') localStorage.removeItem('addon-online-service', 1);

        if(addon.childNodes[1].checked && addon.id == 'addon-extra-storage' && localStorage.getItem('subs_type') == 'mo') localStorage.setItem('addon-extra-storage',2);
        if(addon.childNodes[1].checked && addon.id == 'addon-extra-storage' && localStorage.getItem('subs_type') == 'yr') localStorage.setItem('addon-extra-storage', 20);
        if(addon.childNodes[1].checked == false && addon.id == 'addon-extra-storage') localStorage.removeItem('addon-extra-storage', 20);

        if(addon.childNodes[1].checked && addon.id == 'addon-custom-pro' && localStorage.getItem('subs_type') == 'mo') localStorage.setItem('addon-custom-pro',2);
        if(addon.childNodes[1].checked && addon.id == 'addon-custom-pro' && localStorage.getItem('subs_type') == 'yr') localStorage.setItem('addon-custom-pro', 20);
        if(addon.childNodes[1].checked == false && addon.id == 'addon-custom-pro') localStorage.removeItem('addon-custom-pro', 20);

    },500)


})
// *****************************************************************************
// button to go to next step 
btn_next.addEventListener('click', ()=>{
    current_form = localStorage.getItem('current_form');
    
    forms.forEach(f => f.classList.add('hidden'));
    console.log('click');
    
    // working with first form
    if (current_form == '0' && loadFirstForm()){
        forms[0].classList.remove('hidden');
        loadFirstForm();
        localStorage.setItem('current_form', 1);
        btn_next.click();
    }
    
    if (current_form == '1'){
        loadSecondForm(); 
        localStorage.setItem('current_form', 2);
    }
        
    if(current_form == '2'){
        loadThirdForm();
        localStorage.setItem('current_form', 3);
    }

    if(current_form == '3'){
        loadFourthForm();
        localStorage.setItem('current_form', 4);
    }
    
    if(current_form == '4'){
        loadFourthForm()
        localStorage.setItem('current_form', 5);
    }
    if(current_form == '5'){
        btn_next.click()
        form_container.classList.add('hidden')
        confirm_screen.classList.remove('hidden')
    }

})


// *****************************************************************************

// button to go to previous step
btn_back.addEventListener('click',()=>{
    forms.forEach(f => f.classList.add('hidden'));
    
    current_form = localStorage.getItem('current_form');
    console.log('click');
    console.log(current_form);
    
    if(current_form == '0'){
        forms[0].classList.remove('hidden');
        
    } else if(current_form == '1'){
        localStorage.setItem('current_form', '0');
        loadFirstForm();
        btn_back.classList.add('disable');
        forms[0].classList.remove('hidden');
        
    } else if (current_form == '2'){
        localStorage.setItem('current_form', '1');
        loadSecondForm();
        forms[1].classList.remove('hidden');

    } else if (current_form == '3'){
        localStorage.setItem('current_form', '2');
        loadThirdForm();
        forms[2].classList.remove('hidden');
        btn_next.style.backgroundColor = 'var(--Marine-blue)'
        btn_next.textContent = 'next step'

    } else if (current_form == '4'){
        localStorage.setItem('current_form', '3');
        loadFourthForm();
        forms[3].classList.remove('hidden');
        btn_back.click()

    }
})