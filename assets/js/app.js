// SecurityChat Pro - Real-time Messaging & Security Tools
class SecurityChatApp {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.isConnected = false;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.loadTools();
        this.setupEventListeners();
        this.setupServiceWorker();
        this.setupInstallPrompt();
        this.showLoginModal();
    }

    // Socket.IO Real-time Messaging
    connectToChat(username) {
        // For demo purposes, we'll simulate real-time messaging
        // In production, you'd connect to a real Socket.IO server
        this.socket = {
            emit: (event, data) => {
                console.log('Emitting:', event, data);
                this.handleLocalMessage(data);
            },
            on: (event, callback) => {
                console.log('Listening to:', event);
            }
        };

        this.currentUser = {
            id: this.generateId(),
            username: username,
            joinedAt: new Date()
        };

        this.isConnected = true;
        this.updateUI();
        this.addSystemMessage(${username} joined the chat);
    }

    handleLocalMessage(data) {
        if (data.type === 'message') {
            this.displayMessage({
                id: this.generateId(),
                username: data.username,
                text: data.text,
                timestamp: new Date(),
                type: 'other'
            });
        }
    }

    sendMessage(text) {
        if (!this.isConnected || !text.trim()) return;

        const messageData = {
            id: this.generateId(),
            username: this.currentUser.username,
            text: text.trim(),
            timestamp: new Date(),
            type: 'own'
        };

        this.displayMessage(messageData);
        
        // Simulate other users responding
        setTimeout(() => {
            this.simulateResponse(text);
        }, 1000 + Math.random() * 3000);
    }

    simulateResponse(userMessage) {
        const responses = [
            "That's a great point! I've been using the port scanner tool and it's amazing.",
            "Has anyone tried the bundle package? Is it worth it?",
            "I need help with network analysis. Any tips?",
            "The SQL injection tester saved me last week!",
            "Just unlocked the malware detector. Works like a charm!",
            "Anyone available for a security audit collaboration?",
            "The real-time chat feature is so useful for quick help!",
            "I recommend the bundle - all tools + messaging is perfect."
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        this.displayMessage({
            id: this.generateId(),
            username: 'SecurityPro_' + Math.floor(Math.random() * 1000),
            text: randomResponse,
            timestamp: new Date(),
            type: 'other'
        });

        this.updateOnlineUsers();
    }

    displayMessage(message) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageElement = document.createElement('div');
        messageElement.className = message ${message.type};
        messageElement.innerHTML = `
            <div class="message-sender">${message.username}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-time">${this.formatTime(message.timestamp)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addSystemMessage(text) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageElement = document.createElement('div');
        messageElement.className = 'message system';
        messageElement.style.cssText = `
            align-self: center;
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-light);
            font-style: italic;
            text-align: center;
            max-width: 80%;
        `;
        messageElement.textContent = text;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    updateOnlineUsers() {
        const usersList = document.getElementById('usersList');
        const onlineCount = document.getElementById('onlineCount');
        
        // Simulate online users
        const simulatedUsers = [
            'CyberSec_Expert',
            'NetworkGuard',
            'CodeProtector',
            'DataShield',
            this.currentUser.username
        ].filter((user, index, array) => array.indexOf(user) === index);

        onlineCount.textContent = simulatedUsers.length;
        
        usersList.innerHTML = simulatedUsers.map(user => `
            <div class="user-item">
                <div class="user-avatar"></div>
                <div class="user-name">${user}</div>
            </div>
        `).join('');
    }

    updateUI() {
        const usernameDisplay = document.getElementById('usernameDisplay');
        const loginBtn = document.getElementById('loginBtn');
        
        if (this.isConnected && this.currentUser) {
            usernameDisplay.textContent = this.currentUser.username;
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = () => this.logout();
        } else {
            usernameDisplay.textContent = 'Guest';
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => this.showLoginModal();
        }
    }

    logout() {
        this.isConnected = false;
        this.currentUser = null;
        this.socket = null;
        this.updateUI();
        this.showLoginModal();
    }

    // Tools Management
    loadTools() {
        const toolsGrid = document.getElementById('toolsGrid');
        const toolsData = this.getToolsData();

        toolsGrid.innerHTML = toolsData.map(tool => `
            <div class="tool-card ${tool.locked ? 'locked' : ''}">
                <div class="tool-header">
                    <div class="tool-icon">${tool.icon}</div>
                    <div class="tool-title">${tool.name}</div>
                </div>
                <p class="tool-description">${tool.description}</p>
                <ul class="tool-features">
                    ${tool.features.map(feature => <li>${feature}</li>).join('')}
                </ul>
                <button class="btn-primary" onclick="securityChat.showPaymentModal(${tool.id})">
                    🔓 Unlock for ${tool.price}
                </button>
            </div>
        `).join('');
    }

    getToolsData() {
        return [
            {
                id: 1,
                name: "Port Scanner Pro",
                icon: "🔍",
                description: "Advanced network port scanning with real-time results",
                features: ["TCP/UDP scanning", "Service detection", "Export results"],
                price: "KSH 199",
                locked: true
            },
            {
                id: 2,
                name: "Network Analyzer",
                icon: "🌐",
                description: "Comprehensive network analysis and monitoring",
                features: ["Packet analysis", "Traffic monitoring", "Performance metrics"],
                price: "KSH 299",
                locked: true
            },
            {
                id: 3,
                name: "Hash Generator",
                icon: "🔑",
                description: "Cryptographic hashing with verification",
                features: ["Multiple algorithms", "File hashing", "Batch processing"],
                price: "KSH 99",
                locked: true
            },
            {
                id: 4,
                name: "XSS Scanner",
                icon: "🛡",
                description: "Advanced Cross-Site Scripting vulnerability detection",
                features: ["Automated scanning", "Payload generation", "Reports"],
                price: "KSH 249",
                locked: true
            }
        ];
    }

    // Payment System
    showPaymentModal(toolId) {
        const tool = this.getToolsData().find(t => t.id === toolId);
        if (!tool) return;

        const paymentId = this.generatePaymentId();
        const paymentContent = document.getElementById('paymentContent');
        
        paymentContent.innerHTML = `
            <h2>${tool.icon} ${tool.name}</h2>
            <p>${tool.description}</p>
            
            <div class="payment-option">
                <h3>Unlock Tool + Chat Access</h3>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${tool.price}</div>
                    <div style="color: var(--text-light);">One-time payment • Lifetime access</div>
                </div>
                
                <p><strong>Payment ID:</strong></p>
                <div class="payment-id">${paymentId}</div>
                
                <p><strong>Instructions:</strong></p>
                <ol style="text-align: left; color: var(--text-light); line-height: 1.6;">
                    <li>Send ${tool.price} via M-Pesa to: <strong>254117702463</strong></li>
                    <li>WhatsApp this code: <strong>${paymentId}</strong></li>
                    <li>We'll activate within 15 minutes</li>
                </ol>
                
                <button class="btn-primary" onclick="securityChat.copyToClipboard('${paymentId}')" style="width: 100%; margin-top: 15px;">
                    📋 Copy Payment ID
                </button>
            </div>
        `;

        this.showModal('paymentModal');
    }

    showBundleOffer() {
        const paymentId = this.generatePaymentId();
        const paymentContent = document.getElementById('paymentContent');
        
        paymentContent.innerHTML = `
            <h2>🎁 Complete Bundle</h2>
            <p>All tools + Unlimited messaging + Priority support</p>
            
            <div class="payment-option">
                <h3>Full Platform Access</h3>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">KSH 499</div>
                    <div style="color: var(--success); font-weight: 600;">Save 60% vs individual tools</div>
                </div>
                
                <p><strong>Payment ID:</strong></p>
                <div class="payment-id">${paymentId}</div>
                
                <p><strong>What you get:</strong></p>
                <ul style="text-align: left; color: var(--text-light); line-height: 1.6;">
                    <li>✅ All security tools unlocked</li>
                    <li>✅ Unlimited real-time messaging</li>
                    <li>✅ Priority technical support</li>
                    <li>✅ Early access to new features</li>
                    <li>✅ Cancel anytime</li>
                </ul>
                
                <button class="btn-primary" onclick="securityChat.copyToClipboard('${paymentId}')" style="width: 100%; margin-top: 15px;">
                    📋 Copy Payment ID
                </button>
            </div>
        `;

        this.showModal('paymentModal');
    }

    // Utility Functions
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    generatePaymentId() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = 'STK-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('✅ Payment ID copied to clipboard!');
        });
    }

    showNotification(message) {
        // Simple notification implementation
        alert(message);
    }

    // UI Management
    showLoginModal() {
        this.showModal('loginModal');
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    switchSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    joinChat() {
        const usernameInput = document.getElementById('usernameInput');
        const username = usernameInput.value.trim();
        
        if (!username) {
            alert('Please enter a username');
            return;
        }

        if (username.length < 3) {
            alert('Username must be at least 3 characters');
            return;
        }

        this.connectToChat(username);
        this.closeModal('loginModal');
        this.updateOnlineUsers();
    }

    // PWA Features
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    showInstallPrompt() {
        const installPrompt = document.getElementById('installPrompt');
        installPrompt.style.display = 'block';
    }

    closeInstallPrompt() {
        const installPrompt = document.getElementById('installPrompt');
        installPrompt.style.display = 'none';
    }

    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                this.closeInstallPrompt();
            }
            
            this.deferredPrompt = null;
        }
    }

    setupEventListeners() {
        // Message sending
        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        const sendMessage = () => {
            this.sendMessage(messageInput.value);
            messageInput.value = '';
        };

        sendMessageBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Install app
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.addEventListener('click', () => this.installApp());
        }

        // Close modals on outside click
        window.addEventListener('click', (event) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
}

// Global functions for HTML onclick attributes
function switchSection(sectionId) {
    securityChat.switchSection(sectionId);
}

function showBundleOffer() {
    securityChat.showBundleOffer();
}

function joinChat() {
    securityChat.joinChat();
}

function closeModal(modalId) {
    securityChat.closeModal(modalId);
}

function closeInstallPrompt() {
    securityChat.closeInstallPrompt();
}

// Initialize the app
let securityChat;
document.addEventListener('DOMContentLoaded', function() {
    securityChat = new SecurityChatApp();
});
