document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // SIDEBAR FUNCTIONALITY
    // =============================================
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    // Desktop sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            body.classList.toggle('sidebar-collapsed');
        });
    }
    
    // Mobile sidebar toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            body.classList.toggle('sidebar-open');
        });
    }
    
    // Mobile overlay close
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            body.classList.remove('sidebar-open');
        });
    }
    
    // Responsive behavior - auto-collapse on small screens
    function checkWidth() {
        if (window.innerWidth < 992) {
            body.classList.remove("sidebar-collapsed");
        }
    }
    
    window.addEventListener("resize", checkWidth);
    checkWidth(); // Initial check on load

    // =============================================
    // PERFORMANCE CHARTS
    // =============================================
    
    // Performance Trends Line Chart
    const trendsCtx = document.getElementById('performanceTrendsChart');
    if (trendsCtx) {
        new Chart(trendsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Impressions',
                    data: [250000, 310000, 290000, 350000, 420000, 380000, 450000, 520000],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                // Format large numbers (K/M)
                                if (value >= 1000000) return (value/1000000).toFixed(1) + 'M';
                                if (value >= 1000) return (value/1000).toFixed(0) + 'K';
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Platform Distribution Doughnut Chart
    const platformCtx = document.getElementById('platformChart');
    if (platformCtx) {
        new Chart(platformCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Instagram', 'Twitter', 'YouTube', 'TikTok'],
                datasets: [{
                    data: [42, 28, 18, 12],
                    backgroundColor: ['#4361ee', '#3498db', '#e74c3c', '#2ecc71'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '70%'
            }
        });
    }

    // Age Distribution Bar Chart
    const ageCtx = document.getElementById('ageChart');
    if (ageCtx) {
        new Chart(ageCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['18-24', '25-34', '35-44', '45+'],
                datasets: [{
                    data: [35, 45, 15, 5],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.8)',
                        'rgba(67, 97, 238, 0.6)',
                        'rgba(67, 97, 238, 0.4)',
                        'rgba(67, 97, 238, 0.2)'
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: v => v + '%' }
                    }
                }
            }
        });
    }

    // Gender Distribution Pie Chart
    const genderCtx = document.getElementById('genderChart');
    if (genderCtx) {
        new Chart(genderCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Female', 'Male', 'Other'],
                datasets: [{
                    data: [68, 30, 2],
                    backgroundColor: ['#4361ee', '#3498db', '#e74c3c'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    // =============================================
    // CONTACTS SIDEBAR FUNCTIONALITY
    // =============================================
    const contactsToggle = document.getElementById('contacts-toggle');
    const contactsOverlay = document.querySelector('.contacts-overlay');
    
    // Toggle contacts sidebar
    if (contactsToggle) {
        contactsToggle.addEventListener('click', () => {
            body.classList.toggle('contacts-open');
        });
    }
    
    // Close contacts sidebar via overlay
    if (contactsOverlay) {
        contactsOverlay.addEventListener('click', () => {
            body.classList.remove('contacts-open');
        });
    }
    
    // Contact items selection
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            contactItems.forEach(contact => contact.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            // Close sidebar on mobile
            body.classList.remove('contacts-open');
        });
    });

    // =============================================
    // UI COMPONENTS INITIALIZATION
    // =============================================
    
    // Initialize Bootstrap tooltips
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipElements.length > 0) {
        tooltipElements.forEach(el => new bootstrap.Tooltip(el));
    }
    
    // Initialize date range pickers
    const datePickers = [
        { id: "#dateRange", default: [new Date().setDate(new Date().getDate() - 30), new Date()] },
        { id: "#reportDateRange", default: [new Date().setDate(new Date().getDate() - 30), new Date()] }
    ];
    
    datePickers.forEach(picker => {
        const element = document.querySelector(picker.id);
        if (element) {
            flatpickr(element, {
                mode: "range",
                dateFormat: "Y-m-d",
                defaultDate: picker.default
            });
        }
    });

    // =============================================
    // ROI ANALYTICS CHARTS
    // =============================================
    
    // ROI Trends Line Chart
    const roiTrendsCtx = document.getElementById('roiTrendsChart');
    if (roiTrendsCtx) {
        new Chart(roiTrendsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'ROI %',
                        data: [240, 255, 270, 265, 280, 290, 285, 295, 300, 310, 315, 320],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Industry Average',
                        data: [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275],
                        borderColor: '#6c757d',
                        borderDash: [5, 5],
                        tension: 0.3,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                    y: {
                        min: 200,
                        ticks: { callback: v => v + '%' }
                    }
                }
            }
        });
    }

    // Platform ROI Doughnut Chart
    const platformRoiCtx = document.getElementById('platformRoiChart');
    if (platformRoiCtx) {
        new Chart(platformRoiCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Instagram', 'Twitter', 'YouTube', 'TikTok'],
                datasets: [{
                    data: [310, 245, 285, 325],
                    backgroundColor: ['#4361ee', '#4cc9f0', '#f72585', '#4ade80'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                cutout: '70%'
            }
        });
    }

    // Content Type ROI Bar Chart
    const contentTypeRoiCtx = document.getElementById('contentTypeRoiChart');
    if (contentTypeRoiCtx) {
        new Chart(contentTypeRoiCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Video Content', 'Image Posts', 'Live Streams', 'Stories/Reels'],
                datasets: [{
                    label: 'ROI %',
                    data: [340, 265, 295, 315],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.7)',
                        'rgba(76, 201, 240, 0.7)',
                        'rgba(247, 37, 133, 0.7)',
                        'rgba(74, 222, 128, 0.7)'
                    ],
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: v => v + '%' }
                    }
                }
            }
        });
    }

    // Age Group ROI Horizontal Bar Chart
    const ageGroupRoiCtx = document.getElementById('ageGroupRoiChart');
    if (ageGroupRoiCtx) {
        new Chart(ageGroupRoiCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['18-24', '25-34', '35-44', '45+'],
                datasets: [{
                    label: 'ROI %',
                    data: [325, 300, 250, 222],
                    backgroundColor: 'rgba(67, 97, 238, 0.7)',
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { 
                        beginAtZero: true,
                        ticks: { callback: v => v + '%' }
                    }
                }
            }
        });
    }

    // Location ROI Polar Area Chart
    const locationRoiCtx = document.getElementById('locationRoiChart');
    if (locationRoiCtx) {
        new Chart(locationRoiCtx.getContext('2d'), {
            type: 'polarArea',
            data: {
                labels: ['North America', 'Europe', 'Asia Pacific', 'Other Regions'],
                datasets: [{
                    data: [300, 280, 260, 208],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.7)',
                        'rgba(76, 201, 240, 0.7)',
                        'rgba(74, 222, 128, 0.7)',
                        'rgba(247, 37, 133, 0.7)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    // ROI Forecast Line Chart
    const roiForecastCtx = document.getElementById('roiForecastChart');
    if (roiForecastCtx) {
        new Chart(roiForecastCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Projected ROI',
                        data: [320, 325, 330, 335, 340, 345],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Actual ROI',
                        data: [320, 325, 330, null, null, null],
                        borderColor: '#4ade80',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                    y: {
                        min: 300,
                        ticks: { callback: v => v + '%' }
                    }
                }
            }
        });
    }

    // =============================================
    // CHAT WIDGET FUNCTIONALITY
    // =============================================
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        const startChatBtn = document.getElementById('startChatBtn');
        const startChatBtn2 = document.getElementById('startChatBtn2');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const chatInput = document.getElementById('chatInput');
        const sendChatBtn = document.getElementById('sendChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        
        // Open chat widget
        [startChatBtn, startChatBtn2].forEach(btn => {
            if (btn) btn.addEventListener('click', () => chatWidget.style.display = 'flex');
        });
        
        // Close chat widget
        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', () => {
                chatWidget.style.display = 'none';
            });
        }
        
        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            chatMessages.innerHTML += `
                <div class="message user-message">
                    <div class="message-content">
                        <p>${message}</p>
                        <small class="text-muted">You â€¢ Just now</small>
                    </div>
                </div>
            `;
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                chatMessages.innerHTML += `
                    <div class="message support-message">
                        <div class="message-content">
                            <p>Thanks for your message! Our support team will respond shortly.</p>
                            <small class="text-muted">Support Agent â€¢ Just now</small>
                        </div>
                    </div>
                `;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
        
        // Send message events
        if (sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
        if (chatInput) {
            chatInput.addEventListener('keypress', e => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }
});