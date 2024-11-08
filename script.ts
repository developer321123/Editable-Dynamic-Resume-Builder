interface Resume {
    name: string;
    email: string;
    phone: string;
    address: string;
    education: {
      degree: string;
      university: string;
      year: number;
    };
    workExperience: {
      company: string;
      role: string;
      duration: number;
    };
    skills: string[];
  }
  
  // Ensure the form and output elements exist in the DOM
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const resumeOutput = document.getElementById("resume-output") as HTMLElement;
  
  if (!form) {
    console.error("Form element with id 'resume-form' not found.");
  }
  
  if (!resumeOutput) {
    console.error("Element with id 'resume-output' not found.");
  }
  
  form?.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data
    const formData = new FormData(form);
  
    // Get the values from the form
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const address = formData.get("address")?.toString() || "";
    const degree = formData.get("degree")?.toString() || "";
    const university = formData.get("university")?.toString() || "";
    const year = parseInt(formData.get("year")?.toString() || "NaN", 10);
    const company = formData.get("company")?.toString() || "";
    const role = formData.get("role")?.toString() || "";
    const duration = parseInt(formData.get("duration")?.toString() || "NaN", 10);
    const skillsInput = formData.get("skills")?.toString() || "";
  
    // Validate required fields
    if (!name || !email || !degree || !university || isNaN(year) || !company || !role || isNaN(duration)) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Create resume object
    const resume: Resume = {
      name,
      email,
      phone,
      address,
      education: {
        degree,
        university,
        year,
      },
      workExperience: {
        company,
        role,
        duration,
      },
      skills: parseSkills(skillsInput),
    };
  
    // Debugging: Log the resume object
    console.log("Resume Data:", resume);
  
    // Generate and display the resume
    generateResume(resume);
  });
  
  function parseSkills(skillsInput: string): string[] {
    // Split skills by commas and remove empty entries
    return skillsInput.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0);
  }
  
  function generateResume(resume: Resume) {
    const resumeHtml = `
      <h2 contenteditable="true" onblur="updateResume('name', this.innerText)">${resume.name}</h2>
      <p><strong>Email:</strong> <span contenteditable="true" onblur="updateResume('email', this.innerText)">${resume.email}</span></p>
      <p><strong>Phone:</strong> <span contenteditable="true" onblur="updateResume('phone', this.innerText)">${resume.phone}</span></p>
      <p><strong>Address:</strong> <span contenteditable="true" onblur="updateResume('address', this.innerText)">${resume.address}</span></p>
      
      <h3>Education</h3>
      <p><strong>Degree:</strong> <span contenteditable="true" onblur="updateResume('education.degree', this.innerText)">${resume.education.degree}</span></p>
      <p><strong>University:</strong> <span contenteditable="true" onblur="updateResume('education.university', this.innerText)">${resume.education.university}</span></p>
      <p><strong>Graduation Year:</strong> <span contenteditable="true" onblur="updateResume('education.year', this.innerText)">${resume.education.year}</span></p>
      
      <h3>Work Experience</h3>
      <p><strong>Company:</strong> <span contenteditable="true" onblur="updateResume('workExperience.company', this.innerText)">${resume.workExperience.company}</span></p>
      <p><strong>Role:</strong> <span contenteditable="true" onblur="updateResume('workExperience.role', this.innerText)">${resume.workExperience.role}</span></p>
      <p><strong>Duration:</strong> <span contenteditable="true" onblur="updateResume('workExperience.duration', this.innerText)">${resume.workExperience.duration}</span> years</p>
      
      <h3>Skills</h3>
      <ul class="skill-list" contenteditable="true" onblur="updateSkills(this.innerText)">
        ${resume.skills.length > 0 ? resume.skills.map(skill => `<li>${skill}</li>`).join('') : '<li>No skills added</li>'}
      </ul>
    `;
  
    if (resumeOutput) {
      resumeOutput.innerHTML = resumeHtml;
    } else {
      console.error("Element with id 'resume-output' not found.");
    }
  }
// Reference the resume data so updates are applied directly
let resumeData: Resume = {
  name: "",
  email: "",
  phone: "",
  address: "",
  education: { degree: "", university: "", year: NaN },
  workExperience: { company: "", role: "", duration: NaN },
  skills: []
};

function updateResume(field: string, value: string) {
  const keys = field.split(".");
  let current: any = resumeData;

  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }

  // Update the specific field
  current[keys[keys.length - 1]] = isNaN(Number(value)) ? value : Number(value);

  // Regenerate the resume to reflect the updated data
  generateResume(resumeData);
}

function updateSkills(skillText: string) {
  resumeData.skills = skillText
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  generateResume(resumeData);
}
import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  const { username } = req.query;
  // Fetch resume data based on `username` (from a database or in-memory storage)
  // For demo purposes, we assume `resumeData` is fetched using `username`

  const resumeData = getResumeDataByUsername(username as string); // Implement data fetching logic here
  if (!resumeData) {
    return res.status(404).send('Resume not found');
  }

  // Render resume page with data, here we're assuming a static HTML structure.
  res.send(renderResumePage(resumeData));
};
  
