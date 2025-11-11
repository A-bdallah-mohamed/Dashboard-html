  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;


  
const darkbuttons =  document.querySelectorAll('.darkbutton')

darkbuttons.forEach(dark => {
  dark.addEventListener('click', ()=> {
    console.log("clicked")
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'

    console.log(document.documentElement.dataset.theme)
localStorage.setItem('theme',document.documentElement.dataset.theme)
    if(document.documentElement.dataset.theme === 'dark'){
      darkbuttons.forEach(button => button.className = 'bi bi-brightness-high-fill darkbutton')
   
    }
    else{
            darkbuttons.forEach(button => button.className = 'bi bi-moon-fill darkbutton')
      
    }
  })
})

const togglepassword = document.getElementById('togglepassword')
const password = document.getElementById('password-input')
togglepassword.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    togglepassword.classList.toggle('bi-eye-slash');
    togglepassword.classList.toggle('bi-eye');

})