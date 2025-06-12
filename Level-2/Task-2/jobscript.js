function searchJobs() {
  let input = document.getElementById('search').value.toLowerCase();
  let jobs = document.querySelectorAll('.job-card');

  jobs.forEach(job => {
    let title = job.innerText.toLowerCase();
    job.style.display = title.includes(input) ? 'block' : 'none';
  });
}
