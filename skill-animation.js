// Skill Bar Animation
document.addEventListener('DOMContentLoaded', function() {
  // Set a small timeout to ensure everything is loaded
  setTimeout(function() {
    // Get all skill elements
    const skills = document.querySelectorAll('.skill');

    skills.forEach(function(skill) {
      // Get the progress bar element
      const progressBar = skill.querySelector('.skill-progress');

      // Get the percentage span element
      const percentSpan = skill.querySelector('span');

      // Get the target percentage (removing the % symbol)
      const targetPercent = parseInt(percentSpan.textContent);

      // Reset percentage text to 0%
      percentSpan.textContent = '0%';

      // Ensure progress bar starts at 0% (CSS already sets width: 0%)
      // Drive the visual width from the target percentage so it matches the label
      // Using inline style will override any class-based fallback widths in CSS
      requestAnimationFrame(() => {
        progressBar.style.width = targetPercent + '%';
      });

      // Animate the percentage number from 0 to target value
      let startPercent = 0;
      const duration = 1500; // Match the 1.5s CSS transition
      const interval = 30; // Update interval in ms
      const steps = duration / interval;
      const increment = targetPercent / steps;

      const counter = setInterval(function() {
        startPercent += increment;

        // Round down to avoid going over target due to floating point errors
        const currentPercent = Math.min(Math.floor(startPercent), targetPercent);

        // Update the text
        percentSpan.textContent = currentPercent + '%';

        // Stop when we reach target
        if (currentPercent >= targetPercent) {
          clearInterval(counter);
          percentSpan.textContent = targetPercent + '%';
        }
      }, interval);
    });
  }, 300); // Small delay to ensure DOM is fully ready
});
