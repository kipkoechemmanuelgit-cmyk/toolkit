// SecurityChat Pro - Real-time Messaging & Security Tools
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    window.securityChat = new SecurityChatApp();
});

class SecurityChatApp {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.isConnected = false;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        console.log('🚀 Initializing SecurityChat Pro...');
        this.loadTools();
        this.setupEventListeners();
        this.setupServiceWorker();
        this.setupInstallPrompt();
        this.showLoginModal();
    }

    // Socket.IO Real-time Messaging
    connectToChat(username) {
        console.log('Connecting to chat as:', username);
        
        // For demo purposes, we'll simulate real-time messaging
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
        this.updateOnlineUsers();
        
        console.log('✅ Successfully connected to chat');
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
        console.log('Sending message:', text);
        if (!this.isConnected || !text.trim()) {
            console.log('❌ Cannot send message - not connected or empty');
            return;
        }

        const messageData = {
            id: this.generateId(),
            username: this.currentUser.username,
            text: text.trim(),
            timestamp: new Date(),
            type: 'own'
        };

        this.displayMessage(messageData);
        
        // Clear input
        document.getElementById('messageInput').value = '';
        
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
        if (!messagesContainer) {
            console.error('❌ messagesContainer not found');
            return;
        }

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
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message system';
        messageElement.style.cssText = `
            align-self: center;
            background: rgba(255, 255, 255, 0.1);
            color: #a0aec0;
            font-style: italic;
            text-align: center;
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 10px;
        `;
        messageElement.textContent = text;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    updateOnlineUsers() {
        const usersList = document.getElementById('usersList');
        const onlineCount = document.getElementById('onlineCount');
        
        if (!usersList || !onlineCount) return;

        // Simulate online users
        const simulatedUsers = [
            'CyberSec_Expert',
            'NetworkGuard',
            'CodeProtector',
            'DataShield',
            ...(this.currentUser ? [this.currentUser.username] : [])
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
        
        if (!usernameDisplay || !loginBtn) return;

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
        console.log('Logging out...');
        this.isConnected = false;
        this.currentUser = null;
        this.socket = null;
        this.updateUI();
        this.showLoginModal();
        this.addSystemMessage('You left the chat');
    }

    // Tools Management
    loadTools() {
        const toolsGrid = document.getElementById('toolsGrid');
        if (!toolsGrid) {
            console.error('❌ toolsGrid not found');
            return;
        }

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
                <button class="btn-primary" data-tool-id="${tool.id}">
                    🔓 Unlock for ${tool.price}
                </button>
            </div>
        `).join('');

        // Add event listeners to tool buttons
        toolsGrid.querySelectorAll('[data-tool-id]').forEach(button => {
            button.addEventListener('click', (e) => {
                const toolId = parseInt(e.target.getAttribute('data-tool-id'));
                this.showPaymentModal(toolId);
            });
        });
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
        console.log('Showing payment modal for tool:', toolId);
        const tool = this.getToolsData().find(t => t.id === toolId);
        if (!tool) {
            console.error('❌ Tool not found:', toolId);
            return;
        }

        const paymentId = this.generatePaymentId();
        const paymentContent = document.getElementById('paymentContent');
        
        if (!paymentContent) {
            console.error('❌ paymentContent not found');
            return;
        }

        paymentContent.innerHTML = `
            <h2>${tool.icon} ${tool.name}</h2>
            <p>${tool.description}</p>
            
            <div class="payment-option">
                <h3>Unlock Tool + Chat Access</h3>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 2rem; font-weight: 800; color: #FF6B35;">${tool.price}</div>
                    <div style="color: #a0aec0;">One-time payment • Lifetime access</div>
                </div>
                
                <p><strong>Payment ID:</strong></p>
                <div class="payment-id">${paymentId}</div>
                
                <p><strong>Instructions:</strong></p>
                <ol style="text-align: left; color: #a0aec0; line-height: 1.6;">
                    <li>Send ${tool.price} via M-Pesa to: <strong>254117702463</strong></li>
                    <li>WhatsApp this code: <strong>${paymentId}</strong></li>
                    <li>We'll activate within 15 minutes</li>
                </ol>
                
                <button class="btn-primary" id="copyPaymentBtn" style="width: 100%; margin-top: 15px;">
                    📋 Copy Payment ID
                </button>
            </div>
        `;

        // Add event listener to copy button
        const copyBtn = document.getElementById('copyPaymentBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyToClipboard(paymentId);
            });
        }

        this.showModal('paymentModal');
    }

    showBundleOffer() {
        console.log('Showing bundle offer');
        const paymentId = this.generatePaymentId();
        const paymentContent = document.getElementById('paymentContent');
        
        if (!paymentContent) {
            console.error('❌ paymentContent not found');
            return;
        }

        paymentContent.innerHTML = `
            <h2>🎁 Complete Bundle</h2>
            <p>All tools + Unlimited messaging + Priority support</p>
            
            <div class="payment-option">
                <h3>Full Platform Access</h3>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 2.5rem; font-weight: 800; color: #FF6B35;">KSH 499</div>
                    <div style="color: #48bb78; font-weight: 600;">Save 60% vs individual tools</div>
                </div>
                
                <p><strong>Payment ID:</strong></p>
                <div class="payment-id">${paymentId}</div>
                
                <p><strong>What you get:</strong></p>
                <ul style="text-align: left; color: #a0aec0; line-height: 1.6;">
                    <li>✅ All security tools unlocked</li>
                    <li>✅ Unlimited real-time messaging</li>
                    <li>✅ Priority technical support</li>
                    <li>✅ Early access to new features</li>
                    <li>✅ Cancel anytime</li>
                </ul>
                
                <button class="btn-primary" id="copyBundleBtn" style="width: 100%; margin-top: 15px;">
                    📋 Copy Payment ID
                </button>
            </div>
        `;

        // Add event listener to copy button
        const copyBtn = document.getElementById('copyBundleBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyToClipboard(paymentId);
            });
        }

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
        }).catch((err) => {
            console.error('❌ Failed to copy:', err);
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('✅ Payment ID copied to clipboard!');
        });
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // UI Management
    showLoginModal() {
        this.showModal('loginModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error('❌ Modal not found:', modalId);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    switchSection(sectionId) {
        console.log('Switching to section:', sectionId);
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error('❌ Section not found:', sectionId);
        }
    }

    joinChat() {
        const usernameInput = document.getElementById('usernameInput');
        if (!usernameInput) {
            console.error('❌ usernameInput not found');
            return;
        }

        const username = usernameInput.value.trim();
        
        if (!username) {
            this.showNotification('Please enter a username');
            return;
        }

        if (username.length < 3) {
            this.showNotification('Username must be at least 3 characters');
            return;
        }

        this.connectToChat(username);
        this.closeModal('loginModal');
    }

    // PWA Features
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('✅ SW registered'))
                .catch(error => console.log('❌ SW registration failed:', error));
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
        if (installPrompt) {
            installPrompt.style.display = 'block';
        }
    }

    closeInstallPrompt() {
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) {
            installPrompt.style.display = 'none';
        }
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
        console.log('Setting up event listeners...');
        
        // Message sending
        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        if (messageInput && sendMessageBtn) {
            const sendMessage = () => {
                this.sendMessage(messageInput.value);
            };

            sendMessageBtn.addEventListener('click', sendMessage);
            
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        } else {
            console.error('❌ Message input elements not found');
        }

        // Install app
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.addEventListener('click', () => this.installApp());
        }

        // Bundle button
        const bundleBtn = document.querySelector('.bundle-content .btn-primary');
        if (bundleBtn) {
            bundleBtn.addEventListener('click', () => this.showBundleOffer());
        }

        // Section switching buttons
        const openChatBtn = document.querySelector('[onclick*="chatSection"]');
        const backToToolsBtn = document.querySelector('[onclick*="toolsSection"]');
        
        if (openChatBtn) {
            openChatBtn.addEventListener('click', () => this.switchSection('chatSection'));
        }
        if (backToToolsBtn) {
            backToToolsBtn.addEventListener('click', () => this.switchSection('toolsSection'));
        }

        // Modal close buttons
        const closeModalBtns = document.querySelectorAll('.close, [onclick*="closeModal"]');
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close modals on outside click
        window.addEventListener('click', (event) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Login form
        const loginForm = document.querySelector('#loginModal input');
        if (loginForm) {
            loginForm.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.joinChat();
                }
            });
        }

        console.log('✅ Event listeners setup complete');
    }
}

// Global functions for HTML onclick attributes
window.switchSection = function(sectionId) {
    if (window.securityChat) {
        window.securityChat.switchSection(sectionId);
    }
}

window.showBundleOffer = function() {
    if (window.securityChat) {
        window.securityChat.showBundleOffer();
    }
}

window.joinChat = function() {
    if (window.securityChat) {
        window.securityChat.joinChat();
    }
}

window.closeModal = function(modalId) {
    if (window.securityChat) {
        window.securityChat.closeModal(modalId);
    }
}

window.closeInstallPrompt = function() {
    if (window.securityChat) {
        window.securityChat.closeInstallPrompt();
    }
}

// Make functions available globally
window.securityChatApp = SecurityChatApp;
