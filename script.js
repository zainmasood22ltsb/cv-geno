document.addEventListener('DOMContentLoaded', () => {
    const cvForm = document.getElementById('cvForm');
    const cvOutput = document.getElementById('cvOutput');
    const printBtn = document.getElementById('printBtn');

    cvForm.addEventListener('submit', generateCV);
    printBtn.addEventListener('click', handlePrint);

    function generateCV(e) {
        e.preventDefault();
        
        const cvData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            summary: document.getElementById('summary').value,
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
            education: document.getElementById('education').value,
            experience: document.getElementById('experience').value
        };

        const cvHTML = `
            <div class="cv-header">
                <h2>${cvData.name}</h2>
                <p>${cvData.email} | ${cvData.phone} | ${cvData.location}</p>
            </div>
            
            <div class="cv-section">
                <h3>Professional Summary</h3>
                <p>${cvData.summary}</p>
            </div>
            
            <div class="cv-section">
                <h3>Technical Skills</h3>
                <ul>${cvData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            </div>
            
            <div class="cv-section">
                <h3>Education</h3>
                <p>${cvData.education.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="cv-section">
                <h3>Work Experience</h3>
                <p>${cvData.experience.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        cvOutput.innerHTML = cvHTML;
        cvOutput.style.display = 'block';
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    function handlePrint() {
        const printContents = cvOutput.innerHTML;
        const originalContents = document.body.innerHTML;
        
        document.body.innerHTML = `
            <style>
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #cvOutput, #cvOutput * {
                        visibility: visible;
                    }
                    #cvOutput {
                        position: absolute;
                        left: 0;
                        top: 0;
                        box-shadow: none;
                    }
                }
            </style>
            ${printContents}
        `;
        
        window.print();
        document.body.innerHTML = originalContents;
        cvOutput.style.display = 'block';
    }
});