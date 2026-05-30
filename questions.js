// 100 CompTIA Security+ (SY0-701) Practice Questions
// Used directly by Febin Sani's Portfolio Quiz engine

const SECURITY_PLUS_QUESTIONS = [
  {
    topic: "PORTS & PROTOCOLS",
    question: "Which of the following ports does the secure version of LDAP (LDAPS) run on by default?",
    options: ["A. TCP 389", "B. TCP 636", "C. UDP 161", "D. TCP 443"],
    correct: 1,
    feedback: "LDAP runs on TCP 389 by default, whereas Secure LDAP (LDAPS) runs on TCP 636."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which cryptographic algorithm is symmetric and utilizes block sizes of 128 bits?",
    options: ["A. AES", "B. RSA", "C. DES", "D. RC4"],
    correct: 0,
    feedback: "AES is a symmetric block cipher that uses a block size of 128 bits and key sizes of 128, 192, or 256 bits."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "A security analyst detects traffic targeting TCP port 22 from an external network. Which protocol is being targeted?",
    options: ["A. Telnet", "B. SSH", "C. RDP", "D. HTTP"],
    correct: 1,
    feedback: "TCP Port 22 is allocated to the Secure Shell (SSH) protocol, which provides encrypted terminal console sessions."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which of the following describes the time it takes to restore a system after a failure or disruption occurs?",
    options: ["A. RPO", "B. RTO", "C. MTTR", "D. ALE"],
    correct: 1,
    feedback: "Recovery Time Objective (RTO) is the maximum acceptable duration of time that a system can remain offline after a disaster."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which authentication protocol is open-source, uses JSON Web Tokens (JWT), and runs on top of OAuth 2.0?",
    options: ["A. SAML", "B. OpenID Connect (OIDC)", "C. LDAP", "D. Kerberos"],
    correct: 1,
    feedback: "OpenID Connect (OIDC) is an identity layer built on top of the OAuth 2.0 framework, leveraging JSON Web Tokens (JWT)."
  },
  {
    topic: "PORTS & PROTOCOLS",
    question: "An administrator needs to monitor network devices. Which protocol operates on UDP ports 161 and 162 to collect diagnostic data?",
    options: ["A. SNMP", "B. SMTP", "C. SFTP", "D. HTTPS"],
    correct: 0,
    feedback: "Simple Network Management Protocol (SNMP) operates on UDP 161 (polling) and UDP 162 (traps) to manage network nodes."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "A user reports receiving a phone call from 'IT support' asking for their password to resolve a sync issue. What type of attack is this?",
    options: ["A. Smishing", "B. Vishing", "C. Phishing", "D. Spear Phishing"],
    correct: 1,
    feedback: "Vishing (voice phishing) is a social engineering attack executed over telephone lines to harvest sensitive user credentials."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What hashing algorithm produces a 256-bit fixed-length output digest?",
    options: ["A. MD5", "B. SHA-1", "C. SHA-256", "D. HMAC"],
    correct: 2,
    feedback: "SHA-256 is a member of the SHA-2 cryptographic hash function family and generates a 256-bit (32-byte) message digest."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which security tool inspects incoming packets, compares them against signatures, and actively blocks traffic if a match is found?",
    options: ["A. IDS", "B. IPS", "C. Proxy Server", "D. Load Balancer"],
    correct: 1,
    feedback: "An Intrusion Prevention System (IPS) actively monitors network flows and blocks packets identified as malicious."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "A company calculates the financial loss of a single laptop theft. What risk assessment metric represents this value?",
    options: ["A. SLE", "B. ARO", "C. ALE", "D. EF"],
    correct: 0,
    feedback: "Single Loss Expectancy (SLE) represents the monetary loss expected from a single occurrence of a specific risk threat event."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which of the following access control models restricts access based on administrative security labels and clearances?",
    options: ["A. RBAC", "B. DAC", "C. MAC", "D. ABAC"],
    correct: 2,
    feedback: "Mandatory Access Control (MAC) enforces resource access policies based on object security labels and subject clearances."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker injects scripts into a legitimate website, which executes inside a target user's web browser. What attack is this?",
    options: ["A. SQL Injection", "B. Cross-Site Scripting (XSS)", "C. Buffer Overflow", "D. CSRF"],
    correct: 1,
    feedback: "Cross-Site Scripting (XSS) occurs when malicious client-side scripts are injected into web pages visited by target users."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which key exchange algorithm allows two parties to establish a shared secret key over an insecure channel without transmitting it?",
    options: ["A. RSA", "B. Diffie-Hellman", "C. AES", "D. blowfish"],
    correct: 1,
    feedback: "Diffie-Hellman key exchange is a method for securely generating a shared secret key across public network links."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which device distributes incoming network connections across a pool of redundant servers to ensure high availability?",
    options: ["A. Firewall", "B. DNS Server", "C. Load Balancer", "D. Gateway Router"],
    correct: 2,
    feedback: "Load balancers distribute user connection requests across web hosts, preventing single points of failure."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which risk response strategy involves purchasing an insurance policy to cover costs associated with potential data breaches?",
    options: ["A. Risk Mitigation", "B. Risk Avoidance", "C. Risk Transference", "D. Risk Acceptance"],
    correct: 2,
    feedback: "Risk Transference shifts the financial burden of an identified threat to a third party, such as an insurance carrier."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "What protocol operates on UDP port 1812 to provide centralized Authentication, Authorization, and Accounting (AAA) services?",
    options: ["A. TACACS+", "B. RADIUS", "C. LDAP", "D. SAML"],
    correct: 1,
    feedback: "RADIUS is a AAA protocol that utilizes UDP ports 1812 (authentication/authorization) and 1813 (accounting)."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What type of attack involves capturing credentials or cookies in transit to access a system session without re-authenticating?",
    options: ["A. Replay Attack", "B. Brute Force", "C. Downgrade Attack", "D. ARP Spoofing"],
    correct: 0,
    feedback: "A Replay Attack occurs when transmission packets are intercepted and re-transmitted to authenticate unauthorized sessions."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which asymmetric algorithm relies on the mathematical difficulty of factoring large prime numbers?",
    options: ["A. ECC", "B. AES", "C. RSA", "D. Blowfish"],
    correct: 2,
    feedback: "RSA is an asymmetric cipher whose security is derived from the difficulty of factoring the product of two large prime numbers."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which segment of a network hosts public-facing servers (like web servers) to isolate them from internal domain assets?",
    options: ["A. VPN Gateway", "B. Intranet Segment", "C. Demilitarized Zone (DMZ)", "D. Air-Gapped Network"],
    correct: 2,
    feedback: "A DMZ acts as a buffer zone, separating public-facing web servers from private internal network environments."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which policy defines the lifespan of data and guides how long record logs must be stored before safe deletion?",
    options: ["A. Acceptable Use Policy", "B. Data Retention Policy", "C. NDA Agreement", "D. Clean Desk Policy"],
    correct: 1,
    feedback: "Data Retention policies specify guidelines detailing storage durations for compliance data and audit logs."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which of the following is an example of 'something you are' in Multi-Factor Authentication?",
    options: ["A. Password", "B. Smart Card", "C. Fingerprint Scan", "D. OTP SMS Code"],
    correct: 2,
    feedback: "Biometric measures (fingerprints, retina scans) verify identity based on physical characteristics ('something you are')."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker changes DNS records on a recursive nameserver to redirect users to a fraudulent website. What attack is this?",
    options: ["A. DNS Poisoning", "B. IP Spoofing", "C. SQL Injection", "D. Domain Hijacking"],
    correct: 0,
    feedback: "DNS Cache Poisoning writes rogue IP mappings into DNS caches, redirecting domain requests to malicious hosts."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What term describes adding random data to password inputs before running a hashing algorithm to defeat rainbow tables?",
    options: ["A. Encryption", "B. Hashing", "C. Salting", "D. Key Stretching"],
    correct: 2,
    feedback: "Password Salting injects random strings into passwords before hashing, ensuring identical inputs yield unique digests."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures emails in transit using public keys and provides digital signatures for mail authentication?",
    options: ["A. IMAP", "B. POP3", "C. S/MIME", "D. SFTP"],
    correct: 2,
    feedback: "S/MIME encrypts and digitally signs email payloads using public-key cryptography standards."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "A system has an ALE of $10,000 and an ARO of 2. What is the calculated Single Loss Expectancy (SLE)?",
    options: ["A. $5,000", "B. $20,000", "C. $10,000", "D. $2,500"],
    correct: 0,
    feedback: "ALE = SLE * ARO. Therefore, SLE = ALE / ARO = $10,000 / 2 = $5,000."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which standard enables Federated Identity Management and Single Sign-On (SSO) by exchanging XML-based assertion tokens?",
    options: ["A. OAuth 2.0", "B. SAML", "C. OpenID", "D. LDAP"],
    correct: 1,
    feedback: "Security Assertion Markup Language (SAML) uses XML assertions to share authentication and authorization data across systems."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker intercepts communication between a client and server, modifying traffic in real-time. What type of attack is this?",
    options: ["A. DDoS Attack", "B. On-path (MitM) Attack", "C. Replay Attack", "D. Birthday Attack"],
    correct: 1,
    feedback: "An On-path (Man-in-the-Middle) attack occurs when threat actors intercept and modify session streams between host nodes."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which cryptographic concept ensures that changing one bit in the plaintext alters a majority of the ciphertext bits?",
    options: ["A. Confusion", "B. Hashing", "C. Diffusion", "D. Key Stretching"],
    correct: 2,
    feedback: "Diffusion distributes plaintext characteristics across the ciphertext, rendering mathematical analysis difficult."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures communication over web links using TLS on TCP port 443?",
    options: ["A. HTTP", "B. HTTPS", "C. SSH", "D. FTP"],
    correct: 1,
    feedback: "HTTPS uses TLS certificates to encrypt web traffic, running on TCP port 443 by default."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which document defines operational performance expectations and penalties between an enterprise and an IT service vendor?",
    options: ["A. MOU", "B. SLA", "C. NDA", "D. ISA"],
    correct: 1,
    feedback: "A Service Level Agreement (SLA) is a contract defining service parameters, reliability metrics, and response times."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which of the following utilizes a centralized ticket-granting service to provide Single Sign-On capabilities?",
    options: ["A. SAML", "B. LDAP", "C. Kerberos", "D. RADIUS"],
    correct: 2,
    feedback: "Kerberos uses a Key Distribution Center (KDC) to issue ticket-granting tickets (TGTs) for system authorization."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An organization suffers a breach after users click a link on a replica login portal. What threat vector is this?",
    options: ["A. Credential Harvesting", "B. Watering Hole", "C. Privilege Escalation", "D. Rogue Access Point"],
    correct: 0,
    feedback: "Credential Harvesting uses spoofed portals to collect user login credentials."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What term describes the property where a compromise of a private key does not compromise past session keys?",
    options: ["A. Perfect Forward Secrecy", "B. Key Stretching", "C. Symmetric Escrow", "D. Homomorphic Hashing"],
    correct: 0,
    feedback: "Perfect Forward Secrecy ensures session keys are generated independently for each socket link."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which type of firewall inspects traffic based on protocols, ports, and IP source addresses without tracking connection states?",
    options: ["A. Stateful Firewall", "B. Stateless (Packet Filter)", "C. WAF", "D. Next-Gen Firewall"],
    correct: 1,
    feedback: "Stateless firewalls filter packets individually based on headers, without tracking the overall TCP handshake state."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which assessment identifies critical business processes, dependencies, recovery timelines, and impacts of potential disasters?",
    options: ["A. Vulnerability Scan", "B. Risk Audit", "C. Business Impact Analysis (BIA)", "D. Threat Modeling"],
    correct: 2,
    feedback: "A BIA evaluates operational dependencies and calculates recovery thresholds (RTO/RPO)."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "What protocol runs over TCP port 389 to query directory service objects like users and domain computers?",
    options: ["A. DNS", "B. Active Directory", "C. LDAP", "D. TACACS+"],
    correct: 2,
    feedback: "The Lightweight Directory Access Protocol (LDAP) queries network directory objects on TCP port 389."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What attack exploits a trust relationship by compromising a website frequently visited by a target organization?",
    options: ["A. Whaling", "B. Spear Phishing", "C. Watering Hole", "D. Vishing"],
    correct: 2,
    feedback: "Watering Hole attacks target users by hosting exploits on websites they regularly visit."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which of the following standards is a cryptographic key storage mechanism embedded physically within host motherboard silicon?",
    options: ["A. TPM", "B. HSM", "C. PGP", "D. UEFI"],
    correct: 0,
    feedback: "The Trusted Platform Module (TPM) is a hardware chip that securely stores encryption keys, hashes, and certificates."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures administrative connections to switches and routers over port 22, replacing plaintext Telnet?",
    options: ["A. RDP", "B. SSH", "C. SSL", "D. HTTPS"],
    correct: 1,
    feedback: "SSH provides encrypted shell access on port 22, replacing unencrypted protocols like Telnet (port 23)."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which regulatory framework governs the protection of personal data and privacy for individuals in the European Union?",
    options: ["A. HIPAA", "B. GDPR", "C. PCI-DSS", "D. SOX"],
    correct: 1,
    feedback: "The General Data Protection Regulation (GDPR) regulates data privacy and security for EU residents."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which authorization standard permits user resource sharing with applications without exposing passwords (delegated access)?",
    options: ["A. SAML", "B. OAuth 2.0", "C. Kerberos", "D. RADIUS"],
    correct: 1,
    feedback: "OAuth 2.0 is an authorization framework that uses access tokens to delegate resource access to third-party apps."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An analyst discovers file changes on a server that execute malicious scripts only on Friday the 13th. What malware is this?",
    options: ["A. Trojan Horse", "B. Logic Bomb", "C. Spyware", "D. Ransomware"],
    correct: 1,
    feedback: "Logic bombs execute malicious code only when specific trigger conditions, such as dates or files, are met."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What key stretching function uses salting and repetitive hashing blocks, built on top of Blowfish cipher elements?",
    options: ["A. bcrypt", "B. PBKDF2", "C. SHA-2", "D. AES-GCM"],
    correct: 0,
    feedback: "bcrypt stretches password keys using salt and Blowfish block cipher routines to protect against brute-force attacks."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol resolves IP addresses to physical MAC addresses on a local subnet?",
    options: ["A. DNS", "B. ARP", "C. DHCP", "D. ICMP"],
    correct: 1,
    feedback: "The Address Resolution Protocol (ARP) translates IP addresses to local physical MAC addresses."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "What risk calculation metric represents the calculated financial loss expected from a specific risk over a one-year period?",
    options: ["A. SLE", "B. ARO", "C. ALE", "D. EF"],
    correct: 2,
    feedback: "Annualized Loss Expectancy (ALE) represents the expected annual financial impact of an identified risk."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which authentication standard is used in modern networks to exchange user identity claims using OAuth 2.0 JSON tokens?",
    options: ["A. SAML", "B. OIDC", "C. Kerberos", "D. LDAP"],
    correct: 1,
    feedback: "OpenID Connect (OIDC) is an authentication layer built on the OAuth 2.0 framework."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker spoofing ARP packets maps their MAC address to a gateway IP on a local network. What attack is this?",
    options: ["A. DNS Poisoning", "B. ARP Poisoning", "C. IP Spoofing", "D. Session Hijacking"],
    correct: 1,
    feedback: "ARP Poisoning associates an attacker's MAC address with a legitimate IP, facilitating on-path data interception."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which cryptographic standard provides verification that a message was sent by the sender and was not modified in transit?",
    options: ["A. Hashing", "B. Symmetric Encryption", "C. Digital Signature", "D. Key Exchange"],
    correct: 2,
    feedback: "Digital Signatures use a sender's private key to provide authenticity, integrity, and non-repudiation."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which firewall type filters traffic at the application layer (Layer 7) and blocks SQL injections or XSS payloads?",
    options: ["A. Stateful Firewall", "B. Stateless Firewall", "C. Web Application Firewall (WAF)", "D. VPN Concentrator"],
    correct: 2,
    feedback: "WAFs inspect application-layer payloads to block threats like SQL injection and cross-site scripting (XSS)."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which policy outlines appropriate usage guidelines for enterprise IT resources and workstations?",
    options: ["A. Acceptable Use Policy (AUP)", "B. SLA Agreement", "C. Incident Response Plan", "D. Change Management Policy"],
    correct: 0,
    feedback: "An AUP defines rules and guidelines for employee use of company-owned hardware and network infrastructure."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which control model allows resource owners to manage file access permissions for specific users?",
    options: ["A. MAC", "B. DAC", "C. RBAC", "D. ABAC"],
    correct: 1,
    feedback: "Discretionary Access Control (DAC) lets the resource owner configure access permissions for other users."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "A script tries thousands of common word combinations to decrypt password hashes. What attack is this?",
    options: ["A. Dictionary Attack", "B. Replay Attack", "C. Birthday Attack", "D. Downgrade Attack"],
    correct: 0,
    feedback: "Dictionary attacks run lists of pre-compiled words and passwords against target hashes to find matches."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What term describes a cryptography system where public keys are stored, managed, and verified using Certificate Authorities?",
    options: ["A. PKI", "B. PGP", "C. AES", "D. TPM"],
    correct: 0,
    feedback: "Public Key Infrastructure (PKI) binds public keys to identities using Certificate Authorities (CAs)."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol translates private IP addresses to a single public IP to route traffic to the internet?",
    options: ["A. DNS", "B. DHCP", "C. NAT", "D. ARP"],
    correct: 2,
    feedback: "Network Address Translation (NAT) maps private IP addresses to a public IP to conserve address space."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "What metric represents the average duration of time a system operates before encountering a hardware failure?",
    options: ["A. MTTR", "B. MTBF", "C. RTO", "D. RPO"],
    correct: 1,
    feedback: "Mean Time Between Failures (MTBF) measures the average operational time of a system before a failure occurs."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "What protocol runs over TCP port 636 to secure directory queries with SSL/TLS certificates?",
    options: ["A. LDAP", "B. LDAPS", "C. Kerberos", "D. Active Directory"],
    correct: 1,
    feedback: "LDAPS encrypts directory communications using SSL/TLS, running on TCP port 636."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What social engineering tactic targets high-level corporate executives to harvest sensitive company credentials?",
    options: ["A. Spear Phishing", "B. Whaling", "C. Vishing", "D. Tailgating"],
    correct: 1,
    feedback: "Whaling is a spear-phishing variant that specifically targets C-level executives."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which of the following standards distributes and checks digital certificate revocation lists in real-time?",
    options: ["A. OCSP", "B. CRL", "C. PGP", "D. CSR"],
    correct: 0,
    feedback: "Online Certificate Status Protocol (OCSP) queries CA systems in real-time to verify certificate status."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol resolves readable domain names to numerical IP addresses?",
    options: ["A. DHCP", "B. DNS", "C. ARP", "D. NAT"],
    correct: 1,
    feedback: "The Domain Name System (DNS) maps human-readable domain names to their corresponding IP addresses."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which framework governs the handling and storage of payment card data to prevent financial fraud?",
    options: ["A. HIPAA", "B. SOC 2", "C. PCI-DSS", "D. ISO 27001"],
    correct: 2,
    feedback: "The Payment Card Industry Data Security Standard (PCI-DSS) regulates organizations handling credit cards."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which authentication factor uses context-aware parameters like GPS location or time of day?",
    options: ["A. Something you know", "B. Something you have", "C. Somewhere you are", "D. Something you do"],
    correct: 2,
    feedback: "Location-based authentication verifies requests based on geographic context ('somewhere you are')."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker floods a target web server with TCP synchronization requests to consume memory resources. What attack is this?",
    options: ["A. SYN Flood", "B. Buffer Overflow", "C. SQL Injection", "D. Replay Attack"],
    correct: 0,
    feedback: "SYN Floods consume host server connection tables by leaving TCP handshakes in a half-open state."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which encryption type uses different keys for encryption and decryption?",
    options: ["A. Symmetric", "B. Hashing", "C. Asymmetric", "D. Stream Cipher"],
    correct: 2,
    feedback: "Asymmetric cryptography utilizes public keys for encryption and private keys for decryption."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol dynamically assigns IP addresses, subnet masks, and gateways to client hosts on startup?",
    options: ["A. DNS", "B. DHCP", "C. ARP", "D. NAT"],
    correct: 1,
    feedback: "DHCP automates network configuration by assigning dynamic IP addresses to connecting clients."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which of the following defines the maximum acceptable age of data files that must be restored from backup storage after a disruption?",
    options: ["A. RTO", "B. RPO", "C. MTTR", "D. ALE"],
    correct: 1,
    feedback: "Recovery Point Objective (RPO) defines the maximum acceptable data loss measured in time."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "What term describes user authentication in one domain granting access to resources in other trusted domains?",
    options: ["A. Single Sign-On", "B. Identity Federation", "C. Directory Queries", "D. Access Delegation"],
    correct: 1,
    feedback: "Federation shares user authentication credentials and tokens across different trusted domains."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What attack vector targets users by scanning for open ports and vulnerable protocols on local wireless networks?",
    options: ["A. Evil Twin", "B. Bluesnarfing", "C. Wardriving", "D. RFID Cloning"],
    correct: 2,
    feedback: "Wardriving involves mapping wireless access points while driving through an area."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What asymmetric algorithm relies on the algebraic structure of elliptic curves over finite fields?",
    options: ["A. ECC", "B. RSA", "C. AES", "D. DES"],
    correct: 0,
    feedback: "Elliptic Curve Cryptography (ECC) provides strong security with smaller key sizes compared to RSA."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures directory lookups, preventing fake zone records, by digitally signing zone files?",
    options: ["A. DNSSEC", "B. LDAPS", "C. IPsec", "D. SSH"],
    correct: 0,
    feedback: "DNS Security Extensions (DNSSEC) verify DNS record integrity using digital signatures."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "What document describes changes, testing procedures, and rollback plans before deploying code to production systems?",
    options: ["A. Change Log", "B. SLA Contract", "C. Change Management Plan", "D. Acceptable Use Policy"],
    correct: 2,
    feedback: "Change Management policies govern the lifecycle of system changes to minimize service disruptions."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which access control model evaluates permissions based on dynamic criteria like time of day, location, and device type?",
    options: ["A. RBAC", "B. DAC", "C. ABAC", "D. MAC"],
    correct: 2,
    feedback: "Attribute-Based Access Control (ABAC) grants access based on user, resource, and environmental attributes."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker appends `' OR 1=1 --` to a web input field. What attack is this?",
    options: ["A. SQL Injection (SQLi)", "B. Cross-Site Scripting (XSS)", "C. Buffer Overflow", "D. Session Hijacking"],
    correct: 0,
    feedback: "Appending `' OR 1=1` modifies SQL query logic to bypass login screens or expose database data."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What term describes public-key certificates binding identities to cryptographic keys?",
    options: ["A. Digital Certificate", "B. Symmetric Token", "C. Hash Digest", "D. Key Exchange"],
    correct: 0,
    feedback: "Digital Certificates bind user or host identities to public keys, verified by a Certificate Authority."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures IP traffic at the network layer, providing encryption and authentication tunnels?",
    options: ["A. SSL/TLS", "B. SSH", "C. IPsec", "D. HTTPS"],
    correct: 2,
    feedback: "IPsec secures IP packets at the network layer, commonly used to build secure VPN tunnels."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which of the following standards protects healthcare patient data and privacy in the United States?",
    options: ["A. GDPR", "B. HIPAA", "C. PCI-DSS", "D. SOX"],
    correct: 1,
    feedback: "HIPAA regulates the security and privacy of Protected Health Information (PHI) in the US."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which authentication factor leverages smart cards or hardware tokens?",
    options: ["A. Something you know", "B. Something you have", "C. Something you are", "D. Somewhere you are"],
    correct: 1,
    feedback: "Smart cards and hardware tokens serve as possession factors ('something you have') in authentication."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What attack leverages collision vulnerabilities to find two different inputs that produce the same hash?",
    options: ["A. Replay Attack", "B. Birthday Attack", "C. Downgrade Attack", "D. Dictionary Attack"],
    correct: 1,
    feedback: "The Birthday Attack exploits probability mathematics to find hashing collisions."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What symmetric cipher encrypts data one bit or byte at a time?",
    options: ["A. Block Cipher", "B. Stream Cipher", "C. Asymmetric Cipher", "D. Hashing function"],
    correct: 1,
    feedback: "Stream ciphers encrypt plaintext digits sequentially, rather than in block sizes."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol automatically configures local routing parameters on host endpoints?",
    options: ["A. DHCP", "B. DNS", "C. ARP", "D. NAT"],
    correct: 0,
    feedback: "DHCP dynamically configures IP configurations, gateways, and DNS servers on client systems."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "What risk calculation evaluates the average frequency of a specific risk occurring in a year?",
    options: ["A. SLE", "B. ARO", "C. ALE", "D. EF"],
    correct: 1,
    feedback: "Annualized Rate of Occurrence (ARO) is the estimated frequency of a threat event occurring in a year."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which access model defines permissions based on job roles or department assignments?",
    options: ["A. MAC", "B. DAC", "C. RBAC", "D. ABAC"],
    correct: 2,
    feedback: "Role-Based Access Control (RBAC) assigns access permissions to job roles rather than individual accounts."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker intercepts a session token and uses it to impersonate a logged-in user. What attack is this?",
    options: ["A. Session Hijacking", "B. Replay Attack", "C. ARP Poisoning", "D. SQL Injection"],
    correct: 0,
    feedback: "Session hijacking involves stealing session tokens to bypass authentication."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which hashing algorithm generates a 128-bit digest and is legacy (not recommended for secure hashing)?",
    options: ["A. SHA-256", "B. MD5", "C. SHA-1", "D. Blowfish"],
    correct: 1,
    feedback: "MD5 is a legacy hashing algorithm that is highly vulnerable to collision attacks."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol verifies outbound emails, proving they came from authorized senders, using DNS records?",
    options: ["A. SPF", "B. S/MIME", "C. IMAP", "D. SMTP"],
    correct: 0,
    feedback: "Sender Policy Framework (SPF) lists authorized sending hosts in DNS records to prevent email spoofing."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "What metric calculates the average time it takes to repair a failed system and restore it to service?",
    options: ["A. MTBF", "B. MTTR", "C. RTO", "D. RPO"],
    correct: 1,
    feedback: "Mean Time to Repair (MTTR) represents the average time required to troubleshoot and repair a failed component."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which factor in multi-factor authentication includes swipe patterns or keystroke dynamics?",
    options: ["A. Something you do", "B. Something you know", "C. Something you have", "D. Something you are"],
    correct: 0,
    feedback: "Behavioral characteristics like typing speeds or gestures fall under 'something you do'."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "What social engineering tactic involves following an authorized employee through a secure doorway?",
    options: ["A. Spear Phishing", "B. Tailgating", "C. Dumpster Diving", "D. Vishing"],
    correct: 1,
    feedback: "Tailgating involves closely following an authorized person to gain access to a restricted area."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What term describes a trusted list of revoked certificates published by a Certificate Authority?",
    options: ["A. OCSP", "B. CRL", "C. CSR", "D. PGP"],
    correct: 1,
    feedback: "A Certificate Revocation List (CRL) is a list of certificates revoked by the CA before their expiration date."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol resolves MAC physical address locations to IP logical mappings on local networks?",
    options: ["A. ARP", "B. DNS", "C. DHCP", "D. NAT"],
    correct: 0,
    feedback: "ARP matches local logical IP addresses to physical hardware MAC addresses."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which framework governs controls for service organizations managing client data security and confidentiality?",
    options: ["A. HIPAA", "B. SOC 2", "C. PCI-DSS", "D. GDPR"],
    correct: 1,
    feedback: "SOC 2 evaluates security, availability, processing integrity, confidentiality, and privacy controls at service organizations."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "Which access model assigns file read permissions based on department tags and location variables?",
    options: ["A. MAC", "B. DAC", "C. ABAC", "D. RBAC"],
    correct: 2,
    feedback: "Attribute-Based Access Control (ABAC) uses attribute tags (department, location) to make access decisions."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker injects scripts that execute in other users' browsers when they view a stored forum post. What attack is this?",
    options: ["A. Reflected XSS", "B. Stored (Persistent) XSS", "C. SQL Injection", "D. DOM-based XSS"],
    correct: 1,
    feedback: "Stored XSS embeds malicious scripts permanently in a database, executing when users view the contaminated page."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "Which symmetric block cipher supports key sizes of 128, 192, and 256 bits, replacing the legacy DES standard?",
    options: ["A. AES", "B. RSA", "C. Diffie-Hellman", "D. MD5"],
    correct: 0,
    feedback: "AES is a secure symmetric block cipher that replaced the insecure DES standard."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol secures remote command-line interfaces by default on port 22?",
    options: ["A. Telnet", "B. SSH", "C. RDP", "D. HTTPS"],
    correct: 1,
    feedback: "SSH provides encrypted console access on port 22, replacing unencrypted Telnet sessions (port 23)."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which metric calculates data loss tolerances (measured in time) when configuring system backup schedules?",
    options: ["A. RTO", "B. RPO", "C. MTTR", "D. MTBF"],
    correct: 1,
    feedback: "Recovery Point Objective (RPO) dictates backup frequencies by defining acceptable data loss limits in time."
  },
  {
    topic: "IDENTITY & ACCESS",
    question: "What authentication protocol uses Key Distribution Centers and Ticket-Granting Services to enable Single Sign-On?",
    options: ["A. SAML", "B. LDAP", "C. Kerberos", "D. OIDC"],
    correct: 2,
    feedback: "Kerberos uses a ticket system (TGT) to provide secure SSO capabilities in Active Directory environments."
  },
  {
    topic: "THREATS & ATTACKS",
    question: "An attacker sends malicious emails disguised as alerts from a CEO to target accountants. What attack is this?",
    options: ["A. Vishing", "B. Whaling", "C. Spear Phishing", "D. Tailgating"],
    correct: 2,
    feedback: "Spear phishing targets specific individuals or departments, often using impersonation to steal data."
  },
  {
    topic: "CRYPTOGRAPHY",
    question: "What standard provides real-time certificate status checks without requiring download updates of revocation files?",
    options: ["A. OCSP", "B. CRL", "C. PGP", "D. CSR"],
    correct: 0,
    feedback: "Online Certificate Status Protocol (OCSP) queries certificate status in real-time, reducing bandwidth compared to CRLs."
  },
  {
    topic: "NETWORK ARCHITECTURE",
    question: "Which protocol matches human-readable website domains to destination IP addresses?",
    options: ["A. DHCP", "B. DNS", "C. ARP", "D. NAT"],
    correct: 1,
    feedback: "The Domain Name System (DNS) resolves text-based website domains to numerical routing IP addresses."
  },
  {
    topic: "GOVERNANCE & RISK",
    question: "Which framework governs the handling and storage of cardholder data to prevent payment fraud?",
    options: ["A. HIPAA", "B. GDPR", "C. PCI-DSS", "D. SOC 2"],
    correct: 2,
    feedback: "PCI-DSS governs security controls at organizations processing payment card data."
  }
];
