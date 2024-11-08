var form = document.getElementById("resume-form");
var resumeOutput = document.getElementById("resume-output");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    event.preventDefault();
    // Capture form data
    var formData = new FormData(form);
    var resume = {
        name: ((_a = formData.get("name")) === null || _a === void 0 ? void 0 : _a.toString()) || "",
        email: ((_b = formData.get("email")) === null || _b === void 0 ? void 0 : _b.toString()) || "",
        phone: ((_c = formData.get("phone")) === null || _c === void 0 ? void 0 : _c.toString()) || "",
        address: ((_d = formData.get("address")) === null || _d === void 0 ? void 0 : _d.toString()) || "",
        education: {
            degree: ((_e = formData.get("degree")) === null || _e === void 0 ? void 0 : _e.toString()) || "",
            university: ((_f = formData.get("university")) === null || _f === void 0 ? void 0 : _f.toString()) || "",
            year: parseInt(((_g = formData.get("year")) === null || _g === void 0 ? void 0 : _g.toString()) || "NaN", 10),
        },
        workExperience: {
            company: ((_h = formData.get("company")) === null || _h === void 0 ? void 0 : _h.toString()) || "",
            role: ((_j = formData.get("role")) === null || _j === void 0 ? void 0 : _j.toString()) || "",
            duration: parseInt(((_k = formData.get("duration")) === null || _k === void 0 ? void 0 : _k.toString()) || "NaN", 10),
        },
        skills: parseSkills(((_l = formData.get("skills")) === null || _l === void 0 ? void 0 : _l.toString()) || ""),
    };
    if (!validateResume(resume)) {
        alert("Please fill out all required fields.");
        return;
    }
    generateResume(resume);
});
// Parse skills from comma-separated string
function parseSkills(skillsInput) {
    return skillsInput.split(",").map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill.length > 0; });
}
// Validate that required fields are filled
function validateResume(resume) {
    return resume.name !== "" && resume.email !== "" && resume.education.degree !== "" &&
        resume.education.university !== "" && !isNaN(resume.education.year) &&
        resume.workExperience.company !== "" && resume.workExperience.role !== "" &&
        !isNaN(resume.workExperience.duration);
}
// Dynamically generate the resume HTML
function generateResume(resume) {
    var resumeHtml = "\n    <h2>".concat(resume.name, "</h2>\n    <p><strong>Email:</strong> ").concat(resume.email, "</p>\n    <p><strong>Phone:</strong> ").concat(resume.phone, "</p>\n    <p><strong>Address:</strong> ").concat(resume.address, "</p>\n    \n    <h3>Education</h3>\n    <p><strong>Degree:</strong> ").concat(resume.education.degree, "</p>\n    <p><strong>University:</strong> ").concat(resume.education.university, "</p>\n    <p><strong>Graduation Year:</strong> ").concat(resume.education.year, "</p>\n    \n    <h3>Work Experience</h3>\n    <p><strong>Company:</strong> ").concat(resume.workExperience.company, "</p>\n    <p><strong>Role:</strong> ").concat(resume.workExperience.role, "</p>\n    <p><strong>Duration:</strong> ").concat(resume.workExperience.duration, " years</p>\n    \n    <h3>Skills</h3>\n    <ul>\n      ").concat(resume.skills.length > 0 ? resume.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('') : '<li>No skills added</li>', "\n    </ul>\n  ");
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeHtml;
    }
    else {
        console.error("Could not find resume output container.");
    }
}
// Assuming `username` is available in your resume data
const shareLink = `https://yourapp.vercel.app/${resumeData.username}`;

const linkHtml = `
  <div class="share-container">
    <p>Share your resume:</p>
    <a href="${shareLink}" target="_blank">${shareLink}</a>
    <button onclick="copyToClipboard('${shareLink}')">Copy Link</button>
  </div>
`;

// Append the share link to the resume output
resumeOutput.innerHTML += linkHtml;

// Copy-to-clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => alert('Link copied to clipboard!'),
    (err) => console.error('Error copying text to clipboard', err)
  );
}
// Button to trigger PDF download
const downloadButtonHtml = `
  <button onclick="downloadResumeAsPDF()">Download as PDF</button>
`;
resumeOutput.innerHTML += downloadButtonHtml;

// PDF Download function
function downloadResumeAsPDF() {
  const element = document.getElementById('resume-output');
  const options = {
    filename: `${resumeData.username}_resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(options).save();
}
