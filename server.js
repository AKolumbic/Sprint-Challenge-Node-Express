const express = require('express');
const cors = require('cors');

const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

server.get('/', (req, res) => {
    res.json('WELCOME TO 5555')
})

//PROJECTS ##################################################################
//###########################################################################

server.get('/api/projects', (req, res) => {
    projects
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
})
server.get('/api/projects/:id', (req, res) => {
    // console.log("LOOK HERE:", req)
    projects
    get(req.params.id)
    .then(response => {
        if(!response) {
            res.status(404).json({ errorMessage: "This Doesn't Exist" })
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "This Could Not Be Retrived" })
    })
})
server.get('/api/projects/:id/actions', (req, res) => {
    projects
    .getProjectActions(req.params.id)
    .then(response => {
        if (response.length === 0) {
            res.status(404).json({ errorMessage: "This Doesn't Exist" })
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "This Could Not Be Retrieved" })
    })
})
server.post('/api/projects/', (req, res) => {
    const { name, description } = req.body;
    if (name && description) {
        projects
        .insert({ name, description})
        .then(response => {
            res.status(201).json({ id: response.id, name, description })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There Was An Error Making This" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please Enter Some Info" })
    }
})
server.delete('/api/projects/:id', (req, res) => {
    projects
    .remove(req.params.id)
    .then(response => {
        if (response === 1) {
            res.status(200).json({ errorMessage: "Deletion Sucess" })
        } else {
            res.status(404).json({ errorMessage: "This Does Not Exist" })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Project could not be removed" })
    })
})
server.put('/api/projects/:id', (req, res) => {
    const { name, description} = req.body;
    if(name && description) {
        projects
        .update(req.params.id, {name, description})
        .then(response => {
            if(response === 1) {
                res.status(200).json({ id: response.id, name, description})
            } else {
                res.status(404).json({ errorMessage: "this project doesn't exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "this could not be modified" })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide a name and description" })
    }
})
//ACTIONS ###################################################################
//###########################################################################

server.get('/api/actions/', (req, res) => {
    actions
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
})
server.get('/api/actions/:id', (req, res) => {
    actions
    .get(req.params.id)
    .then(response => {
        if (!response) {
            res.status(404).json({ errorMessage: 'This Does not Exist' })
        } else {
            res.status(200).json(response)
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'This Could Not Be Retrieved' })
    })
})
server.post('/api/actions/', (req, res) => {
    const { description } = req.body;
    if ( description ) {
        actions
        .insert({ description })
        .then(response => {
            res.status(201).json({ id: response.id, description })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an Error" })
        })
    } else {
        res.status(400).json({ errorMessage: "please provide a description"})
    }
})
server.delete('/api/actions/:id', (req, res) => {
    actions
    .remove(req.params.id)
    .then(response => {
        if(response === 1) {
        res.status(200).json({ message: "Delete Success" })
        } else {
            res.status(404).json({ errorMessage: "that doesn't exist" })
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Delete Failed"})
    })
})
server.put('/api/actions/:id', (req, res) => {
    const { description } = req.body;
    if ( description ) {
        actions
        .update(req.params.id, { description })
        .then(response => {
            if (response === 1) {
            res.status(200).json({ id: response.id, description })
            } else {
                res.status(404).json({ errorMessage: "That doesnt exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "could not be updated"})
        })
    } else {
        res.status(400).json({ errorMessage: "please provide a description"})
    }
})




server.listen(5555, () => console.log('SERVER RUNNING ON PORT 5555'));