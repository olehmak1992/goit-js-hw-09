const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

loadFromStorage();

form.addEventListener('input', handleInput);

form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
}

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    if (parsed.email) {
      form.elements.email.value = parsed.email;
      formData.email = parsed.email;
    }

    if (parsed.message) {
      form.elements.message.value = parsed.message;
      formData.message = parsed.message;
    }
  } catch (error) {
    console.error('Error parsing storage data:', error);
  }
}
