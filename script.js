
document.getElementById('contactForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const resultEl = document.getElementById('formResult');
  resultEl.textContent = 'Sending...';
  try{
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name,email,message})
    });
    const data = await resp.json();
    if(resp.ok){
      resultEl.textContent = 'Message sent — thank you!';
      document.getElementById('contactForm').reset();
    } else {
      resultEl.textContent = data.error || 'Failed to send message';
    }
  } catch(err){
    console.error(err);
    resultEl.textContent = 'Network error. Try again later.';
  }
});
