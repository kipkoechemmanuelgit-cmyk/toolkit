// SecureChat App - Simple Messaging & Security Tools
class SecureChatApp {
    constructor() {
        this.messages = [];
        this.currentUser = 'You';
        this.isConnected = true;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        console.log('🚀 Initializing SecureChat...');
        this.setupEventListeners();
        this.setupServiceWorker();
        this.setupInstallPrompt();
        this.loadSampleMessages();
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Get Started Button
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.showChatScreen();
            });
        }

        // Tools Button
        const toolsBtn = document.getElementById('toolsBtn');
        if (toolsBtn) {
            toolsBtn.addEventListener('click', () => {
                this.showToolsModal();
            });
        }

        // Send Message
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        if (sendBtn && messageInput) {
            const sendMessage = () => {
                const text = messageInput.value.trim();
                if (text) {
                    this.sendMessage(text);
                    messageInput.value = '';
                }
            };

            sendBtn.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        // Close Modals
        const closeToolsBtn = document.getElementById('closeToolsBtn');
        if (closeToolsBtn) {
            closeToolsBtn.addEventListener('click', () => {
                this.hideToolsModal();
            });
        }

        const closePaymentBtn = document.getElementById('closePaymentBtn');
        if (closePaymentBtn) {
            closePaymentBtn.addEventListener('click', () => {
                this.hidePaymentModal();
            });
        }

        // Tool Buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = e.target.getAttribute('data-tool');
                this.showPaymentModal(tool);
            });
        });

        // Bottom Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.closest('.nav-btn').getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Install Prompt
        const installBtn = document.getElementById('installBtn');
        const dismissInstallBtn = document.getElementById('dismissInstallBtn');
        
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                this.installApp();
            });
        }
        
        if (dismissInstallBtn) {
            dismissInstallBtn.addEventListener('click', () => {
                this.hideInstallPrompt();
            });
        }

        console.log('✅ Event listeners setup complete');
    }

    showChatScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatScreen = document.getElementById('chatScreen');
        
        if (welcomeScreen && chatScreen) {
            welcomeScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
        }
    }

    sendMessage(text) {
        if (!text.trim()) return;

        // Add user message
        this.addMessage(this.currentUser, text, 'sent');
        
        // Simulate reply after 1-3 seconds
        setTimeout(() => {
            this.simulateReply(text);
        }, 1000 + Math.random() * 2000);
    }

    simulateReply(userMessage) {
        const replies = [
            "Hey! How's it going?",
            "I've been using the security tools here, they're amazing!",
            "Did you try the port scanner? It's super accurate.",
            "The bundle deal is totally worth it for all the tools.",
            "I need help with a network scan, are you available?",
            "This chat app is so smooth! Love the design.",
            "Just unlocked the XSS scanner. Works like a charm!",
            "We should collaborate on a security project sometime."
        ];

        const randomName = ['Alex', 'Sarah', 'Mike', 'Emma', 'Jordan'][Math.floor(Math.random() * 5)];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        this.addMessage(randomName, randomReply, 'received');
    }

    addMessage(sender, text, type) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = message ${type};
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            ${type === 'received' ? <div class="message-sender">${sender}</div> : ''}
            <div class="message-text">${text}</div>
            <div class="message-time">${time}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to messages array
        this.messages.push({ sender, text, type, time });
    }

    loadSampleMessages() {
        // Add some sample messages to make it feel alive
        setTimeout(() => {
            this.addMessage('SecurityBot', 'Welcome to SecureChat! Type a message to start chatting.', 'received');
        }, 1000);
    }

    showToolsModal() {
        const toolsModal = document.getElementById('toolsModal');
        if (toolsModal) {
            toolsModal.style.display = 'block';
        }
    }

    hideToolsModal() {
        const toolsModal = document.getElementById('toolsModal');
        if (toolsModal) {
            toolsModal.style.display = 'none';
        }
    }

    showPaymentModal(tool) {
        const tools = {
            'port-scanner': { name: 'Port Scanner', price: 'KSH 199' },
            'network-analyzer': { name: 'Network Analyzer', price: 'KSH 299' },
            'hash-generator': { name: 'Hash Generator', price: 'KSH 99' },
            'xss-scanner': { name: 'XSS Scanner', price: 'KSH 249' },
            'bundle': { name: 'Complete Bundle', price: 'KSH 499' }
        };

        const selectedTool = tools[tool];
        if (!selectedTool) return;

        const paymentId = this.generatePaymentId();
        const paymentModal = document.getElementById('paymentModal');
        const paymentTitle = document.getElementById('paymentTitle');
        const paymentContent = document.getElementById('paymentContent');

        if (paymentTitle) {
            paymentTitle.textContent = Unlock ${selectedTool.name};
        }

        if (paymentContent) {
            paymentContent.innerHTML = `
                <div class="payment-info">
                    <div class="payment-amount">${selectedTool.price}</div>
                    <div class="payment-description">${selectedTool.name} - One Time Payment</div>
                    <div class="payment-id">${paymentId}</div>
                    <button class="primary-btn" id="copyPaymentBtn">Copy Payment ID</button>
                </div>
                <div class="payment-steps">
                    <h4>Payment Instructions:</h4>
                    <ol>
                        <li>Send <strong>${selectedTool.price}</strong> via M-Pesa to <strong>254117702463</strong></li>
                        <li>WhatsApp the Payment ID: <strong>${paymentId}</strong></li>
                        <li>We'll activate your tool within 15 minutes</li>
                        <li>You'll receive confirmation and access instructions</li>
                    </ol>
                </div>
            `;

            // Add copy functionality
            const copyBtn = document.getElementById('copyPaymentBtn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    this.copyToClipboard(paymentId);
                });
            }
        }

        if (paymentModal) {
            paymentModal.style.display = 'block';
            this.hideToolsModal();
        }
    }

    hidePaymentModal() {
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) {
            paymentModal.style.display = 'none';
        }
    }

    switchTab(tab) {
        // Update active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector([data-tab="${tab}"]);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Handle tab content
        if (tab === 'tools') {
            this.showToolsModal();
        }
        // Add other tab handlers as needed
    }

    generatePaymentId() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = 'STK-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('✅ Payment ID copied!');
        }).catch(() => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('✅ Payment ID copied!');
        });
    }

    showNotification(message) {
        // Simple notification
        alert(message);
    }

    // PWA Features
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered');
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        window.addEventListener('appinstalled', () => {
            console.log('✅ App installed successfully');
            this.hideInstallPrompt();
            this.deferredPrompt = null;
        });
    }

    showInstallPrompt() {
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) {
            installPrompt.style.display = 'block';
        }
    }

    hideInstallPrompt() {
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
                console.log('✅ User accepted the install prompt');
                this.hideInstallPrompt();
            }
            
            this.deferredPrompt = null;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.secureChat = new SecureChatApp();
    console.log('🎉 SecureChat app initialized successfully!');
});

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const toolsModal = document.getElementById('toolsModal');
    const paymentModal = document.getElementById('paymentModal');
    
    if (toolsModal && event.target === toolsModal) {
        toolsModal.style.display = 'none';
    }
    
    if (paymentModal && event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});
