function addExperienceField() {
    const container = document.getElementById('experience-fields');
    const index = container.children.length;
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <input type="text" name="job_title" placeholder="Job Title" required>
        <input type="text" name="company" placeholder="Company Name, City, Province" required>
        <input type="text" name="dates" placeholder="May 20XX – Present" required>
        <div class="responsibility-list"></div>
        <button type="button" onclick="addResponsibility(this)">Add Achievement</button>
        <input type="hidden" name="responsibilities" value="">
        <button type="button" class="remove-btn" onclick="removeField(this)">Remove Experience</button>
    `;
    container.appendChild(newEntry);
    updateProgress();
}

function addEducationField() {
    const container = document.getElementById('education-fields');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" name="degree" placeholder="Degree or Diploma" required>
        <input type="text" name="institution" placeholder="Institution Name, City, Province" required>
        <input type="text" name="graduation_date" placeholder="May 20XX" required>
        <button type="button" class="remove-btn" onclick="removeField(this)">Remove Education</button>
    `;
    container.appendChild(newEntry);
    updateProgress();
}

function removeField(button) {
    button.parentElement.remove();
    updateProgress();
}

function addResponsibility(button) {
    const list = button.previousElementSibling;
    const item = document.createElement('div');
    item.className = 'responsibility-item';
    item.innerHTML = `
        <input type="text" placeholder="Describe an achievement or responsibility" oninput="updateResponsibilities(this)">
        <button type="button" class="remove-btn" onclick="removeField(this)">Remove</button>
    `;
    list.appendChild(item);
    updateResponsibilities(item.querySelector('input'));
    updateProgress();
}

function updateResponsibilities(input) {
    const list = input.closest('.responsibility-list');
    const hiddenInput = list.nextElementSibling.nextElementSibling;
    const responsibilities = Array.from(list.querySelectorAll('input')).map(input => input.value);
    hiddenInput.value = responsibilities.join('|');
}

// Theme switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList[currentTheme === 'dark' ? 'add' : 'remove']('dark-mode');
    toggleSwitch.checked = currentTheme === 'dark';
}

// Progress bar
function updateProgress() {
    const form = document.getElementById('resume-form');
    const inputs = form.querySelectorAll('input, textarea');
    const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
    const progress = (filledInputs.length / inputs.length) * 100;
    
    const progressBar = document.getElementById('progress-bar');
    progressBar.innerHTML = `<div class="progress-bar-fill" style="width: ${progress}%"></div>`;
}


// Initialize fields and progress bar
window.onload = function() {
    addExperienceField();
    addEducationField();
    updateProgress();
    
    // Add event listeners to all form inputs
    const form = document.getElementById('resume-form');
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateProgress);
    });
};

// Download buttons
document.getElementById('download-pdf').addEventListener('click', function() {
    window.location.href = '/download/pdf';
});

document.getElementById('download-docx').addEventListener('click', function() {
    window.location.href = '/download/docx';
});


