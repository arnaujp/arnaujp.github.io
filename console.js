document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    // Create a persistent input line
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'arnaujover@portfolio';

    const input = document.createElement('span');
    input.className = 'cmd-input';
    input.contentEditable = true;
    input.spellcheck = false;
    input.dataset.placeholder = "Type a command... (try 'help')";

    inputLine.appendChild(promptSpan);
    inputLine.appendChild(input);
    output.appendChild(inputLine);

    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent newline in contenteditable
            const command = input.innerText.trim();
            if (command !== '') {
                const userLine = document.createElement('div');
                userLine.className = 'input-line';
    
                const promptClone = document.createElement('span');
                promptClone.className = 'prompt';
                promptClone.textContent = 'arnaujover@portfolio';
    
                const commandText = document.createElement('span');
                commandText.className = 'cmd-output';
                commandText.textContent = command;
    
                userLine.appendChild(promptClone);
                userLine.appendChild(commandText);
                output.insertBefore(userLine, inputLine);
                
                //HANDLING RESPONSE: 
                const responseDiv = document.createElement('div');
                responseDiv.className = 'response';
                
                switch (command) {
                    // In the 'help' case, add the 'clear' command description
                    case "help":
                        responseDiv.textContent = `
                            Available commands:
                            ----------------------------
                            help     - Show this help menu
                            clear    - Clear the console
                            whoami   - Display identity
                            skills   - List technical skills
                            projects - Show current projects
                            awards   - View achievements
                            github   - Get GitHub profile
                            prof     - Read professional statement
                            activ    - Show portfolio activities
                        `.replace(/ {12}/g, '');
                        break;

                    // Add a new case for 'clear'
                    case "clear":
                        // Remove all children except the persistent input line
                        const allDivs = output.querySelectorAll('div');

                        allDivs.forEach(div => {
                        // Check if this div does NOT contain a span.cmd-input
                        if (!div.querySelector('span.cmd-input')) {
                            div.remove(); // Remove the div if it doesn't have cmd-input
                        }
                        });
                        
                        scrollToBottom(); // Ensure console scrolls to the input line
                        break;
                
                    case "whoami":
                        responseDiv.textContent = "Arnau Jover | Cybersecurity Enthusiast";
                        break;
                
                    case "skills":
                        responseDiv.textContent = `
                            Technical Skills:
                            • C++
                            • Python
                            • Reverse Engineering
                        `.trim();
                        break;
                
                    case "projects":
                        // TODO: Add projects content
                        break;
                
                    case "awards":
                        // TODO: Add awards content
                        break;
                
                    case "github":
                        responseDiv.innerHTML = `GitHub: <a href="https://github.com/arnaujp" target="_blank">@arnaujp</a>`;
                        break;
                    case "activ":
                        responseDiv.innerHTML = `
        <h3>Security Audit Documentation</h3>
        <p>Access our security audit report: <a href="/Controls.pdf" target="_blank">PDF Download</a></p>
        
        <h3>Professional Activities</h3>
        <ul>
            <li>Drafting professional security statements and reports</li>
            <li>Conducting comprehensive security audits</li>
            <li>Analyzing network infrastructure and security protocols</li>
            <li>Managing file permissions using Linux command line</li>
            <li>Applying advanced filters to SQL queries for data analysis</li>
            <li>Identifying and assessing vulnerabilities for small business environments</li>
            <li>Documenting security incidents using handler's journal best practices</li>
            <li>Importing and parsing log files for security analysis</li>
            <li>Developing and optimizing professional resumes for security professionals</li>
        </ul>
        
        <p>For additional copies: <a href="/Controls.pdf" target="_blank">Security Audit PDF</a></p>
    `;
                        break;
                    case "prof":
                        responseDiv.textContent = `
                            My name is Arnau Jover. I am a motivated and detail-oriented individual with a 
                            Technological Baccalaureate and am currently pursuing a Higher Degree in IT Systems 
                            Administration and Networking (ASIX). My passion lies at the intersection of 
                            cybersecurity—both offensive and defensive—and the fundamental right to digital privacy.
                            
                            I thrive on dissecting complex challenges into manageable components, allowing me to 
                            delve deeper into solutions while maintaining efficiency and precision. Cybersecurity 
                            captivates me not only for its evolving innovations but also for its rich historical 
                            context, which I actively study to inform my understanding of modern threats and defenses.
                            
                            Though I am early in my career, I am committed to bridging theoretical knowledge with 
                            hands-on practice. Earning the Google Cybersecurity Certificate has equipped me with 
                            foundational skills in risk analysis, network security, and incident response, while 
                            reinforcing my determination to contribute meaningfully to protecting digital ecosystems.
                        `.replace(/ {12}/g, '');
                        break;
                
                    default:
                        responseDiv.innerHTML = `<span class="error">Error:</span> Command '${command}' not found`;
                        break;
                }
                
                output.insertBefore(responseDiv, inputLine);
            }
    
            input.innerText = '';
            scrollToBottom();
        }
    });    

    function scrollToBottom() {
        output.scrollTo({
            top: output.scrollHeight,
            behavior: 'smooth'
        });
    }
    
});
