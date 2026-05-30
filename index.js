// Dynamic Interactivity & Logic for Febin Sani's Portfolio
// Implements: Network Canvas, Theme switcher, Sound Synthesizer, Work-sample Terminal, Security+ Quiz, Audit Modals

document.addEventListener('DOMContentLoaded', () => {
  
  // --- SOUND EFFECTS SYNTHESIZER (Web Audio API) ---
  let isMuted = true;
  let audioCtx = null;

  const initAudio = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playSound = (type) => {
    if (isMuted) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'type') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700 + Math.random() * 300, now);
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.18);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'alarm') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.linearRampToValueAtTime(500, now + 0.12);
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      console.warn("Audio Context blocked or failed to initialize", e);
    }
  };

  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      if (!isMuted) {
        initAudio();
        soundToggle.textContent = '🔊 SOUND ON';
        soundToggle.classList.add('glow-text');
        playSound('success');
      } else {
        soundToggle.textContent = '🔇 MUTED';
        soundToggle.classList.remove('glow-text');
      }
    });
  }

  // --- THEME COLOR ACCENT SWITCHER ---
  const themeDots = document.querySelectorAll('.theme-picker .theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      playSound('click');
      const themeClass = e.target.getAttribute('data-theme');
      
      // Update dots active class
      themeDots.forEach(d => d.classList.remove('active'));
      e.target.classList.add('active');
      
      // Set theme class on body
      document.body.className = '';
      document.body.classList.add(themeClass);
      
      // Flash success chirp on update
      playSound('success');
    });
  });

  // --- FLOATING CANVAS NETWORK ---
  const canvas = document.getElementById('network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 130 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.5;
            this.y += (dy / dist) * force * 0.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Grab current theme primary accent
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        ctx.fillStyle = primaryColor + '60'; // Adds transparency
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 14000);
      const cap = Math.min(density, 80);
      for (let i = 0; i < cap; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (90 - dist) / 90 * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const accentColor = getComputedStyle(document.body).getPropertyValue('--accent-secondary').trim();
            ctx.strokeStyle = accentColor + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animateParticles();
  }

  // --- MOBILE NAV MENU ---
  const menuBtn = document.getElementById('nav-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      playSound('click');
      navLinks.classList.toggle('active');
      menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '☰';
      });
    });
  }

  // --- CLI TERMINAL (REAL TECHNICAL WORK SAMPLES) ---
  const terminal = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (terminal && termInput && termOutput) {
    // Initial load message
    const welcomeLines = [
      "SOC Triage Console Node v1.1.0 initialized.",
      "Access Level: RECRUITER_AUDIT_MODE",
      "Type 'help' to review available scripts and log rules.",
      ""
    ];

    welcomeLines.forEach(line => {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.textContent = line;
      termOutput.appendChild(div);
    });

    terminal.addEventListener('click', () => termInput.focus());

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const fullCmd = termInput.value.trim();
        termInput.value = '';
        if (fullCmd) {
          executeCommand(fullCmd);
        }
      } else if (e.key.length === 1) {
        playSound('type');
      }
    });

    const executeCommand = (cmdStr) => {
      playSound('click');
      const parts = cmdStr.split(' ');
      const mainCmd = parts[0].toLowerCase();
      
      const promptDiv = document.createElement('div');
      promptDiv.className = 'terminal-line';
      promptDiv.innerHTML = `<span class="terminal-prompt-sym">$</span> <span style="color:var(--accent)">${cmdStr}</span>`;
      termOutput.appendChild(promptDiv);

      let response = '';

      switch (mainCmd) {
        case 'help':
          response = [
            "AVAILABLE SYSTEM AUDIT COMMANDS:",
            "  splunk    - Display custom Splunk alert search query",
            "  wazuh     - View Wazuh threat detection XML configuration rule",
            "  script    - View Python log-parsing automation script",
            "  thm       - Print TryHackMe sandbox metrics & rankings",
            "  about     - Display biography and transition outline",
            "  clear     - Wipe console logs"
          ].join('\n');
          break;
        case 'splunk':
          response = [
            "--- CUSTOM SPLUNK AUTH CORRELATION QUERY ---",
            "index=security sourcetype=linux_secure eventtype=ssh_login_failure",
            "| stats count values(user) as attempted_users dc(user) as unique_users_tried BY src_ip",
            "| where count > 15 AND unique_users_tried > 3",
            "| eval threat_level=if(count > 50, \"CRITICAL\", \"HIGH\")",
            "| sort - count",
            "",
            "// Description: Correlation script identifying distributed brute force targets.",
            "// Used to flag threat clusters executing SSH credentials spraying."
          ].join('\n');
          break;
        case 'wazuh':
          response = [
            "<!-- CUSTOM WAZUH INTEGRATION DETECTOR RULE -->",
            "<group name=\"linux,syslog,authentication_failed,\">",
            "  <rule id=\"100085\" level=\"10\">",
            "    <if_sid>5716</if_sid>",
            "    <srcip>198.51.100.42</srcip>",
            "    <description>SSH brute force trigger: Blocklist target IP matches</description>",
            "    <group>mitre_t1110</group>",
            "  </rule>",
            "</group>",
            "",
            "// Description: Alerts security analyst when unauthorized outbound target",
            "// IP executes logins matching brute-force credentials profiles (MITRE T1110)."
          ].join('\n');
          break;
        case 'script':
          response = [
            "# python3 auth_log_parser.py",
            "import re, sys",
            "",
            "def parse_ssh_failures(log_path):",
            "    regex = r'Failed password for (?:invalid user )?(\\S+) from (\\d+\\.\\d+\\.\\d+\\.\\d+)'",
            "    with open(log_path, 'r') as f:",
            "        for line in f:",
            "            match = re.search(regex, line)",
            "            if match:",
            "                user, ip = match.groups()",
            "                print(f\"[SUSPICIOUS AUTH] Target User: {user} | Origin: {ip}\")",
            "",
            "parse_ssh_failures('/var/log/auth.log')",
            "",
            "// Description: Python script automating SSH intrusion log queries.",
            "// Streamlines forensics triage during active investigations."
          ].join('\n');
          break;
        case 'thm':
          response = [
            "--- TRYHACKME NODES MATRIX ---",
            "  Username:       NDFS",
            "  Global Rank:    Top 200 (~#185)",
            "  India Rank:     Top 20",
            "  Solved Rooms:   1050+ interactive labs",
            "  Pathways Completed:",
            "    ✔ SOC Level 1     ✔ SOC Level 2",
            "    ✔ Cyber Defense   ✔ Offensive Security / Pentesting"
          ].join('\n');
          break;
        case 'about':
          response = [
            "I transitioned from Civil Engineering to Cybersecurity out of curiosity",
            "for system architectures and threat-hunting workflows. After earning my ADCD",
            "in 2024 and building a Top 20 India TryHackMe record, I became a trainer and",
            "researcher. I specialize in Wazuh deployments and security education."
          ].join('\n');
          break;
        case 'clear':
          termOutput.innerHTML = '';
          terminal.scrollTop = 0;
          return;
        default:
          response = `Command unrecognized: '${mainCmd}'. Type 'help' for available work logs.`;
          playSound('error');
      }

      if (response) {
        const respDiv = document.createElement('div');
        respDiv.className = 'terminal-line';
        respDiv.style.whiteSpace = 'pre-wrap';
        respDiv.textContent = response;
        termOutput.appendChild(respDiv);
      }

      terminal.scrollTop = terminal.scrollHeight;
    };
  }

  // --- COMPTIA SECURITY+ QUIZ INTERACTIVE CONSOLE ---
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizScoreDisplay = document.getElementById('quiz-score');
  const quizQNumDisplay = document.getElementById('quiz-q-num');
  const quizTopicDisplay = document.getElementById('quiz-topic');

  if (quizQuestionText && quizOptionsContainer && quizFeedback) {
    const quizQuestions = [
      {
        topic: "PORTS & SECURE PROTOCOLS",
        question: "1. A systems administrator needs to configure secure remote access to a server command line. Which of the following ports and protocols should be allowed through the firewall?",
        options: [
          "A. TCP Port 23 (Telnet)",
          "B. TCP Port 22 (SSH)",
          "C. UDP Port 53 (DNS)",
          "D. TCP Port 80 (HTTP)"
        ],
        correct: 1, // B
        feedback: "Correct! Secure Shell (SSH) encrypts command sessions on TCP port 22. Telnet (Port 23) transmits payloads in clear text."
      },
      {
        topic: "THREAT TYPES & MALWARE",
        question: "2. An incident investigator reviews system log anomalies and discovers malware executed directly within active host RAM, avoiding file footprint records on local disks. What type of vulnerability exploitation occurred?",
        options: [
          "A. Ransomware Injection",
          "B. Fileless Malware",
          "C. Rootkit Hooking",
          "D. Logic Bomb Trigger"
        ],
        correct: 1, // B
        feedback: "Correct! Fileless malware loads scripts straight into running memory processes, bypassing classic file-hash verification."
      },
      {
        topic: "CRYPTOGRAPHY STANDARDS",
        question: "3. To secure enterprise wireless networks against data interception, which security standard implements GCMP-256 and cryptographic key handshake protections?",
        options: [
          "A. WPA3 Standard",
          "B. WEP Configuration",
          "C. WPA Basic",
          "D. HTTP Plaintext"
        ],
        correct: 0, // A
        feedback: "Correct! WPA3 utilizes advanced Galois/Counter Mode Protocol (GCMP-256) encryption, replacing deprecated WPA2 standard structures."
      }
    ];

    let currentQIndex = 0;
    let score = 0;
    let quizLocked = false;

    const loadQuestion = (index) => {
      quizLocked = false;
      quizFeedback.textContent = '';
      quizFeedback.className = 'quiz-feedback';
      
      const q = quizQuestions[index];
      quizTopicDisplay.textContent = q.topic;
      quizQNumDisplay.textContent = index + 1;
      quizQuestionText.textContent = q.question;
      
      quizOptionsContainer.innerHTML = '';
      q.options.forEach((opt, oIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectOption(oIdx));
        quizOptionsContainer.appendChild(btn);
      });
    };

    const selectOption = (optIndex) => {
      if (quizLocked) return;
      quizLocked = true;
      
      const q = quizQuestions[currentQIndex];
      const buttons = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
      
      if (optIndex === q.correct) {
        score++;
        quizScoreDisplay.textContent = score;
        buttons[optIndex].classList.add('correct');
        quizFeedback.textContent = "[+] " + q.feedback;
        quizFeedback.style.color = 'var(--accent-secondary)';
        playSound('success');
      } else {
        buttons[optIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        quizFeedback.textContent = "[-] Incorrect. " + q.feedback;
        quizFeedback.style.color = 'var(--red)';
        playSound('error');
      }

      // Transition to next question
      setTimeout(() => {
        currentQIndex++;
        if (currentQIndex < quizQuestions.length) {
          loadQuestion(currentQIndex);
        } else {
          showQuizResults();
        }
      }, 3500);
    };

    const showQuizResults = () => {
      quizQuestionText.textContent = "Quiz Complete!";
      quizOptionsContainer.innerHTML = `
        <div style="text-align:center; padding:10px;">
          <h4 style="font-family:var(--font-title); font-size:1.1rem; color:#fff; margin-bottom:8px;">Your Score: ${score}/3</h4>
          <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">
            ${score === 3 ? "Excellent! You have solid Security+ fundamentals." : "Good try. Check out my logs dashboard for threat mitigation scenarios!"}
          </p>
          <button id="quiz-reset-btn" class="btn btn-primary" style="margin-top:16px; padding:8px 16px; font-size:0.75rem;">Retake Quiz</button>
        </div>
      `;
      quizFeedback.textContent = '';
      
      const resetBtn = document.getElementById('quiz-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          playSound('click');
          currentQIndex = 0;
          score = 0;
          quizScoreDisplay.textContent = '0';
          loadQuestion(0);
        });
      }
    };

    // Load first question
    loadQuestion(0);
  }

  // --- SOC INCIDENT RESPONSE SIMULATOR ---
  const simConsoleBody = document.getElementById('sim-console-body');
  const simAlertTitle = document.getElementById('sim-alert-title');
  const simAlertCode = document.getElementById('sim-alert-code');
  const simAlertLogs = document.getElementById('sim-alert-logs');
  const simActionChoices = document.getElementById('sim-action-choices');
  const simFeedback = document.getElementById('sim-feedback');
  const simIndicatorLight = document.getElementById('sim-indicator-light');

  if (simConsoleBody && simAlertTitle && simActionChoices && simFeedback) {
    let currentStage = 1;
    let alertInterval = null;

    const runAlertSound = () => {
      if (alertInterval) clearInterval(alertInterval);
      alertInterval = setInterval(() => {
        if (currentStage < 3) {
          playSound('alarm');
        } else {
          clearInterval(alertInterval);
        }
      }, 2000);
    };

    const loadStage1 = () => {
      currentStage = 1;
      runAlertSound();
      simIndicatorLight.className = 'sim-indicator-light alarm';
      simAlertTitle.textContent = "CRITICAL: ALERTING ROOT BRUTE FORCE";
      simAlertCode.textContent = "ALRT-SSH-99";
      simAlertLogs.textContent = [
        "May 30 09:12:01 Host-17 sshd[1028]: Failed password for root from 198.51.100.42 port 49122 ssh2",
        "May 30 09:12:03 Host-17 sshd[1032]: Failed password for root from 198.51.100.42 port 49124 ssh2",
        "May 30 09:12:05 Host-17 sshd[1035]: Failed password for root from 198.51.100.42 port 49126 ssh2",
        "May 30 09:12:07 Host-17 sshd[1039]: Accepted password for root from 198.51.100.42 port 49128 ssh2",
        "May 30 09:12:09 Host-17 systemd: session-10 opened for root user"
      ].join('\n');

      simActionChoices.innerHTML = `
        <button class="sim-choice-btn" data-choice="ignore">A. File as false positive. Session matches system logging sync sequence.</button>
        <button class="sim-choice-btn" data-choice="scan">B. Run local file index hash scans using standard agent antivirus.</button>
        <button class="sim-choice-btn" data-choice="isolate">C. Isolate Host-17 from internal network & Block IP 198.51.100.42 at Gateway Firewall.</button>
      `;

      simActionChoices.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const choice = e.currentTarget.getAttribute('data-choice');
          handleSimChoice(choice);
        });
      });
    };

    const handleSimChoice = (choice) => {
      if (currentStage === 1) {
        if (choice === 'ignore') {
          playSound('error');
          simFeedback.className = 'sim-feedback error';
          simFeedback.textContent = "[-] TRIAGE INCORRECT: Intruder bypassed detection and completed domain privilege escalation! Resetting logs...";
        } else if (choice === 'scan') {
          playSound('error');
          simFeedback.className = 'sim-feedback error';
          simFeedback.textContent = "[-] TRIAGE INCOMPLETE: Scanner failed to terminate interactive remote sockets. Connection remains open! Try again.";
        } else if (choice === 'isolate') {
          playSound('success');
          simFeedback.className = 'sim-feedback success';
          simFeedback.textContent = "[+] CONTAINMENT ACTION SUCCESSFUL: Link blocked. Alarm silent. Unlocking Stage 2 Analysis...";
          setTimeout(() => {
            loadStage2();
          }, 2000);
        }
      } else if (currentStage === 2) {
        if (choice === 'close') {
          playSound('error');
          simFeedback.className = 'sim-feedback error';
          simFeedback.textContent = "[-] INSUFFICIENT ACTION: Deleting terminal session does not delete the backdoor key. Threat will return. Try again.";
        } else if (choice === 'rebuild') {
          playSound('error');
          simFeedback.className = 'sim-feedback error';
          simFeedback.textContent = "[-] INACCURATE RESOLUTION: Rebuilding machine immediately destroys log evidence and doesn't patch the root configuration error. Try again.";
        } else if (choice === 'audit') {
          playSound('success');
          clearInterval(alertInterval);
          simFeedback.className = 'sim-feedback success';
          simFeedback.textContent = "[+] RESOLVED: Persistence key removed. Root account rotated. System integrity restored.";
          setTimeout(() => {
            loadSimSuccess();
          }, 2000);
        }
      }
    };

    const loadStage2 = () => {
      currentStage = 2;
      simIndicatorLight.className = 'sim-indicator-light alarm';
      simFeedback.className = 'sim-feedback';
      simFeedback.textContent = "Threat link contained. Audit persistent credentials vectors.";
      simAlertTitle.textContent = "INVESTIGATION: CRITICAL FILE AUDITS";
      simAlertCode.textContent = "AUDT-KEYS-02";
      simAlertLogs.textContent = [
        "root@Host-17:~# cat /home/root/.ssh/authorized_keys",
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8... attacker@remote-c2-node",
        "root@Host-17:~# stat /home/root/.ssh/authorized_keys",
        "Modify: 2026-05-30 09:12:08.000000000 (Uploaded 1 second after authentication bypass)"
      ].join('\n');

      simActionChoices.innerHTML = `
        <button class="sim-choice-btn" data-choice="close">A. Kill the SSH active process and close remote terminal terminal logs.</button>
        <button class="sim-choice-btn" data-choice="audit">B. Delete malicious key from authorized_keys, rotate root credentials, and disable root SSH login.</button>
        <button class="sim-choice-btn" data-choice="rebuild">C. Shut down VM and run raw clone deployment from standard template.</button>
      `;

      simActionChoices.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const choice = e.currentTarget.getAttribute('data-choice');
          handleSimChoice(choice);
        });
      });
    };

    const loadSimSuccess = () => {
      currentStage = 3;
      simIndicatorLight.className = 'sim-indicator-light';
      
      simConsoleBody.innerHTML = `
        <div class="sim-success-screen">
          <div class="sim-success-icon" style="text-shadow: 0 0 10px rgba(0,255,157,0.4); font-size:3rem;">🏆</div>
          <h4 style="font-family:var(--font-title); font-size:1.2rem; color:#fff;">INCIDENT TRIAGE SUCCESSFUL</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); max-width:320px; line-height:1.5; margin: 8px 0;">
            Host-17 is secure. The persistence backdoor has been expunged and SSH policies hardened.
          </p>
          <div style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(var(--accent-secondary-rgb), 0.05); border:1px dashed rgba(var(--accent-secondary-rgb), 0.25); padding:12px; border-radius:4px; width:100%; margin-top:8px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>CONTAINMENT LEVEL:</span><span style="color:var(--accent-secondary)">OPTIMAL</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>TRIAGE SCORE:</span><span style="color:var(--accent-secondary)">100/100</span>
            </div>
          </div>
          <button id="sim-reset-btn" class="btn btn-secondary" style="margin-top:12px; padding:6px 16px; font-size:0.75rem;">Restart Simulator</button>
        </div>
      `;

      const resetBtn = document.getElementById('sim-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          playSound('click');
          window.location.reload();
        });
      }
    };

    loadStage1();
  }

  // --- INTERACTIVE DECLASSIFIED SECURITY AUDIT REPORTS ---
  const reportPanel = document.getElementById('report-panel');
  const reportOverlay = document.getElementById('report-overlay');
  const reportCloseBtn = document.getElementById('report-close-btn');
  const reportModalTag = document.getElementById('report-modal-tag');
  const reportModalTitle = document.getElementById('report-modal-title');
  const reportModalClass = document.getElementById('report-modal-class');
  const reportModalTarget = document.getElementById('report-modal-target');
  const reportModalBody = document.getElementById('report-modal-body');

  const projectReports = {
    wazuh: {
      tag: "SECURITY OPERATIONS CENTRAL / SIEM REPORT",
      title: "Wazuh Log Aggregation Cluster Deployment & Custom Rule Engineering",
      classification: "PROPRIETARY DEFENSE DATA",
      target: "SYS-WAZUH-MONITOR-01",
      body: `
        <h4>1. Executive Summary</h4>
        <p>This report documents the configuration and integration metrics for our centralized Wazuh SIEM deployment. The system handles secure syslog ingestion, decoder mapping, and generates alerts indexed to key MITRE ATT&CK tactics.</p>
        
        <h4>2. Rule Correlation Configuration</h4>
        <p>A sample correlation rule constructed to detect credential spraying targets from external subnets was engineered as follows:</p>
        <div class="report-code-block">
&lt;rule id="100085" level="10"&gt;
  &lt;if_sid&gt;5716&lt;/if_sid&gt;
  &lt;srcip&gt;198.51.100.42&lt;/srcip&gt;
  &lt;description&gt;SSH Brute Force: Blacklist Match&lt;/description&gt;
  &lt;group&gt;mitre_t1110&lt;/group&gt;
&lt;/rule&gt;
        </div>
        
        <h4>3. Security Metrics & Findings</h4>
        <ul>
          <li><strong>Alert Fatigue Reduction:</strong> Custom filters cut down false-positive syslog triggers by 42%.</li>
          <li><strong>Pipeline Integrity:</strong> Handled an average volume of 450 events per second (EPS) without buffer packet losses.</li>
        </ul>
        
        <h4>4. Hardening & Remediation Recommendations</h4>
        <p>Enforce SSH public key authentication globally, restrict password login methods, and implement fail2ban agents on host systems to automatically feed threat logs back to the Wazuh core blocklist API.</p>
      `
    },
    vm: {
      tag: "PENTEST ASSESSMENT WORKSPACE REPORT",
      title: "Vulnerable VM Lab Construction & Exploit Sequence Design",
      classification: "RESTRICTED SECURITY SYLLABUS",
      target: "LAB-VULN-TARGET-VM",
      body: `
        <h4>1. Executive Summary</h4>
        <p>Documentation covering the design parameters of a custom vulnerable Virtual Machine. Built as a hands-on training asset for RedTeam Hacker Academy, demonstrating credential escalation paths.</p>
        
        <h4>2. Vulnerability Exploitation Scenario</h4>
        <p>Students must audit the VM using local scripts to locate security anomalies. The main escalation target revolves around a misconfigured cron task:</p>
        <div class="report-code-block">
# stat /etc/cron.d/sys_backup
File: /etc/cron.d/sys_backup
Access: (0777/-rwxrwxrwx)  Uid: ( 1002/admin)
Description: Global write execution permission.
        </div>
        
        <h4>3. Remediation Sequence</h4>
        <p>Students learn to remediate local configuration flaws by securing directory nodes and resetting ownership parameters to administrative users:</p>
        <div class="report-code-block">
# chown root:root /etc/cron.d/sys_backup
# chmod 644 /etc/cron.d/sys_backup
        </div>
        
        <h4>4. Educational Outcomes</h4>
        <p>Cohorts triaged the exploit sequence successfully, learning the impact of insecure permissions, file auditing procedures, and how local privilege escalation vectors occur.</p>
      `
    },
    lab: {
      tag: "DEFENSIVE TESTING RANGE ARCHITECTURE REPORT",
      title: "Self-Hosted SOC Lab Deployed with Elastic Stack & Suricata IDS",
      classification: "INTERNAL LAB DATA",
      target: "TEST-SOC-RANGE-01",
      body: `
        <h4>1. Executive Summary</h4>
        <p>Architectural report covering a private SOC research lab. Features a Suricata intrusion detection system configured on a virtualization interface, sending JSON telemetry logs to an Elastic database cluster.</p>
        
        <h4>2. Network Flow Mapping</h4>
        <p>The lab utilizes a virtual network interface mirroring switch traffic. Incident telemetry flows as follows:</p>
        <ul>
          <li><strong>Network Tap:</strong> Gathers raw packet payloads.</li>
          <li><strong>Suricata engine:</strong> Compiles threat events using Snort rules.</li>
          <li><strong>Filebeat agent:</strong> Forwards JSON events directly to Elasticsearch.</li>
          <li><strong>Kibana interface:</strong> Visualizes alerts for forensic review.</li>
        </ul>
        
        <h4>3. Kibana Search Query Filter Sample</h4>
        <div class="report-code-block">
event.dataset: "suricata.eve" AND suricata.eve.alert.signature: "SQL Injection"
        </div>
        
        <h4>4. Remediation Steps & Future Enhancements</h4>
        <p>Deploy elastic agent endpoints on target host endpoints to enable Sysmon auditing, allowing unified correlation between network logs and process actions.</p>
      `
    }
  };

  const openReportModal = (projectKey) => {
    const reportData = projectReports[projectKey];
    if (!reportData) return;

    playSound('click');
    reportModalTag.textContent = reportData.tag;
    reportModalTitle.textContent = reportData.title;
    reportModalClass.textContent = reportData.classification;
    reportModalTarget.textContent = reportData.target;
    reportModalBody.innerHTML = reportData.body;

    reportPanel.classList.add('open');
    reportOverlay.classList.add('visible');
    
    // Disables scrolling behind panel
    document.body.style.overflow = 'hidden';
  };

  const closeReportModal = () => {
    playSound('click');
    reportPanel.classList.remove('open');
    reportOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  // Bind trigger buttons
  document.querySelectorAll('.open-report').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectKey = e.currentTarget.getAttribute('data-project');
      openReportModal(projectKey);
    });
  });

  if (reportCloseBtn && reportOverlay) {
    reportCloseBtn.addEventListener('click', closeReportModal);
    reportOverlay.addEventListener('click', closeReportModal);
  }

  // --- ENCRYPTED MESSAGE GATEWAY ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playSound('click');

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      if (!name || !email || !message) {
        playSound('error');
        formStatus.textContent = "[-] Error: Missing values.";
        formStatus.style.color = 'var(--red)';
        return;
      }

      formStatus.textContent = "[*] Routing packet via mail gateway...";
      formStatus.style.color = 'var(--accent)';

      let count = 0;
      const encMessages = [
        "[*] Establishing TCP socket...",
        "[*] Encoding payload contents...",
        "[+] Success: Message sent successfully!"
      ];

      const interval = setInterval(() => {
        if (count >= encMessages.length) {
          clearInterval(interval);
          playSound('success');
          contactForm.reset();
          return;
        }
        playSound('type');
        formStatus.textContent = encMessages[count];
        if (count === encMessages.length - 1) {
          formStatus.style.color = 'var(--accent-secondary)';
        } else {
          formStatus.style.color = 'var(--accent)';
        }
        count++;
      }, 700);
    });
  }

  // --- SCROLL REVEAL OBSERVER ---
  const revealElements = document.querySelectorAll('.fade-in-scroll');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          if (entry.target.id === 'experience') {
            const glowLine = entry.target.querySelector('.timeline-glow');
            if (glowLine) {
              glowLine.style.height = '100%';
            }
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  }
});
