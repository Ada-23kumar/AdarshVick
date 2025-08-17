function generateProfileImage() {
    const canvas = document.getElementById('profileCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Profile Photo', 200, 180);
    ctx.font = '16px Arial';
    ctx.fillText('Professional Headshot', 200, 210);
    ctx.fillText('400x400px', 200, 230);
}

function generateAITrackerImage() {
    const canvas = document.getElementById('aiTrackerCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 400, 250);
    
    // AI-themed elements
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(50, 50, 300, 150);
    
    // Circuit-like pattern
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.stroke();
    
    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AI Social Media Tracker', 200, 200);
    ctx.font = '14px Arial';
    ctx.fillText('Machine Learning & NLP', 200, 220);
}

function generateRoboticArmImage() {
    const canvas = document.getElementById('roboticArmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 400, 250);
    
    // Robotic arm segments
    ctx.fillStyle = '#64748b';
    ctx.fillRect(150, 50, 20, 100);
    ctx.fillRect(170, 70, 20, 80);
    ctx.fillRect(190, 90, 20, 60);
    
    // Joints
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(160, 150, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(180, 150, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Color-Sorting Robotic Arm', 200, 200);
    ctx.font = '14px Arial';
    ctx.fillText('ROS 2 & Computer Vision', 200, 220);
}

function generateWasteManagementImage() {
    const canvas = document.getElementById('wasteManagementCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, 0, 400, 250);
    
    // Waste bins
    ctx.fillStyle = '#10b981';
    ctx.fillRect(100, 100, 60, 80);
    ctx.fillRect(170, 100, 60, 80);
    ctx.fillRect(240, 100, 60, 80);
    
    // Bin lids
    ctx.fillStyle = '#047857';
    ctx.fillRect(100, 90, 60, 20);
    ctx.fillRect(170, 90, 60, 20);
    ctx.fillRect(240, 90, 60, 20);
    
    // Route lines
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(350, 200);
    ctx.stroke();
    
    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Waste Management Optimization', 200, 230);
}

function downloadImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    link.click();
}

// Generate all images on page load
window.onload = function() {
    generateProfileImage();
    generateAITrackerImage();
    generateRoboticArmImage();
    generateWasteManagementImage();
};
