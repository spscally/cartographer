try {
    $be_job=$(node api/index.js &)
    npm --prefix frontend run start    
} finally {
    stop-job -id $be_job.id
    remove-job -id $be_job.id
}