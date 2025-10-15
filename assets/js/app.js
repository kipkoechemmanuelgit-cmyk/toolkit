// Security Toolkit Pro - Simple and Guaranteed Working
console.log('🚀 Security Toolkit Pro loading...');

// Tools Data
const toolsData = [
    {
        id: 1,
        name: "Port Scanner Pro",
        icon: "🔍",
        description: "Advanced network port scanning with real-time results",
        features: ["TCP/UDP port scanning", "Service detection", "Export results", "Custom port ranges"],
        price: "KSH 199",
        locked: true
    },
    {
        id: 2,
        name: "Network Analyzer",
        icon: "🌐",
        description: "Comprehensive network analysis and traffic monitoring",
        features: ["Packet analysis", "Bandwidth monitoring", "Network mapping", "Performance metrics"],
        price: "KSH 299",
        locked: true
    },
    {
        id: 3,
        name: "Hash Generator",
        icon: "🔑",
        description: "Cryptographic hashing with verification tools",
        features: ["MD5, SHA1, SHA256", "File hashing", "Hash verification", "Batch processing"],
        price: "KSH 99",
        locked: true
    },
    {
        id: 4,
        name: "XSS Scanner",
        icon: "🛡",
        description: "Advanced Cross-Site Scripting vulnerability detection",
        features: ["Automated scanning", "Payload generation", "Vulnerability reports", "Remediation tips"],
        price: "KSH 249",
        locked: true
    },
    {
        id: 5,
        name: "SQL Injection Tester",
        icon: "💉",
        description: "Comprehensive SQL injection vulnerability testing",
        features: ["Error-based detection", "Blind SQLi testing", "Parameter testing", "Security reports"],
        price: "KSH 299",
        locked: true
    },
    {
        id: 6,
        name: "Forensic Analyzer",
        icon: "🔎",
        description: "Digital forensic analysis and evidence collection",
        features: ["File system analysis", "Metadata extraction", "Timeline creation", "Evidence reporting"],
        price: "KSH 399",
        locked: true
    },
    {
        id: 7,
        name: "Malware Detector",
        icon: "🦠",
        description: "Advanced malware detection and analysis",
        features: ["Signature scanning", "Behavioral analysis", "Sandbox testing", "Threat intelligence"],
        price: "KSH 449",
        locked: true
    },
    {
        id: 8,
        name: "Password Analyzer",
        icon: "🎯",
        description: "Enterprise password strength testing and analysis",
        features: ["Password strength testing", "Common password detection", "Brute force estimation", "Security recommendations"],
        price: "KSH 149",
        locked: true
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    loadTools();
    setupEventListeners();
    console.log('✅ App initialized successfully!');
}

function loadTools() {
    console.log('🛠 Loading tools...');
    const toolsGrid = document.getElementById('toolsGrid');
    
    if (!toolsGrid) {
        console.error('❌ Tools grid not found!');
        return;
    }

    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="tool-card">
            <div class="tool-header">
                <div class="tool-icon">${tool.icon}</div>
                <div class="tool-title">${tool.name}</div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <ul class="tool-features">
                ${tool.features.map(feature => <li>${feature}</li>).join('')}
            </ul>
            <button class="unlock-btn" data-tool-id="${tool.id}">
                🔓 Unlock for ${tool.price}
            </button>
        </div>
    `).join('');

    console.log('✅ Tools loaded successfully');
}

function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Tool unlock buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('unlock-btn')) {
            const toolId = event.target.getAttribute('data-tool-id');
            if (toolId) {
                showPaymentModal(parseInt(toolId));
            }
        }
    });

    // Bundle button
    const bundleBtn = document.getElementById('bundleBtn');
    if (bundleBtn) {
        bundleBtn.addEventListener('click', showBundleOffer);
        console.log('✅ Bundle button listener added');
    } else {
        console.error('❌ Bundle button not found!');
    }

    // Demo button
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', showToolsDemo);
        console.log('✅ Demo button listener added');
    }

    // Modal close buttons
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', hidePaymentModal);
        console.log('✅ Close modal listener added');
    }

    const closeDemoModal = document.getElementById('closeDemoModal');
    if (closeDemoModal) {
        closeDemoModal.addEventListener('click', hideDemoModal);
        console.log('✅ Close demo modal listener added');
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const paymentModal = document.getElementById('paymentModal');
        const demoModal = document.getElementById('demoModal');
        
        if (event.target === paymentModal) {
            hidePaymentModal();
        }
        if (event.target === demoModal) {
            hideDemoModal();
        }
    });

    console.log('✅ All event listeners setup complete');
}

function showPaymentModal(toolId) {
    console.log('💰 Showing payment modal for tool:', toolId);
    const tool = toolsData.find(t => t.id === toolId);
    
    if (!tool) {
        console.error('❌ Tool not found:', toolId);
        return;
    }

    const paymentId = generatePaymentId();
    const paymentContent = document.getElementById('paymentContent');
    
    if (!paymentContent) {
        console.error('❌ Payment content element not found!');
        return;
    }

    const whatsappMessage = encodeURIComponent(Hi! I want to purchase ${tool.name} for ${tool.price}. Payment ID: ${paymentId});
    
    paymentContent.innerHTML = `
        <h2>${tool.icon} ${tool.name}</h2>
        <p>${tool.description}</p>
        
        <div class="payment-option">
            <h3>Unlock Premium Tool</h3>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2rem; font-weight: 800; color: #FF6B35;">${tool.price}</div>
                <div style="color: #a0aec0;">One-time payment • Lifetime access</div>
            </div>
            
            <p><strong>Your Payment ID:</strong></p>
            <div class="payment-id">${paymentId}</div>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/254117702463?text=${whatsappMessage}" class="whatsapp-btn" target="_blank" style="display: inline-block; margin: 10px;">
                    💬 Purchase on WhatsApp
                </a>
                <button class="unlock-btn" onclick="copyToClipboard('${paymentId}')" style="margin: 10px;">
                    📋 Copy Payment ID
                </button>
            </div>
            
            <p><strong>Payment Instructions:</strong></p>
            <ol style="color: #a0aec0; line-height: 1.6; padding-left: 20px;">
                <li>Send <strong>${tool.price}</strong> via M-Pesa to: <strong style="color: #FF6B35;">254117702463</strong></li>
                <li>Click "Purchase on WhatsApp" or send Payment ID manually</li>
                <li>We'll activate your tool within 15 minutes</li>
                <li>You'll receive confirmation email</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #a0aec0;">
            <p><strong>Powered by Kipkoech Emmanuel</strong></p>
            <p>Prefer direct chat? <a href="https://wa.me/254117702463" style="color: #25D366;">Click here to open WhatsApp</a></p>
        </div>
    `;

    showModal();
    console.log('✅ Payment modal shown successfully');
}

function showBundleOffer() {
    console.log('🎁 Showing bundle offer');
    const paymentId = generatePaymentId();
    const paymentContent = document.getElementById('paymentContent');
    
    if (!paymentContent) {
        console.error('❌ Payment content element not found!');
        return;
    }

    const whatsappMessage = encodeURIComponent(Hi! I want to purchase the Complete Toolkit Bundle for KSH 499/month. Payment ID: ${paymentId});
    
    paymentContent.innerHTML = `
        <h2>🎁 Complete Toolkit Bundle</h2>
        <p>Get ALL 8 premium tools + unlimited access</p>
        
        <div class="payment-option">
            <h3>Special Bundle Offer</h3>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2.5rem; font-weight: 800; color: #FF6B35;">KSH 499</div>
                <div style="color: #48bb78; font-weight: 600;">Save 60% vs individual tools</div>
            </div>
            
            <p><strong>Your Payment ID:</strong></p>
            <div class="payment-id">${paymentId}</div>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/254117702463?text=${whatsappMessage}" class="whatsapp-btn" target="_blank" style="display: inline-block; margin: 10px;">
                    💬 Get Bundle on WhatsApp
                </a>
                <button class="unlock-btn" onclick="copyToClipboard('${paymentId}')" style="margin: 10px;">
                    📋 Copy Payment ID
                </button>
            </div>
            
            <p><strong>What you get:</strong></p>
            <ul style="color: #a0aec0; line-height: 1.6;">
                <li>✅ All 8 premium tools unlocked</li>
                <li>✅ Unlimited usage and exports</li>
                <li>✅ Priority WhatsApp support</li>
                <li>✅ Early access to new tools</li>
                <li>✅ Cancel anytime</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #a0aec0;">
            <p><strong>Powered by Kipkoech Emmanuel</strong></p>
            <p>Best value - Get all tools at 60% discount</p>
        </div>
    `;

    showModal();
    console.log('✅ Bundle offer shown successfully');
}

function showToolsDemo() {
    console.log('🎬 Showing tools demo');
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
        demoModal.style.display = 'block';
    }
}

function hideDemoModal() {
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
        demoModal.style.display = 'none';
    }
}

function showModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hidePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function generatePaymentId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'STK-';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Global function for copy to clipboard
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Payment ID copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Payment ID copied to clipboard!');
    });
};

// Make functions globally available
window.showPaymentModal = showPaymentModal;
window.showBundleOffer = showBundleOffer;
window.hidePaymentModal = hidePaymentModal;
window.showToolsDemo = showToolsDemo;
window.hideDemoModal = hideDemoModal;

console.log('🎉 Security Toolkit Pro ready! All functions are available.');