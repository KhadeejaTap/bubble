// Fetch sessions from get_sessions.php
fetch('../php/get_sessions.php')
  .then(res => res.json())
  .then(sessions => {
    // Extract labels (dates) and values (seconds)
    const labels = sessions.map(s => s.date);
    const data = sessions.map(s => (s.seconds / 60).toFixed(1)); // convert to minutes

    // Create bar chart
    const ctx = document.getElementById('focusChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Focus Time (minutes)',
          data: data,
          backgroundColor: 'rgba(80, 86, 118, 0.7)',
          borderColor: 'rgba(80, 86, 118, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  })
  .catch(err => console.error('Error loading chart data:', err));
