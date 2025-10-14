// Security Toolkit PRO - Premium Cybersecurity Tools
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadTools();
    setupEventListeners();
    console.log('🚀 Security Toolkit PRO Loaded');
}

// Tools Data with KSH Pricing
const toolsData = [
    {
        id: 1,
        name: "Advanced Port Scanner",
        icon: "🔍",
        category: "network",
        description: "Enterprise-grade network port scanning with service detection",
        features: [
            "TCP/UDP port scanning",
            "Service version detection", 
            "Export to CSV/JSON/PDF",
            "Custom port ranges",
            "Real-time results"
        ],
        price: "KSH 199",
        originalPrice: "KSH 399",
        locked: true,
        popular: true
    },
    {
        id: 2,
        name: "Network Analyzer Pro",
        icon: "🌐",
        category: "network", 
        description: "Comprehensive network analysis and traffic monitoring suite",
        features: [
            "Real-time packet analysis",
            "Bandwidth monitoring",
            "Network topology mapping",
            "Performance metrics dashboard",
            "Alert system"
        ],
        price: "KSH 299",
        originalPrice: "KSH 599",
        locked: true
    },
    {
        id: 3,
        name: "Hash Generator Pro",
        icon: "🔑",
        category: "crypto",
        description: "Advanced cryptographic hashing with verification",
        features: [
            "MD5, SHA1, SHA256, SHA512",
            "File hashing support", 
            "Hash verification",
            "Batch processing",
            "Rainbow table integration"
        ],
        price: "KSH 99",
        originalPrice: "KSH 199",
        locked: true
    },
    {
        id: 4,
        name: "Password Analyzer",
        icon: "🎯",
        category: "crypto",
        description: "Enterprise password strength testing and analysis",
        features: [
            "Password strength testing",
            "Common password detection",
            "Brute force time estimation", 
            "Security recommendations",
            "Policy compliance checking"
        ],
        price: "KSH 149",
        originalPrice: "KSH 299",
        locked: true
    },
    {
        id: 5,
        name: "XSS Scanner Pro",
        icon: "🛡",
        category: "web",
        description: "Advanced Cross-Site Scripting vulnerability detection",
        features: [
            "Automated XSS detection",
            "Payload generation",
            "Vulnerability reporting",
            "Remediation guidance",
            "False positive reduction"
        ],
        price: "KSH 249", 
        originalPrice: "KSH 499",
        locked: true,
        popular: true
    },
    {
        id: 6,
        name: "SQL Injection Tester",
        icon: "💉",
        category: "web",
        description: "Comprehensive SQL injection vulnerability testing suite",
        features: [
            "Automated SQLi detection",
            "Error-based and blind SQLi",
            "Parameter testing",
            "Security report generation",
            "Database fingerprinting"
        ],
        price: "KSH 299",
        originalPrice: "KSH 599",
        locked: true
    },
    {
        id: 7,
        name: "Forensic Analyzer Pro", 
        icon: "🔎",
        category: "forensic",
        description: "Professional digital forensic analysis toolkit",
        features: [
            "File system analysis",
            "Metadata extraction",
            "Timeline creation",
            "Evidence reporting",
            "Data recovery tools"
        ],
        price: "KSH 399",
        originalPrice: "KSH 799",
        locked: true
    },
    {
        id: 8,
        name: "Malware Detector Pro",
        icon: "🦠",
        category: "forensic",
        description: "Advanced malware detection and analysis platform",
        features: [
            "Signature-based detection",
            "Behavioral analysis", 
            "Sandbox testing",
            "Threat intelligence",
            "Incident response tools"
        ],
        price: "KSH 449",
        originalPrice: "KSH 899",
        locked: true,
        popular: true
    }
];

function loadTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    
    if (!toolsGrid) {
        console.error('Tools grid element not found!');
        return;
    }

    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="tool-card ${tool.locked ? 'locked' : ''}">
            ${tool.popular ? '<div class="bundle-badge" style="position: absolute; top: 15px; right: 15px; font-size: 0.8rem;">🔥 POPULAR</div>' : ''}
            <div class="tool-header">
                <div class="tool-icon">${tool.icon}</div>
                <div>
                    <div class="tool-title">${tool.name}</div>
                    ${tool.originalPrice ? <div style="color: #a0aec0; font-size: 0.9rem; text-decoration: line-through;">${tool.originalPrice}</div> : ''}
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <ul class="tool-features">
                ${tool.features.map(feature => <li>${feature}</li>).join('')}
            </ul>
            <button class="unlock-btn" onclick="showPaymentModal(${tool.id})">
                🔓 Unlock for ${tool.price}
            </button>
        </div>
    `).join('');
}

// FIXED: Make sure this function is available globally
window.showPaymentModal = function(toolId) {
    console.log('Button clicked for tool:', toolId);
    const tool = toolsData.find(t => t.id === toolId);
    
    if (!tool) {
        alert('Tool not found!');
        return;
    }

    const paymentId = generatePaymentId();
    
    const paymentContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">${tool.icon}</div>
            <h2 style="color: white; margin-bottom: 10px;">${tool.name}</h2>
            <p style="color: #a0aec0;">${tool.description}</p>
        </div>
        
        <div class="payment-option">
            <h3 style="color: white; margin-bottom: 20px;">💰 Unlock This Premium Tool</h3>
            
            <div style="background: linear-gradient(135deg, #FF6B35, #667eea); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <div style="font-size: 2.5rem; font-weight: 800; color: white;">${tool.price}</div>
                ${tool.originalPrice ? <div style="color: rgba(255,255,255,0.8); text-decoration: line-through; font-size: 1.2rem;">${tool.originalPrice}</div> : ''}
                <div style="color: #48bb78; font-weight: 600; margin-top: 5px;">One-time payment • Lifetime access</div>
            </div>
            
            <p><strong style="color: white;">Your Unique Payment ID:</strong></p>
            <div class="payment-id">${paymentId}</div>
            
            <h4 style="color: white; margin: 25px 0 15px 0;">📋 Payment Instructions:</h4>
            <ol style="text-align: left; color: #cbd5e0; line-height: 1.8;">
                <li>Send <strong style="color: white;">${tool.price}</strong> via <strong style="color: white;">M-Pesa</strong> to: <strong style="color: #FF6B35;">254117702463</strong></li>
                <li>Open <strong style="color: white;">WhatsApp</strong> and send this exact message to <strong style="color: #FF6B35;">254117702463</strong>:</li>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #FF6B35;">
                    <strong style="color: white;">Payment ID: ${paymentId}</strong><br>
                    <span style="color: #a0aec0;">Tool: ${tool.name}</span>
                </div>
                <li>We will activate your tool within <strong style="color: #48bb78;">15 minutes</strong> during business hours</li>
                <li>You'll receive confirmation email with access instructions</li>
            </ol>
            
            <button class="unlock-btn" onclick="copyToClipboard('${paymentId}')" style="margin-top: 20px; background: linear-gradient(135deg, #48bb78, #38a169);">
                📋 Copy Payment ID
            </button>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p style="color: #a0aec0; margin-bottom: 10px;"><strong>Powered by Kipkoech Emmanuel</strong></p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <a href="https://wa.me/254117702463" style="color: #FF6B35; text-decoration: none;">📱 WhatsApp Support</a>
                <a href="mailto:kipkoechryan@gmail.com" style="color: #FF6B35; text-decoration: none;">✉ Email Support</a>
            </div>
        </div>
    `;
    
    document.getElementById('paymentContent').innerHTML = paymentContent;
    document.getElementById('paymentModal').style.display = 'block';
}

// FIXED: Make sure this function is available globally
window.showBundleOffer = function() {
    console.log('Bundle button clicked!');
    const paymentId = generatePaymentId();
    const totalIndividual = toolsData.reduce((sum, tool) => sum + parseInt(tool.price.replace('KSH ', '')), 0);
    const bundlePrice = 499;
    const savings = totalIndividual - bundlePrice;
    
    const bundleContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">🎁</div>
            <h2 style="color: white; margin-bottom: 10px;">Complete Security Toolkit Bundle</h2>
            <p style="color: #a0aec0;">Get ALL 8 premium tools + future updates + priority support</p>
        </div>
        
        <div class="payment-option">
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: white;">KSH 499<span style="font-size: 1.2rem; color: rgba(255,255,255,0.8);">/month</span></div>
                <div style="color: #48bb78; font-weight: 600; font-size: 1.1rem; margin-top: 10px;">
                    Save KSH ${savings} (${Math.round((savings/totalIndividual)*100)}%) vs individual tools
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 600; color: white;">8 Tools</div>
                    <div style="color: #a0aec0; font-size: 0.9rem;">Premium Access</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 600; color: white;">24/7</div>
                    <div style="color: #a0aec0; font-size: 0.9rem;">Priority Support</div>
                </div>
            </div>
            
            <p><strong style="color: white;">Your Unique Payment ID:</strong></p>
            <div class="payment-id">${paymentId}</div>
            
            <h4 style="color: white; margin: 25px 0 15px 0;">📋 Bundle Payment Instructions:</h4>
            <ol style="text-align: left; color: #cbd5e0; line-height: 1.8;">
                <li>Send <strong style="color: white;">KSH 499</strong> via <strong style="color: white;">M-Pesa</strong> to: <strong style="color: #FF6B35;">254117702463</strong></li>
                <li>Open <strong style="color: white;">WhatsApp</strong> and send this exact message to <strong style="color: #FF6B35;">254117702463</strong>:</li>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #667eea;">
                    <strong style="color: white;">BUNDLE Payment ID: ${paymentId}</strong><br>
                    <span style="color: #a0aec0;">Complete Toolkit Access - Monthly</span>
                </div>
                <li>We will activate <strong style="color: #48bb78;">ALL 8 tools</strong> within 15 minutes</li>
                <li>You'll receive complete access confirmation email</li>
                <li><strong style="color: #48bb78;">Cancel anytime</strong> - No long-term commitment required</li>
            </ol>
            
            <button class="unlock-btn" onclick="copyToClipboard('${paymentId}')" style="margin-top: 20px; background: linear-gradient(135deg, #667eea, #764ba2);">
                📋 Copy Payment ID
            </button>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p style="color: #a0aec0;"><strong>Powered by Kipkoech Emmanuel</strong></p>
            <p style="color: #a0aec0; font-size: 0.9rem; margin-top: 10px;">WhatsApp: 254117702463 | Email: kipkoechryan@gmail.com</p>
        </div>
    `;
    
    document.getElementById('paymentContent').innerHTML = bundleContent;
    document.getElementById('paymentModal').style.display = 'block';
}

function generatePaymentId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'STK-';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// FIXED: Make sure this function is available globally
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Payment ID copied to clipboard! Paste it in your WhatsApp message.');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('✅ Payment ID copied to clipboard! Paste it in your WhatsApp message.');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #48bb78, #38a169);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// FIXED: Make sure this function is available globally
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupEventListeners() {
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('paymentModal').style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('paymentModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.getElementById('paymentModal').style.display = 'none';
        }
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// FIXED: Make all functions available globally
window.generatePaymentId = generatePaymentId;
window.showNotification = showNotification;
