const Issue = require('../models/issue.model');


exports.getAllIssues = (req, res) => {
    console.log(req.query.state);
    const query = req.query.state ? { state: req.query.state } : { };
    Issue.find(query , { updatedAt: 0, __v: 0 }).sort({_id: -1}).exec((err, issues) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to fetch issues'
        });

        return res.json({
            total_issues: issues.length,
            issues
        });
    })
}

exports.getIssueById = (req, res) => {
    const { id } = req.params;

    Issue.findById(id).exec((err, issue) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to delete issue'
        });

        if(!issue) return res.status(400).json({
            error: 'This issue does not exit or may be deleted'
        });
    
        return res.json(issue);
        
    });
}

exports.addIssue = (req, res) => {
    const { title, issue, postedBy } = req.body;
    // console.log(title, issue, postedBy);

    if (!title || !issue || !postedBy) {
        return res.status(400).json({
            error: 'Please add all fields'
        });
    }

    const newIssue = new Issue();
    newIssue.title = title;
    newIssue.issue = issue;
    newIssue.postedBy = postedBy;


    newIssue.save((err, issue) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to add issue'
        });

        return res.json({
            message: 'issue added successfully.',
            issue
        });
    });

}

exports.deleteIssue = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: 'No id found, failed to delete issue'
        });
    }

    Issue.findByIdAndDelete({ _id: id }).exec((err, result) => {
        if (err) return res.status(400).json({
            error: 'Something went wrong, failed to delete issue'
        });

        return res.json({
            message: 'issue deleted successfully.',
            result
        });
    })
}

exports.updateIssue = (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    const { id } = req.params;

    Issue.findById(id).exec((err, issue) => {
        if(err) return res.status(400).json({
            error: 'something went wrong'
        });

        if(!issue) return res.status(400).json({
            error: 'This issue does not exist'
        });

        issue.update(req.body).exec((err, result) => {
            if(err) return res.status(400).json({
                error: 'something went wrong, failed to update issue'
            });

            return res.json({
                message: 'updated successfully'
            });
        })
    })
}


exports.updateIssueState = ( req, res ) => {
    const { id } = req.params;
    
    Issue.findById(id).exec((err, issue) => {
        if(err) return res.status(400).json({
            error: 'something went wrong, failed to update state'
        });

        issue.update(req.body).exec((err, result) => {
            if(err) return res.status(400).json({
                error: 'something went wrong, failed to update issue'
            });

            return res.json({
                message: 'Issue updated successfully'
            });
        });
    });
    
}
