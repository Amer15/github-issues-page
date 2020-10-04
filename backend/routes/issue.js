const express = require('express');
const router = express.Router();
const { 
getAllIssues, 
getIssueById, 
addIssue, 
updateIssue,
deleteIssue,
updateIssueState } = require('../controllers/issue.controller');

//ROUTES
router.get('/issues', getAllIssues);

router.get('/issue/:id', getIssueById);

router.post('/add-issue', addIssue);

router.put('/update-issue/:id', updateIssue);

router.put('/issue/close-issue/:id', updateIssueState);

router.delete('/delete-issue/:id', deleteIssue);

module.exports = router;